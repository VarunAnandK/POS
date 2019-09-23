<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->BaseEntity();
            $table->string("name");
            $table->bigInteger("product_category_id")->unsigned();
            $table->foreign("product_category_id")->references("id")->on("product_category")->onDelete("restrict");
            $table->bigInteger("unit_id")->unsigned();
            $table->foreign("unit_id")->references("id")->on("unit_of_measurement")->onDelete("restrict");
            $table->bigInteger("product_sub_category_id")->unsigned()->nullable();
            $table->foreign("product_sub_category_id")->references("id")->on("product_category")->onDelete("restrict");
            $table->string("sku")->nullable();
            $table->string("hsnorsac");
            $table->boolean("is_stockable")->default(true);
            $table->bigInteger("gst_id")->unsigned();
            $table->foreign("gst_id")->references("id")->on("gst")->onDelete("restrict");
            $table->decimal("purchase_price",18,2)->default(0.00);
            $table->decimal("selling_price",18,2)->default(0.00);
            $table->decimal("opening_stock",18,2)->default(0.00);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
}
