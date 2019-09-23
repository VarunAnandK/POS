<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\gst;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class GSTController extends Controller
{
    protected $model;

    public function __construct(gst $GSTmodel)
    {
        $this->model = new Repository($GSTmodel);
    }

    public function GSTList()
    {   
        $data = $this->model->GetAll();
        return response($data);
    }
    public function GSTById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function GSTInsert(Request $request)
    {
        try {
            $result = $this->model->Insert($request->only($this->model->GetModel()->fillable));
            return response(["Type" => "S", "Message" => "GST inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function GSTUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "GST updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function GSTDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "GST deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
