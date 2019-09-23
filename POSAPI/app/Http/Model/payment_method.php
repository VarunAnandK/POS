<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class payment_method extends Model
{
    protected $table = 'payment_method';
    protected $guarded = [];
    public $timestamps = false;
}
