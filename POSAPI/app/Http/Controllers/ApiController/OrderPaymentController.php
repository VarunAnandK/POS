<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\order_payment;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class OrderPaymentController extends Controller
{
    protected $model;

    public function __construct(order_payment $OrderPaymentmodel)
    {
        $this->model = new Repository($OrderPaymentmodel);
    }

    public function OrderPaymentList()
    {
        $data = order_payment::with(["payment_method"])->get();
        return response($data);
    }
    public function OrderPaymentById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function OrderPaymentInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if (order_payment::where("order_no", $data["order_no"])->where("payment_method_id", $data["payment_method_id"])->count() > 0) {
                $qrydata = order_payment::where("order_no", $data["order_no"])->where("payment_method_id", $data["payment_method_id"])->first();
                $card_amount = $data["card_amount"] + $qrydata["card_amount"];
                $cash_amount = $data["cash_amount"] + $qrydata["cash_amount"];
                $credit_amount = $data["credit_amount"] + $qrydata["credit_amount"];
                $balance_amount = $data["balance_amount"];
                order_payment::where("order_no", $data["order_no"])->where("payment_method_id", $data["payment_method_id"])->update(["card_amount" => $card_amount, "cash_amount" => $cash_amount, "credit_amount" => $credit_amount, "balance_amount" => $balance_amount]);
                order_payment::where("order_no", $data["order_no"])->update(["balance_amount" => $balance_amount]);
                return response(["Type" => "S", "Message" => "Order Payment updated successfully", "AdditionalData" => ""], 200);
            } else {
                $result = $this->model->Insert($data);
                $balance_amount = $data["balance_amount"];
                order_payment::where("order_no", $data["order_no"])->update(["balance_amount" => $balance_amount]);
                return response(["Type" => "S", "Message" => "Order Payment inserted successfully", "AdditionalData" => $result["id"]], 200);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception], 200);
        }
    }
    public function OrderPaymentUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "Order Payment updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function OrderPaymentDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Order Payment deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }
    public function GetOrderPaymentByOrderNo($orderno)
    {
        $data = order_payment::with(["payment_method"])->where("order_no", $orderno)->get();
        return response($data);
    }
}
