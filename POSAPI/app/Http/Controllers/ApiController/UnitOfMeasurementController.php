<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\unit_of_measurement;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class UnitOfMeasurementController extends Controller
{
    protected $model;

    public function __construct(unit_of_measurement $UnitOfMeasurementmodel)
    {
        $this->model = new Repository($UnitOfMeasurementmodel);
    }

    public function UnitOfMeasurementList()
    {
         $data = $this->model->GetAll();
        return response($data);
    }
    public function UnitOfMeasurementById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function UnitOfMeasurementInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(unit_of_measurement::where("name","=",$data["name"])->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $result = $this->model->Insert($data);
                return response(["Type" => "S", "Message" => "Unit Of Measurement inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function UnitOfMeasurementUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(unit_of_measurement::where("name","=",$data["name"])->where("id","!=",$id)->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $this->model->Update($data,$id);
                return response(["Type" => "S", "Message" => "Unit Of Measurement updated successfully"]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function UnitOfMeasurementDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Unit Of Measurement deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
