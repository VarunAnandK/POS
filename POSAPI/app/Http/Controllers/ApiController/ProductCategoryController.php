<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\product_category;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    protected $model;

    public function __construct(product_category $ProductCategorymodel)
    {
        $this->model = new Repository($ProductCategorymodel);
    }

    public function ProductCategoryList()
    {      
        $data = $this->model->GetAll();
        return response($data);
    }

    public function ProductCategoryByParentCategoryId($id)
    {
        $data = Product_Category::where("parent_category_id",$id)->get();
        return response($data);
    }

    public function ParentProductCategoryList()
    {
        $data = Product_Category ::where('parent_category_id',0)->get();
        return response($data);
    }
    public function ProductCategoryById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function ProductCategoryInsert(Request $request)
    {
        try {
            
            $data = $request->only($this->model->GetModel()->fillable);
            if(product_category::where("name","=",$data["name"])->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $result = $this->model->Insert($data);
                return response(["Type" => "S", "Message" => "Product Category inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function ProductCategoryUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(product_category::where("name","=",$data["name"])->where("id","!=",$id)->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $this->model->Update($data,$id);
                return response(["Type" => "S", "Message" => "Product Category updated successfully"]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function ProductCategoryDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Product Category deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
