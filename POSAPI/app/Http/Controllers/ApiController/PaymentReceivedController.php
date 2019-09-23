<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\payment_received;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class PaymentReceivedController extends Controller
{
    protected $model;

    public function __construct(payment_received $PaymentReceivedmodel)
    {
        $this->model = new Repository($PaymentReceivedmodel);
    }

    public function PaymentReceivedList()
    {
        $data = payment_received::with(['invoice', 'business', 'payment_method'])->get();
        return response($data);
    }
    
    public function PaymentReceivedById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }

    public function PaymentReceivedInsert(Request $request)
    {
        try {
            $result = $this->model->Insert($request->only($this->model->GetModel()->fillable));
            return response(["Type" => "S", "Message" => "PaymentReceived inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function PaymentReceivedUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "PaymentReceived updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function PaymentReceivedDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "PaymentReceived deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }
}
