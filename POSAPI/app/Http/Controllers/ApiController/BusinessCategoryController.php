<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\business_category;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class BusinessCategoryController extends Controller
{
    protected $model;

    public function __construct(business_category $BusinessCategorymodel)
    {
        $this->model = new Repository($BusinessCategorymodel);
    }

    public function BusinessCategoryList()
    {
        $data = $this->model->GetAll();
        return response($data);
    }
    public function BusinessCategoryById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function BusinessCategoryInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if (business_category::where("name", "=", $data["name"])->count() > 0) {
                    return response(["Type" => "E", "Message" => $data["name"] . " already exists"]);
                } else {
                    $result = $this->model->Insert($data);
                    return response(["Type" => "S", "Message" => "Business Category inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
                }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function BusinessCategoryUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if (business_category::where("name", "=", $data["name"])->where("id", "!=", $id)->count() > 0) {
                    return response(["Type" => "E", "Message" => $data["name"] . " already exists"]);
                } else {
                    $this->model->Update($data, $id);
                    return response(["Type" => "S", "Message" => "Business Category updated successfully"]);
                }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function BusinessCategoryDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Business Category deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
