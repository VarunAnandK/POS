<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class gst extends Model
{
    protected $table = 'gst';
    protected $guarded = [];
    public $timestamps = false;

    public function gst_detail()
    {
        return  $this->belongsTo('App\Http\Model\gst_detail',"id","gst_id");
    }

}
