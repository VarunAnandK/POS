<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\product;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    protected $model;

    public function __construct(product $Productmodel)
    {
        $this->model = new Repository($Productmodel);
    }

    public function ProductList()
    {
        //  $data = $this->model->GetAll();
        $data = product::with(["product_category", "unit", "sub_product_category", "gst"])->get();
        return response($data);
    }

    public function ProductSearchAndList($take, $skip, $global_filter = "")
    {
        $data = [];
        if (strlen($global_filter) > 0) {
            $data = product::orWhereHas('product_category', function ($q) use ($global_filter) {
                $q->where('name', 'like', '%' . $global_filter . '%')
                ->orWhere('product_sub_category_name', 'like', '%' . $global_filter . '%');
            })
                ->orWhereHas('unit', function ($q) use ($global_filter) {
                    $q->where('name', 'like', '%' . $global_filter . '%');
                })
                ->orWhereHas('gst', function ($q) use ($global_filter) {
                    $q->where('name', 'like', '%' . $global_filter . '%');
                })
                ->orWhere("name", 'LIKE', '%' . $global_filter . '%')
                //->orWhere("sku", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("barcode", 'LIKE','%' . $global_filter . '%')
                ->orWhere("hsnorsac", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("selling_price", 'LIKE', '%' . $global_filter . '%')
                ->with(["product_category", "unit", "gst"]);
            $data = $data->skip($skip)->take($take)->get();
            $totalcount = $data->count();
        } else {
            $totalcount = product::count();
            $data = product::with(["product_category", "unit", "gst"])->skip($skip)->take($take)->get();
        }
        return response(["data" => $data, "totalrecord" => $totalcount]);
    }

    public function ProductById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function ProductInsert(Request $request)
    {
        try {
            $validation = true;
            $data = $request->only($this->model->GetModel()->fillable);
            if (product::where("name", "=", $data["name"])->count() > 0) {
                $validation = false;
                return response(["Type" => "E", "Message" => $data["name"] . " already exists"]);
            }
            if (product::where("barcode", "=", $data["barcode"])->count() > 0) {
                $validation = false;
                return response(["Type" => "E", "Message" => "This barcode already exists"]);
            }
            if ($validation) {
                $result = $this->model->Insert($data);
                return response(["Type" => "S", "Message" => "Product inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function ProductUpdate(Request $request, $id)
    {
        try {
            $validation = true;
            $data = $request->only($this->model->GetModel()->fillable);
            if (product::where("name", "=", $data["name"])->where("id", "!=", $id)->count() > 0) {
                $validation = false;
                return response(["Type" => "E", "Message" => $data["name"] . " already exists"]);
            }
            if (product::where("barcode", "=", $data["barcode"])->where("id", "!=", $id)->count() > 0) {
                $validation = false;
                return response(["Type" => "E", "Message" => "This barcode already exists"]);
            }
            if ($validation) {
                $this->model->Update($data, $id);
                return response(["Type" => "S", "Message" => "Product updated successfully"]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function ProductDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Product deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }

    public function GetAllProductByName($product_filter = "")
    {
        $data = [];
        if (strlen($product_filter) > 0) {
            $data = product::orWhere("name", 'LIKE', '%' . $product_filter . '%')
                ->orWhere("sku", 'LIKE', '%' . $product_filter . '%')
                ->orWhere("hsnorsac", 'LIKE', '%' . $product_filter . '%');
            $data = $data->get();
            $totalcount = $data->count();
        } else {
            $totalcount = product::count();
            $data = product::get();
        }
        return response(["data" => $data, "totalrecord" => $totalcount]);
    }

    public function GetAllProductByBarcode($product_filter = "")
    {
        $data = [];
        if (strlen($product_filter) > 0) {
            $data = product::Where("barcode", $product_filter)->first();
        }
        return response($data);
    }

    public function ProductSummary($start_date, $end_date)
    {
        $result = DB::select(
            "
            SELECT
                invdetail.product_id as product_id,
                prod.name as product_name,
                SUM(invdetail.qty) as sold_qty,
                SUM(invdetail.price * invdetail.qty) / SUM(invdetail.qty) as avg_price,
                SUM(invdetail.price * invdetail.qty) as actual_amount,
                company.name as company_name,
                company.address as company_address,
                company.website as company_website,
                company.gst_no as company_gst_no,
                company.logo as logo
            FROM
                pos.invoice_detail as invdetail
            inner join
                pos.invoice as inv
            on
                inv.id = invdetail.invoice_id
            inner join
                pos.product as prod
            on
                invdetail.product_id = prod.id
            cross join
                company
            WHERE
                inv.invoice_date
            between
                '$start_date'
            and
                '$end_date'
            group by
                invdetail.product_id,
                prod.name,
                company.name,
                company.address,
                company.website,
                company.gst_no,
                company.logo
            ORDER BY
                prod.name
            "
        );
        return response($result);
    }

    public function ProductDetailSummary($product_id, $start_date, $end_date)
    {
        $result = DB::select(
            "
            SELECT
                prod.name as product_name,
                prod.product_category_id as product_category_id,
                parprodcat.name as parent_category_name,
                prod.product_sub_category_id as sub_product_category_id,
                subprodcat.name as sub_category_name,
                prod.hsnorsac as hsnorsac,
                prod.barcode as barcode,
                prod.unit_id as unit_id,
                unit.name as unit_name,
                invdetail.qty as item_qty,
                invdetail.price as product_price,
                (invdetail.price * invdetail.qty) as product_amount,
                inv.invoice_full_no as invoice_no,
                inv.created_on as invoice_date,
                bus.name as business_name,
                company.name as company_name,
                company.address as company_address,
                company.website as company_website,
                company.gst_no as company_gst_no,
                company.logo as logo
            FROM
                pos.invoice_detail as invdetail
            inner join
                pos.invoice as inv
            on
                inv.id = invdetail.invoice_id
            inner join
                pos.business as bus
            on
                bus.id = inv.business_id
            inner join
                pos.product as prod
            on
                invdetail.product_id = prod.id
            inner join
                pos.unit_of_measurement as unit
            on
                prod.unit_id = unit.id
            inner join
                pos.product_category as parprodcat
            on
                prod.product_category_id = parprodcat.id
            left outer join
                pos.product_category as subprodcat
            on
                prod.product_sub_category_id = subprodcat.id
            cross join
                company
            where
                invdetail.product_id = '$product_id'
            AND
                inv.invoice_date
            between
                '$start_date'
            and
                '$end_date'
            ORDER BY
                inv.created_on desc
            "
        );
        return response($result);
    }
}
