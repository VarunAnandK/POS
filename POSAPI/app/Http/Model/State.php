<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class state extends Model
{
    protected $table = 'state';
    protected $guarded = [];
    public $timestamps = false;

    public function city()
    {
        return  $this->hasMany('App\Http\Model\city',"state_id","id");
    }

    public function country()
    {
        return  $this->belongsTo('App\Http\Model\country',"country_id","id");
    }
}
