<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class payment_received extends Model
{
    protected $table = 'payment_received';
    protected $guarded = [];
    public $timestamps = false;

    public function invoice()
    {
        return  $this->belongsTo('App\Http\Model\invoice',"invoice_id","id");
    }

    public function payment_method()
    {
        return  $this->belongsTo('App\Http\Model\payment_method',"payment_method_id","id");
    }
    
    public function business()
    {
        return  $this->belongsTo('App\Http\Model\business',"business_id","id");
    }
}
