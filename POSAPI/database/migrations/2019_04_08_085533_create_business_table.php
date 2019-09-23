<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusinessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business', function (Blueprint $table) {
            $table->BaseEntity();
            $table->bigInteger("business_category_id")->unsigned();
            $table->foreign("business_category_id")->references("id")->on("business_category")->onDelete("restrict");
            $table->bigInteger("business_group_id")->nullable()->unsigned();
            $table->foreign("business_group_id")->references("id")->on("business_group")->onDelete("restrict");
            $table->string("name");
            $table->string("mobile_no");
            $table->string("landline_no")->nullable();
            $table->string("additional_mobile_no")->nullable();
            $table->string("contact_person_name")->nullable();
            $table->bigInteger("country_id")->unsigned();
            $table->foreign("country_id")->references("id")->on("country")->onDelete("restrict");
            $table->bigInteger("state_id")->unsigned();
            $table->foreign("state_id")->references("id")->on("state")->onDelete("restrict");
            $table->bigInteger("city_id")->unsigned();
            $table->foreign("city_id")->references("id")->on("city")->onDelete("restrict");
            $table->string("address");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('business');
    }
}
