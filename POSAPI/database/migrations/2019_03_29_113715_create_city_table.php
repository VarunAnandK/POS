<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('city', function (Blueprint $table) {
            $table->BaseEntity();
            $table->string("name");
            $table->string("code");
            $table->bigInteger("country_id")->unsigned();
            $table->foreign("country_id")->references("id")->on("country")->onDelete("restrict");
            $table->bigInteger("state_id")->unsigned();
            $table->foreign("state_id")->references("id")->on("state")->onDelete("restrict");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('city');
    }
}
