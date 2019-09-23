<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\payment_method;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    protected $model;

    public function __construct(payment_method $PaymentMethodmodel)
    {
        $this->model = new Repository($PaymentMethodmodel);
    }

    public function PaymentMethodList()
    {
        $data = $this->model->GetAll();
        return response($data);
    }
    public function PaymentMethodById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function PaymentMethodInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if (payment_method::where("name", "=", $data["name"])->count() > 0) {
                return response(["Type" => "E", "Message" => $data["name"] . " already exists"]);
            } else {
                if (payment_method::where("is_cash", "=", true)->count() > 0 && $data["is_cash"] == true) {
                    payment_method::where("is_cash", "=", true)->update(["is_cash" => false]);
                    $result = $this->model->Insert($data);
                    return response(["Type" => "S", "Message" => "Payment Method inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
                } else {
                    $result = $this->model->Insert($data);
                    return response(["Type" => "S", "Message" => "Payment Method inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
                }
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function PaymentMethodUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if (payment_method::where("name", "=", $data["name"])->where("id", "!=", $id)->count() > 0) {
                return response(["Type" => "E", "Message" => $data["name"] . " already exists"]);
            } else {
                if (payment_method::where("is_cash", "=", true)->count() > 0 && $data["is_cash"] == true) {
                    payment_method::where("is_cash", "=", true)->update(["is_cash" => false]);
                    $this->model->Update($data, $id);
                    return response(["Type" => "S", "Message" => "Payment Term updated successfully"]);
                }
                else{
                    $this->model->Update($data, $id);
                    return response(["Type" => "S", "Message" => "Payment Term updated successfully"]);
                }
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function PaymentMethodDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Payment Term deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
