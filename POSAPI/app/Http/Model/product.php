<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    protected $table = 'product';
    protected $guarded = [];
    public $timestamps = false;

    public function product_category()
    {
        return  $this->belongsTo('App\Http\Model\product_category',"product_category_id","id");
    }

    public function sub_product_category()
    {
        return  $this->belongsTo('App\Http\Model\product_category',"product_sub_category_id","id");
    }

    public function unit()
    {
        return  $this->belongsTo('App\Http\Model\unit_of_measurement',"unit_id","id");
    }

    public function gst()
    {
        return  $this->belongsTo('App\Http\Model\gst',"gst_id","id");
    }
}
