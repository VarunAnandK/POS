<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class currency extends Model
{
    protected $table = 'currency';
    protected $guarded = [];
    public $timestamps = false;
    public function country()
    {
        return  $this->belongsTo('App\Http\Model\country',"country_id","id");
    }
}
