<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\state;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class StateController extends Controller
{
    protected $model;

    public function __construct(state $Statemodel)
    {
        $this->model = new Repository($Statemodel);
    }

    public function StateList()
    {
        $data = state::with("country")->get();
        return response($data);
    }
    public function StateById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function StateInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(state::where("name","=",$data["name"])->where("country_id","=",$data["country_id"])->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $result = $this->model->Insert($data);
                return response(["Type" => "S", "Message" => "State inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function StateUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(state::where("name","=",$data["name"])->where("country_id","=",$data["country_id"])->where("id","!=",$id)->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $this->model->Update($data,$id);
                return response(["Type" => "S", "Message" => "State updated successfully"]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function StateDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "State deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
