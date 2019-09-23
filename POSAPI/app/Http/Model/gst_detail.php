<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class gst_detail extends Model
{
    protected $table = 'gst_detail';
    protected $guarded = [];
    public $timestamps = false;

    public function gst()
    {
        return  $this->belongsTo('App\Http\Model\gst',"gst_id","id");
    }

    public function gst_category()
    {
        return  $this->belongsTo('App\Http\Model\gst_category',"gst_category_id","id");
    }
}
