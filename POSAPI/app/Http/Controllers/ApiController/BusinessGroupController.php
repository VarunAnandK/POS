<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\business_group;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class BusinessGroupController extends Controller
{
    protected $model;

    public function __construct(business_group $BusinessGroupmodel)
    {
        $this->model = new Repository($BusinessGroupmodel);
    }

    public function BusinessGroupList()
    {
         $data = $this->model->GetAll();
        return response($data);
    }
    public function BusinessGroupById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function BusinessGroupInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(business_group::where("name","=",$data["name"])->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $result = $this->model->Insert($data);
                return response(["Type" => "S", "Message" => "Discount Group inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function BusinessGroupUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(business_group::where("name","=",$data["name"])->where("id","!=",$id)->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $this->model->Update($data,$id);
                return response(["Type" => "S", "Message" => "Discount Group updated successfully"]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function BusinessGroupDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Discount Group deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }
}
