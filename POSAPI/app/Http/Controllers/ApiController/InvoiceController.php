<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\invoice;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    protected $model;

    public function __construct(invoice $Invoicemodel)
    {
        $this->model = new Repository($Invoicemodel);
    }

    public function InvoiceList()
    {
        $data = invoice::with(['sales', 'business'])->get();
        return response($data);
    }

    public function GetAllInvoiceListBySalesId($Sales_Id)
    {
        $data = invoice::with(['sales', 'business'])->where("sales_id", $Sales_Id)->orderby("order_no", "DESC")->get();
        return response($data);
    }

    public function InvoiceById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }

    public function InvoiceInsert(Request $request)
    {
        try {
            $result = $this->model->Insert($request->only($this->model->GetModel()->fillable));
            return response(["Type" => "S", "Message" => "Invoice inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function InvoiceUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "Invoice updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function InvoiceDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Invoice deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }

    public function InvoicePrint($id)
    {
        $result = DB::select(DB::raw("select
        invoice.invoice_full_no,
        invoice.invoice_date,
        business.name as business_name,
        invoice.invoice_amount,
        invoice.discount_amount,
        invoice.balance_amount,
        invoice.gst_amount,
        invoice.round_off,
        product.hsnorsac,
        product.barcode,
        product.name as product_name,
        IFNULL((
        SELECT
            pm.name
        FROM
                payment_received as pr
        INNER JOIN
            payment_method as pm
        on
            pm.id = pr.payment_method_id
        where
            pr.invoice_id = invoice.id
        AND
            pm.is_cash = true
        ),'') as CashPayment,
        IFNULL((
        SELECT
            pr.payment_received_amount
        FROM
                payment_received as pr
        INNER JOIN
            payment_method as pm
        on
            pm.id = pr.payment_method_id
        where
            pr.invoice_id = invoice.id
        AND
            pm.is_cash = true
        ),0) as CashPaymentAmount,
       IFNULL((
        SELECT
            pm.name
        FROM
                payment_received as pr
        INNER JOIN
            payment_method as pm
        on
            pm.id = pr.payment_method_id
        where
            pr.invoice_id = invoice.id
        AND
            pm.is_cash = false
        ),'') as CardPayment,
        IFNULL((SELECT
            pr.payment_received_amount
        FROM
                payment_received as pr
        INNER JOIN
            payment_method as pm
        on
            pm.id = pr.payment_method_id
        where
            pr.invoice_id = invoice.id
        AND
            pm.is_cash = false
        ),0) as CardPaymentAmount,
        IFNULL((SELECT DISTINCT
            pr.note
        FROM
            payment_received as pr
        INNER JOIN
            payment_method as pm
        on
            pm.id = pr.payment_method_id
        where
            pr.note <> ''
      	AND
         	pr.invoice_id = invoice.id
        ),'-') as note,
        (SELECT SUM(invoice_detail.qty) FROM invoice_detail WHERE invoice_detail.invoice_id = invoice.id ) as total_items,
        invoice_detail.qty,
        invoice_detail.sub_total,
        invoice_detail.total,
        invoice.sub_total AS invoice_sub_total,
        invoice.`change` as invoice_change,
        company.city_id as city_id,
        company.name as company_name,
        company.postal_code as postal_code,
        company.email as email,
        company.phone_no as phone_no,
        CONCAT(company.address,'\r',cit.name,' ','-',' ',company.postal_code) as company_address,
        (CASE
			WHEN company.is_gst_enable = true THEN CONCAT('GST No :',' ',IFNULL(company.gst_no, ''))
			WHEN company.is_gst_enable = false THEN ''
			ELSE company.gst_no END) as company_gst_no,
        company.website as company_website,
        company.logo as logo
        FROM
             invoice_detail
        inner JOIN
            invoice
        ON
            invoice.id  = invoice_detail.invoice_id
        inner JOIN
            business
        ON
            invoice.business_id  = business.id
        inner JOIN
            product
        ON
            invoice_detail.product_id  = product.id
        cross join
            company
        INNER JOIN
            pos.city as cit
        ON
         	cit.id = company.city_id
        WHERE
                invoice.id = '$id'
        "));
        return response($result);
    }

    public function GetAllInvoiceList($Start_Date, $End_Date, $Payment_Method_Id)
    {
        $result = DB::select(DB::raw("
        select
            inv.id as invoice_id,
            inv.invoice_full_no as invoice_no,
            inv.created_on as invoice_date,
            inv.order_no as order_no,
            inv.business_id as business_id,
            pm.payment_method_name as payment_method_name,
            bus.name as business_name,
            inv.sub_total as sub_total,
            inv.gst_amount as gst_amount,
            inv.discount_amount as discount_amount,
            inv.round_off as round_off_amount,
            inv.invoice_amount as invoice_amount
        FROM
            pos.invoice as inv
        INNER JOIN
            pos.business as bus
        ON
            inv.business_id = bus.id
        INNER JOIN
            (
                SELECT
                    pr.invoice_id,
                    GROUP_CONCAT(pm.NAME) AS payment_method_name
                FROM
                    pos.payment_received AS pr
                INNER JOIN
                    pos.payment_method as pm
                ON
                    pm.id = pr.payment_method_id
                GROUP BY
                    pr.invoice_id
            ) AS pm
        ON
            pm.invoice_id = inv.id
        WHERE
            inv.invoice_date BETWEEN '$Start_Date' AND '$End_Date'
        AND
            inv.id IN
                (
                    SELECT distinct pr.invoice_id FROM pos.payment_received AS pr WHERE
                    (
                        '$Payment_Method_Id' = 0
                    OR
                        pr.payment_method_id = '$Payment_Method_Id'
                )
            )
        "));
        return response($result);
    }

    public function GetAllInvoiceListPrint($Start_Date, $End_Date, $Payment_Method_Id)
    {
        $result = DB::select(DB::raw("
        select
            inv.id as invoice_id,
            inv.invoice_full_no as invoice_no,
            inv.created_on as invoice_date,
            inv.order_no as order_no,
            inv.business_id as business_id,
            pm.payment_method_name as payment_method_name,
            bus.name as business_name,
            inv.sub_total as sub_total,
            inv.gst_amount as gst_amount,
            inv.discount_amount as discount_amount,
            inv.round_off as round_off_amount,
            inv.invoice_amount as invoice_amount,
            company.name as company_name,
            company.address as company_address,
            company.website as company_website,
            company.gst_no as company_gst_no,
            company.logo as logo,
            '$Start_Date' as start_date,
            '$End_Date' as end_date
        FROM
            pos.invoice as inv
        INNER JOIN
            pos.business as bus
        ON
            inv.business_id = bus.id
        INNER JOIN
            (
                SELECT
                    pr.invoice_id,
                    GROUP_CONCAT(pm.NAME) AS payment_method_name
                FROM
                    pos.payment_received AS pr
                INNER JOIN
                    pos.payment_method as pm
                ON
                    pm.id = pr.payment_method_id
                GROUP BY
                    pr.invoice_id
            ) AS pm
        ON
            pm.invoice_id = inv.id
        CROSS JOIN
            pos.company
        WHERE
            inv.invoice_date BETWEEN '$Start_Date' AND '$End_Date'
        AND
            inv.id IN
                (
                    SELECT distinct pr.invoice_id FROM pos.payment_received AS pr WHERE
                    (
                        '$Payment_Method_Id' = 0
                    OR
                        pr.payment_method_id = '$Payment_Method_Id'
                )
            )
        "));
        return response($result);
    }

}
