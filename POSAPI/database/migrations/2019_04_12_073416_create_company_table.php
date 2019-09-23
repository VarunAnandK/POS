<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company', function (Blueprint $table) {
            $table->BaseEntity();
            $table->string("name");
            $table->bigInteger("country_id")->unsigned();
            $table->foreign("country_id")->references("id")->on("country")->onDelete("restrict");
            $table->bigInteger("state_id")->unsigned();
            $table->foreign("state_id")->references("id")->on("state")->onDelete("restrict");
            $table->bigInteger("city_id")->unsigned();
            $table->foreign("city_id")->references("id")->on("city")->onDelete("restrict");
            $table->string("address");
            $table->string("postal_code");
            $table->string("email")->nullable();
            $table->string("website")->nullable();
            $table->string("phone_no");
            $table->string("gst_no")->nullable();
            $table->longText("logo")->nullable();
            $table->boolean("is_gst")->default(false);
            $table->boolean("is_credits_enable")->default(false);
            $table->boolean("is_gst_enable")->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company');
    }
}
