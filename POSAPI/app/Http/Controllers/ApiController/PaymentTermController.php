<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\payment_term;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class PaymentTermController extends Controller
{
    protected $model;

    public function __construct(payment_term $PaymentTermmodel)
    {
        $this->model = new Repository($PaymentTermmodel);
    }

    public function PaymentTermList()
    {
         $data = $this->model->GetAll();
        return response($data);
    }
    public function PaymentTermById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function PaymentTermInsert(Request $request)
    {
        try {
            $result = $this->model->Insert($request->only($this->model->GetModel()->fillable));
            return response(["Type" => "S", "Message" => "Payment Term inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function PaymentTermUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "Payment Term updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function PaymentTermDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Payment Term deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
