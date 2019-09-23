<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGstdetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gst_detail', function (Blueprint $table) {
            $table->BaseEntity();
            $table->string("percentage");
            $table->bigInteger("gst_id")->unsigned();
            $table->foreign("gst_id")->references("id")->on("gst")->onDelete("restrict");
            $table->bigInteger("gst_category_id")->unsigned();
            $table->foreign("gst_category_id")->references("id")->on("gst_category")->onDelete("restrict");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gstdetail');
    }
}
