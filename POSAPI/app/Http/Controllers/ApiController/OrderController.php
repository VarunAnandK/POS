<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\order;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Http\Model\order_payment;
use App\Http\Model\gst_detail;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    protected $model;

    public function __construct(order $Ordermodel)
    {
        $this->model = new Repository($Ordermodel);
    }

    public function OrderList()
    {
        $data = order::with(["sales", "product", "product_category", "sub_product_category", "gst", "business"])->get();
        return response($data);
    }

    public function HoldOrderList($order_no)
    {

        $data =  DB::select(DB::raw(
            "
            SELECT
            order_no,
            SUM(sub_total + gst_amount) as sub_total,
            businesstable.NAME AS business_name
        FROM
            pos.`order` as ordertable
        INNER JOIN
            pos.`business` as businesstable
        ON
            businesstable.id = ordertable.business_id
        WHERE
            ordertable.order_no <> '$order_no'
        GROUP BY
            ordertable.order_no,
            ordertable.business_id,
            businesstable.name"
        ));
        return response($data);
    }

    public function OrderById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function OrderInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if (order::where("product_id", "=", $data["product_id"])->where("order_no", $data["order_no"])->count() > 0) {
                $qrydata = order::where("product_id", "=", $data["product_id"])->where("order_no", $data["order_no"])->first();
                $qty =  $qrydata["qty"] + 1;
                $subtotal = $qty * $qrydata["price"];
                order::where("order_no", $data["order_no"])->where("product_id", "=", $data["product_id"])->update(["qty" => $qty, "sub_total" => $subtotal]);
                return response(["Type" => "S", "Message" => "Order qty updated successfully", "AdditionalData" => ""], 200);
            } else {
                $result = $this->model->Insert($data);
                return response(["Type" => "S", "Message" => "Order inserted successfully", "AdditionalData" => $result["id"]], 200);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception], 200);
        }
    }
    public function OrderUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            $this->model->Update($data, $id);
            return response(["Type" => "S", "Message" => "Order updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function OrderBusinessUpdate($Orderno, $business_id)
    {
        try {
            $data = order::where("order_no", $Orderno)->update(["business_id" => $business_id]);
            return response(["Type" => "S", "Message" => "Business updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function OrderDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Order deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }

    public function GetOrderByOrderNo($orderno)
    {
        $data = order::with(["sales", "product", "product_category", "sub_product_category", "gst", "business"])->where("order_no", $orderno)->get();
        return response($data);
    }

    public function OrderDiscountUpdate($Orderno, $discount_amount)
    {
        try {
            $orderdata = order::where("order_no", $Orderno)->get();
            foreach ($orderdata as $item) {
                $item["sub_total"] = (($item["qty"] * $item["price"]) - ($item["qty"] * $discount_amount));
                $item["discount_percentage"] = (($item["qty"] * $discount_amount) / ($item["qty"] * $item["price"])) * 100;
                $gstdetaildata = gst_detail::where("gst_id", $item["gst_id"])->get();
                foreach ($gstdetaildata as $itemgst) {
                    if ($itemgst["gst_category"]["type"] == "L") {
                        if ($itemgst["gst_category"]["name"] == "CGST") {
                            $item["cgst_percentage"] = $itemgst["percentage"];
                            $item["cgst_amount"] = ($itemgst["percentage"] / 100) * $item["sub_total"];
                        } else {
                            $item["sgst_percentage"] = $itemgst["percentage"];
                            $item["sgst_amount"] = ($itemgst["percentage"] / 100) * $item["sub_total"];
                        }
                    } else if ($itemgst["gst_category"]["type"] == "O") {
                        if ($item["cgst_amount"] == 0 && $item["sgst_amount"] == 0) {
                            $item["igst_percentage"] = $itemgst["percentage"];
                            $item["igst_amount"] = ($itemgst["percentage"] / 100) * $item["sub_total"];
                        } else {
                            $item["igst_percentage"] = 0;
                            $item["igst_amount"] = 0;
                        }
                    }
                }
                $item["gst_amount"] = $item["cgst_amount"] + $item["sgst_amount"] + $item["igst_amount"];
                order::where("id", $item["id"])->update([
                    "cgst_percentage" => $item["cgst_percentage"],
                    "cgst_amount" => $item["cgst_amount"],
                    "sgst_percentage" => $item["sgst_percentage"],
                    "sgst_amount" => $item["sgst_amount"],
                    "igst_percentage" => $item["igst_percentage"],
                    "igst_amount" => $item["igst_amount"],
                    "gst_amount" => $item["gst_amount"],
                    "sub_total" => $item["sub_total"],
                    "discount_amount" => $item["qty"] * $discount_amount,
                    "discount_percentage" => $item["discount_percentage"]
                ]);
            }
            return response(["Type" => "S", "Message" => "Discount updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }

    public function OrderDeleteAll($Orderno)
    {
        try {
            order::where("order_no", $Orderno)->delete();
            return response(["Type" => "S", "Message" => "Order deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }
    public function OrderAndPaymentDeleteAll($Orderno)
    {
        try {
            order::where("order_no", $Orderno)->delete();
            order_payment::where("order_no", $Orderno)->delete();
            return response(["Type" => "S", "Message" => "Order Payment deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }
    public function GetAllOrdersBySalesID($SalesId)
    {
        $data = order::where("sales_id", $SalesId)->count();
        return response($data);
    }

    public function GetAllOrderGSTList($order_no)
    {
        //$data = order::where("order_no", "=", $order_no)->with(["product"])->groupby("product.hsnorsac")->get();
        $data =  DB::select(DB::raw(
            "
            SELECT
                producttable.hsnorsac as product_hsnorsac,
                SUM(ordertable.sub_total) as sub_total,
                (ordertable.cgst_percentage + ordertable.sgst_percentage) as gst_percentage,
                SUM(ordertable.cgst_amount + ordertable.sgst_amount) as gst_amount,
                SUM(ordertable.cgst_amount) as cgst_amount,
                SUM(ordertable.cgst_percentage) as cgst_percentage,
                SUM(ordertable.sgst_amount) as sgst_amount,
                SUM(ordertable.sgst_percentage) as sgst_percentage,
                SUM(ordertable.igst_amount) AS igst_amount,
                SUM(ordertable.igst_percentage) AS igst_percentage
            FROM
                pos.`order` as ordertable
            INNER JOIN
                pos.`product` as producttable
            ON
                producttable.id = ordertable.product_id
            WHERE
                ordertable.order_no = '$order_no'
            AND
                ordertable.gst_amount > 0
            GROUP BY
                ordertable.order_no,
                ordertable.cgst_percentage,
                ordertable.sgst_percentage,
                producttable.hsnorsac"
        ));
        return response($data);
    }

    public function OrderToInvoice($CreatedById, $OrderNo, $SalesId, $Note)
    {
        DB::select("call sp_order_to_invoice($CreatedById,$OrderNo,$SalesId,'$Note',@Type,@Message,@invoiceid);");
        $data = DB::select("select @Type as type,@Message as message, @invoiceid as invoiceId;");
        return response(["Type" => $data[0]->type, "Message" => $data[0]->message ,"Id" => $data[0]->invoiceId]);
    }

    public function OrderRoundOffAmountUpdate(Request $request)
    {
        try {
            order::where("order_no", $request["order_no"])->update(["round_off" => $request["roundoff_amount"]]);
            return response(["Type" => "S", "Message" => "Order RoundOff Amount updated successfully", "AdditionalData" => ""], 200);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception], 200);
        }
    }
}
