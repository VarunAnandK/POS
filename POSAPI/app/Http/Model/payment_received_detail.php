<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class payment_received_detail extends Model
{
    protected $table = 'payment_received_detail';
    protected $guarded = [];
    public $timestamps = false;

    public function payment_received()
    {
        return  $this->belongsTo('App\Http\Model\payment_received',"payment_received_id","id");
    }

    public function invoice()
    {
        return  $this->belongsTo('App\Http\Model\invoice',"invoice_id","id");
    }

}
