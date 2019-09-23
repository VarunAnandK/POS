<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class invoice extends Model
{
    protected $table = 'invoice';
    protected $guarded = [];
    public $timestamps = false;

    public function sales()
    {
        return  $this->belongsTo('App\Http\Model\sales',"sales_id","id");
    }

    public function business()
    {
        return  $this->belongsTo('App\Http\Model\business',"business_id","id");
    }
}
