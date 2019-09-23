<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\gst_category;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class GSTCategoryController extends Controller
{
    protected $model;

    public function __construct(gst_category $GSTCategorymodel)
    {
        $this->model = new Repository($GSTCategorymodel);
    }

    public function GSTCategoryList()
    {
         $data = $this->model->GetAll();
        return response($data);
    }
    public function GSTCategoryById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function GSTCategoryInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(gst_category::where("name","=",$data["name"])->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $result = $this->model->Insert($data);
                return response(["Type" => "S", "Message" => "GST Category inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function GSTCategoryUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(gst_category::where("name","=",$data["name"])->where("id","!=",$id)->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $this->model->Update($data,$id);
                return response(["Type" => "S", "Message" => "GST Category updated successfully"]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function GSTCategoryDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "GST Category deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
