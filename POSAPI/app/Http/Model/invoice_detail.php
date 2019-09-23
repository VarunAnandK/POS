<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class invoice_detail extends Model
{
    protected $table = 'invoice_detail';
    protected $guarded = [];
    public $timestamps = false;

    public function invoice()
    {
        return  $this->belongsTo('App\Http\Model\invoice',"invoice_id","id");
    }

    public function product()
    {
        return  $this->belongsTo('App\Http\Model\product',"product_id","id");
    }

    public function product_category()
    {
        return  $this->belongsTo('App\Http\Model\product_category',"product_category_id","id");
    }

    public function gst()
    {
        return  $this->belongsTo('App\Http\Model\gst',"gst_id","id");
    }
    
}
