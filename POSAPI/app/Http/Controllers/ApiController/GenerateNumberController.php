<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\generate_number;
use App\Http\Repositories\Repository;

class GenerateNumberController extends Controller
{
    protected $model;

    public function __construct(generate_number $generatenumber)
    {
        $this->model = new Repository($generatenumber);
    }

    public function GetNumber($type)
    {
        $data = [];
        $data  = generate_number::where("type",$type)->first();
        $no = $data["last_order_no"];
         generate_number::where("id",$data["id"])->update(['last_order_no' => $no + 1]);
        return response($no);
    }
}
