<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\payment_received_detail;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class PaymentReceivedDetailController extends Controller
{
    protected $model;

    public function __construct(payment_received_detail $PaymentReceivedDetailmodel)
    {
        $this->model = new Repository($PaymentReceivedDetailmodel);
    }

    public function PaymentReceivedDetailList()
    {
        $data = payment_received_detail::with(['payment_received', 'invoice'])->get();
        return response($data);
    }
    
    public function PaymentReceivedDetailById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }

    public function PaymentReceivedDetailInsert(Request $request)
    {
        try {
            $result = $this->model->Insert($request->only($this->model->GetModel()->fillable));
            return response(["Type" => "S", "Message" => "PaymentReceivedDetail inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function PaymentReceivedDetailUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "PaymentReceivedDetail updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function PaymentReceivedDetailDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "PaymentReceivedDetail deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }

    public function PaymentReceivedDetailInsertBulk(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            foreach ($data as $insertdata) {
                $this->model->Insert($insertdata);
            }
            return response(["Type" => "S", "Message" => "Payment Received Detail inserted successfully", "AdditionalData" => [], "Id" => 0]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
