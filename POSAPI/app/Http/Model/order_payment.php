<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class order_payment extends Model
{
    protected $table = 'order_payment';
    protected $guarded = [];
    public $timestamps = false;

    public function payment_method()
    {
        return  $this->belongsTo('App\Http\Model\payment_method',"payment_method_id","id");
    }
}
