<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\sales;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class SalesController extends Controller
{
    protected $model;

    public function __construct(sales $Salesmodel)
    {
        $this->model = new Repository($Salesmodel);
    }

    public function SalesList()
    {
        $data = $this->model->GetAll();
        return response($data);
    }

    public function SalesByDate($date)
    {
        $data = sales::where("is_completed", false)->count();
        if($data > 0)
        {
            $dataresult = sales::where("is_completed", false)->first();
            $responsedata["lastrecord"] = false;
            $responsedata["openingcash"] = 0;
            $responsedata["sales_id"] = $dataresult->id;
        }
        else
        {
            $dataresult = DB::table('sales')->orderBy('id', 'DESC')->first();
            if(empty($dataresult))
            {
                $responsedata["lastrecord"] = true;
                $responsedata["openingcash"] = 0;
            }
            else
            {
                $responsedata["lastrecord"] = true;
                $responsedata["openingcash"] = $dataresult->opening_cash + $dataresult->total_cash_sales;
                $responsedata["sales_id"] = $dataresult->id;
            }
        }
        return response($responsedata);
    }

    public function SalesById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function SalesInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            $data["sales_start_on"] = \Carbon\Carbon::now();
            $result = $this->model->Insert($data);
            return response(["Type" => "S", "Message" => "Sales inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function SalesUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "Sales updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function SalesDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Sales deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }

    public function SalesCompleteUpdate($SaleID)
    {
        try {
            $data = sales::where("id", $SaleID)->update(["is_completed" => true, "sales_end_on" => date('Y-m-d H:i:s')]);
            return response(["Type" => "S", "Message" => "Sales Completed updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }

    public function SalesAmountUpdate($SaleID, $CashAmount, $CardAmount)
    {
        try {
            $data = sales::where("id", $SaleID)->first();
            $total_card_sales =  $CardAmount + $data["total_card_sales"];
            $total_cash_sales = $CashAmount + $data["total_cash_sales"];
            $total_sales = $total_card_sales + $total_cash_sales;
            sales::where("id", $SaleID)->update(["total_card_sales" => $total_card_sales, "total_cash_sales" => $total_cash_sales, "total_sales" => $total_sales]);
            return response(["Type" => "S", "Message" => "Sales Amount updated successfully", "AdditionalData" => ""], 200);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception], 200);
        }
    }
    public function DayClosePrint($id)
    {
        $result = DB::select(
            "
            select
                inv.invoice_full_no,
                inv.invoice_no,
                inv.invoice_amount,
                inv.created_on as invoice_date,
                (SELECT COUNT(invoice.id) FROM invoice WHERE invoice.sales_id = '$id') as no_of_invoices,
                sale.sales_start_on,
                sale.opening_cash,
                sale.total_cash_sales,
                sale.total_card_sales,
                sale.total_credit_sales,
                sale.total_sales,
                sale.sales_end_on,
                pm.name as payment_method_name,
                pr.payment_received_amount,
                bus.name as business_name,
                company.name as company_name,
                company.address as company_address,
                company.website as company_website,
                company.gst_no as company_gst_no,
                company.logo as logo
            from
                pos.payment_received as pr
            inner join
                pos.invoice as inv
            on
                pr.invoice_id = inv.id
            inner join
                pos.business as bus
            on
                bus.id = inv.business_id
            inner join
                pos.payment_method as pm
            on
                pr.payment_method_id = pm.id
            inner join
                pos.sales as sale
            on
                inv.sales_id = sale.id
            cross join
                pos.company
            where
                sale.id = '$id'
                "
        );
        return response($result);
    }

    public function SalesDayCloseReport($id)
    {
        $result = DB::select(
            "
            select
            sales.opening_cash as Opening_Cash,
            sales.opening_cash + sales.total_cash_sales as Cash_in_hand,
            sales.total_cash_sales as Cash_sales,
            sales.total_card_sales as Card_sales,
            sales.total_credit_sales as Credit_sales,
            sales.total_card_sales + sales.total_cash_sales + sales.total_credit_sales as Total_Sales,
            company.name
            from
            sales
            cross join
            company
                    where sales.id = $id"
        );
        return response($result);
    }

    public function SalesOpeningCashUpdate($SaleID, $OpeningCash)
    {
        try {
            $data = sales::where("id", $SaleID)->first();
            sales::where("id", $SaleID)->update(["opening_cash" => $OpeningCash]);
            return response(["Type" => "S", "Message" => "Sales Opening Cash updated successfully", "AdditionalData" => ""], 200);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception], 200);
        }
    }

    public function DayBookSummary($start_date, $end_date)
    {
        $result = DB::select(
            "
            SELECT
                sale.id as sales_id,
                sale.opening_cash as opening_cash,
                sale.total_sales as total_sales,
                sale.total_cash_sales as total_cash_sales,
                sale.total_card_sales as total_card_sales,
                sale.total_credit_sales as total_credit_sales,
                sale.sales_start_on as sales_start_date,
                sale.sales_end_on as sales_end_date
            FROM
                pos.sales as sale
            WHERE
                sale.is_completed = 1
            AND
                sale.sales_date
            between
                '$start_date'
            and
                '$end_date'
            ORDER BY
                sale.sales_date desc
            "
        );
        return response($result);
    }

    public function SalesRegister($year)
    {
        $result = DB::select(
            "
            SELECT
                MONTH(inv.invoice_date) as month_no,
                MONTHNAME(inv.invoice_date) as month_name,
                SUM(inv.sub_total - inv.discount_amount) as sales_amount
            FROM
                pos.invoice as inv
            WHERE
                YEAR(inv.invoice_date) = '$year'
            GROUP BY
                MONTHNAME(inv.invoice_date),
                MONTH(inv.invoice_date)
            ORDER BY
                MONTH(inv.invoice_date) desc
            "
        );
        return response($result);
    }

    public function SalesRegisterDetail($month)
    {
        $result = DB::select(
            "
            SELECT
                inv.invoice_full_no as invoice_no,
                inv.created_on as invoice_date,
                (inv.sub_total - inv.discount_amount) as invoice_amount,
                bus.name as business_name,
                company.name as company_name,
                company.address as company_address,
                company.website as company_website,
                company.gst_no as company_gst_no,
                company.logo as logo
            FROM
                pos.invoice as inv
            INNER join
                pos.business as bus
            on
                inv.business_id = bus.id
            cross join
                company
            WHERE
                MONTH(inv.invoice_date) = '$month'
            ORDER BY
                inv.created_on desc
            "
        );
        return response($result);
    }
}
