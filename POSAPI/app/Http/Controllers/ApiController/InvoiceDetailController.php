<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\invoice_detail;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class InvoiceDetailController extends Controller
{
    protected $model;

    public function __construct(invoice_detail $InvoiceDetailmodel)
    {
        $this->model = new Repository($InvoiceDetailmodel);
    }

    public function InvoiceDetailList()
    {
        $data = invoice_detail::with(['invoice', 'product', 'product_category', 'gst'])->get();
        return response($data);
    }

    public function InvoiceDetailById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }

    public function InvoiceDetailInsert(Request $request)
    {
        try {
            $result = $this->model->Insert($request->only($this->model->GetModel()->fillable));
            return response(["Type" => "S", "Message" => "InvoiceDetail inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }

    public function InvoiceDetailInsertBulk(Request $request)
    {

        try {
            $data = $request->only($this->model->GetModel()->fillable);
            foreach ($data as $insertdata) {
                $this->model->Insert($insertdata);
            }
            return response(["Type" => "S", "Message" => "InvoiceDetail inserted successfully", "AdditionalData" => [], "Id" => 0]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }

    public function InvoiceDetailUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "InvoiceDetail updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function InvoiceDetailDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "InvoiceDetail deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }
}
