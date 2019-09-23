<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\gst_detail;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class GSTDetailController extends Controller
{
    protected $model;

    public function __construct(gst_detail $GSTDetailmodel)
    {
        $this->model = new Repository($GSTDetailmodel);
    }

    public function GSTDetailList()
    {
        $data = $this->model->GetAll();
        return response($data);
    }
    public function GSTDetailByGSTId($id)
    {
        $data = gst_detail::where("gst_id", $id)->with("gst_category")->get();
        return response($data);
    }
    public function GSTDetailById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function GSTDetailInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if (gst_detail::where("gst_category_id", "=", $data["gst_category_id"])->where("gst_id", "=", $data["gst_id"])->count() > 0) {
                    return response(["Type" => "E", "Message" => "Already exists"]);
                } else {
                    $result = $this->model->Insert($data);
                    return response(["Type" => "S", "Message" => "GST Detail inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
                }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function GSTDetailUpdate(Request $request, $id)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if (gst_detail::where("gst_category_id", "=", $data["gst_category_id"])->where("gst_id", "=", $data["gst_id"])->where("id", "!=", $id)->count() > 0) {
                    return response(["Type" => "E", "Message" =>" Already exists"]);
                } else {
                    $this->model->Update($data, $id);
                    return response(["Type" => "S", "Message" => "GST Detail updated successfully"]);
                }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function GSTDetailDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "GSTDetail deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
}
