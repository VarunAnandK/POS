<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\city;
use App\Http\Repositories\Repository;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class CityController extends Controller
{
    protected $model;

    public function __construct(city $Citymodel)
    {

        $this->model = new Repository($Citymodel);
    }

    public function CityList()
    {
        //$data = \DB::select('call sp_order_to_invoice');
        $data = city::with(["country","state"])->get();
        return response($data);
    }
    public function CityById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function CityInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(city::where("name","=",$data["name"])->where("country_id","=",$data["country_id"])->where("state_id","=",$data["state_id"])->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $result = $this->model->Insert($data);
                return response(["Type" => "S", "Message" => "City inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function CityUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(city::where("name","=",$data["name"])->where("country_id","=",$data["country_id"])->where("state_id","=",$data["state_id"])->where("id","!=",$id)->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $this->model->Update($data,$id);
                return response(["Type" => "S", "Message" => "City updated successfully"]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function CityDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "City deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
