<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\company;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;



class CompanyController extends Controller
{
    protected $model;

    public function __construct(company $Companymodel)
    {
        $this->model = new Repository($Companymodel);
    }

    public function CompanyList()
    {
        $data = company::with(["country", "state", "city"])->get();
        return response($data);
    }
    public function CompanySearchAndList($take, $skip, $global_filter = "")
    {
        $data = [];
        if (strlen($global_filter) > 0) {
            $data = company::orWhereHas('country', function ($q) use ($global_filter) {
                $q->where('name', 'like', '%' . $global_filter . '%');
            })
                ->orWhereHas('state', function ($q) use ($global_filter) {
                    $q->where('name', 'like', '%' . $global_filter . '%');
                })
                ->orWhereHas('city', function ($q) use ($global_filter) {
                    $q->where('name', 'like', '%' . $global_filter . '%');
                })
                ->orWhere("name", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("address", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("postal_code", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("email", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("website", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("phone_no", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("gst_no", 'LIKE', '%' . $global_filter . '%')
                ->with(["country", "state", "city"]);
            $data = $data->skip($skip)->take($take)->get();
            $totalcount = $data->count();
        } else {
            $totalcount = company::count();
            $data = company::with(["country", "state", "city"])->skip($skip)->take($take)->get();
        }
        return response(["data" => $data, "totalrecord" => $totalcount]);
    }
    public function CompanyById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function CompanyInsert(Request $request)
    {
        try {
            $result = $this->model->Insert($request->only($this->model->GetModel()->fillable));
            $PictureId = $result["id"];
            $image = $result["logo"];
            $png_url = "company-" . $PictureId . ".png";
            $savepath = "http://$_SERVER[HTTP_HOST]" . '/storage/Assert/Company/' . $png_url;
            $path = storage_path('app\public') . '\\Assert\\Company\\' . $png_url;
            //$path = storage_path('public') . '\\Assert\\Company\\' . $png_url;
            $data = explode(',', $image);
            $status = file_put_contents($path, base64_decode($data[1]));
            if ($status || $status > 0) {
                $data = company::where("id", $result["id"])->update(["logo" => $savepath]);
            }
            return response(["Type" => "S", "Message" => "Company inserted successfully", "AdditionalData" => [], "Id" => $result["id"], "Is_Credit" => $result["is_credits_enable"], "Is_GST" => $result["is_gst_enable"]]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function CompanyUpdate(Request $request, $id)
    {
        try {
            if ($request["logo"] == "" || str_contains($request["logo"],"http")) {
                $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
                return response(["Type" => "S", "Message" => "Company Updated sucessfully"]);
            } else {
                $PictureId = $request["id"];
                $image = $request["logo"];
                $request["logo"] = "";
                $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
                $png_url = "company-" . $PictureId . ".png";
                $savepath = "http://$_SERVER[HTTP_HOST]" . '/storage/' . $png_url;
                $path = storage_path('app\public') . '\\Assert\\Company\\' . $png_url;
                $data = explode(',', $image);
                $status = file_put_contents($path, base64_decode($data[1]));
                if ($status || $status > 0) {
                    $data = company::where("id", $request["id"])->update(["logo" => $savepath]);
                }
                return response(["Type" => "S", "Message" => "Company Updated sucessfully", "Is_Credit" => $request["is_credits_enable"], "Is_GST" => $request["is_gst_enable"]]);
            }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function CompanyDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Company deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }
}
