<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class company extends Model
{
    protected $table = 'company';
    protected $guarded = [];
    public $timestamps = false;

    public function country()
    {
        return  $this->belongsTo('App\Http\Model\country',"country_id","id");
    }

    public function state()
    {
        return  $this->belongsTo('App\Http\Model\state',"state_id","id");
    }

    public function city()
    {
        return  $this->belongsTo('App\Http\Model\city',"city_id","id");
    }
}
