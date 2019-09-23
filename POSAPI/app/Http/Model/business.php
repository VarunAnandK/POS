<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class business extends Model
{
    protected $table = 'business';
    protected $guarded = [];
    public $timestamps = false;

    public function business_category()
    {
        return  $this->belongsTo('App\Http\Model\business_category',"business_category_id","id");
    }

    public function business_group()
    {
        return  $this->belongsTo('App\Http\Model\business_group',"business_group_id","id");
    }

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
