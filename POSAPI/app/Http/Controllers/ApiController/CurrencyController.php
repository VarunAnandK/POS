<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\currency;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    protected $model;

    public function __construct(currency $Currencymodel)
    {
        $this->model = new Repository($Currencymodel);
    }

    public function CurrencyList()
    {

         $data = currency::with("country")->get();
        return response($data);
    }
    public function CurrencyById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function CurrencyInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(currency::where("name","=",$data["name"])->where("country_id","=",$data["country_id"])->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $result = $this->model->Insert($data);
                return response(["Type" => "S", "Message" => "Currency inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function CurrencyUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if(currency::where("name","=",$data["name"])->where("country_id","=",$data["country_id"])->where("id","!=",$id)->count() > 0)
            {
                return response(["Type" => "E", "Message" => $data["name"]." already exists"]);
            }
            else
            {
                $this->model->Update($data,$id);
                return response(["Type" => "S", "Message" => "Currency updated successfully"]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function CurrencyDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Currency deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
