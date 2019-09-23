<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\business;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class BusinessController extends Controller
{
    protected $model;

    public function __construct(business $Businessmodel)
    {
        $this->model = new Repository($Businessmodel);
    }

    public function BusinessList()
    {
        $data = business::with(['country', 'state', 'city', 'business_category', 'business_group'])->get();
        return response($data);
    }
    public function BusinessSearchAndList($take, $skip, $global_filter = "")
    {
        $data = [];
        if (strlen($global_filter) > 0) {
            $data = business::orWhereHas('country', function ($q) use ($global_filter) {
                $q->where('name', 'like', '%' . $global_filter . '%');
            })
                ->orWhereHas('state', function ($q) use ($global_filter) {
                    $q->where('name', 'like', '%' . $global_filter . '%');
                })
                ->orWhereHas('business_category', function ($q) use ($global_filter) {
                    $q->where('name', 'like', '%' . $global_filter . '%');
                })
                ->orWhereHas('business_group', function ($q) use ($global_filter) {
                    $q->where('name', 'like', '%' . $global_filter . '%');
                })
                ->orWhereHas('city', function ($q) use ($global_filter) {
                    $q->where('name', 'like', '%' . $global_filter . '%');
                })
                ->orWhere("mobile_no", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("landline_no", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("address", 'LIKE', '%' . $global_filter . '%')
                ->orWhere("name", 'LIKE', '%' . $global_filter . '%')
                ->with(["country", "state", "business_category", "business_group", "city"]);
            $data = $data->skip($skip)->take($take)->get();
            $totalcount = $data->count();
        } else {
            $totalcount = business::count();
            $data = business::with(["country", "state", "city", "business_category", "business_group"])->skip($skip)->take($take)->get();
        }
        return response(["data" => $data, "totalrecord" => $totalcount]);
    }
    public function BusinessById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }

    public function BusinessInsert(Request $request)
    {
        try {
            $data = $request->only($this->model->GetModel()->fillable);
            if (business::where("name", "=", $data["name"])->count() > 0) {
                    return response(["Type" => "E", "Message" => $data["name"] . " already exists"]);
                } else {
                    $result = $this->model->Insert($request->only($this->model->GetModel()->fillable));
                    return response(["Type" => "S", "Message" => "Business inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
                }
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function BusinessUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "Business updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function BusinessDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "Business deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception->errorInfo[2]]);
        }
    }

    public function BusinessSummary($start_date, $end_date)
    {
        $result = DB::select(
            "
            SELECT
                inv.business_id as business_id,
                bus.name as business_name,
                SUM(inv.invoice_amount) as amount
            FROM
                pos.invoice as inv
            inner join
                pos.business as bus
            on
                inv.business_id = bus.id
            WHERE
                inv.invoice_date
            between
                '$start_date'
            and
                '$end_date'
            group by
                inv.business_id,
                bus.name
            "
        );
        return response($result);
    }

    public function BusinessDetailSummary($business_id, $start_date, $end_date)
    {
        $result = DB::select(
            "
            SELECT
                inv.business_id as business_id,
                inv.created_on as invoice_date,
                inv.invoice_full_no as invoice_no,
                bus.name as business_name,
                bus.business_category_id AS business_category_id,
                buscat.name as business_category_name,
                bus.business_group_id as business_group_id,
                busgrp.name as business_group_name,
                bus.contact_person_name as contact_person_name,
                inv.invoice_amount as invoice_amount,
                company.name as company_name,
                company.address as company_address,
                company.website as company_website,
                company.gst_no as company_gst_no,
                company.logo as logo
            FROM
                pos.invoice as inv
            inner join
                pos.business as bus
            on
                inv.business_id = bus.id
            inner join
                pos.business_category as buscat
            on
                bus.business_category_id = buscat.id
            left outer join
                pos.business_group as busgrp
            on
                bus.business_group_id = busgrp.id
            cross JOIN
                pos.company as company
            where
                inv.business_id = '$business_id'
            AND
                inv.invoice_date
            between
                '$start_date'
            and
                '$end_date'
            ORDER BY
                inv.created_on desc
            "
        );
        return response($result);
    }
}
