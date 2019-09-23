<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class order extends Model
{
    protected $table = 'order';
    protected $guarded = [];
    public $timestamps = false;

    public function sales()
    {
        return  $this->belongsTo('App\Http\Model\sales',"sales_id","id");
    }

    public function product()
    {
        return  $this->belongsTo('App\Http\Model\product',"product_id","id");
    }

    public function product_category()
    {
        return  $this->belongsTo('App\Http\Model\product_category',"product_category_id","id");
    }

    public function sub_product_category()
    {
        return  $this->belongsTo('App\Http\Model\product_category',"product_sub_category_id","id");
    }

    public function gst()
    {
        return  $this->belongsTo('App\Http\Model\gst',"gst_id","id");
    }

    public function business()
    {
        return  $this->belongsTo('App\Http\Model\business',"business_id","id");
    }
}
