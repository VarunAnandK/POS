<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order', function (Blueprint $table) {
            $table->BaseEntity();
            $table->bigInteger("order_no");
            $table->dateTime("order_date");
            $table->bigInteger("business_id")->unsigned();
            $table->foreign("business_id")->references("id")->on("business")->onDelete("restrict");
            $table->bigInteger("sales_id")->unsigned();
            $table->foreign("sales_id")->references("id")->on("sales")->onDelete("restrict");
            $table->bigInteger("product_id")->unsigned();
            $table->foreign("product_id")->references("id")->on("product")->onDelete("restrict");
            $table->bigInteger("product_category_id")->unsigned();
            $table->foreign("product_category_id")->references("id")->on("product_category")->onDelete("restrict");
            $table->bigInteger("product_sub_category_id")->unsigned()->nullable();
            $table->foreign("product_sub_category_id")->references("id")->on("product_category")->onDelete("restrict");
            $table->bigInteger("qty")->default(1);
            $table->decimal("price",18,2)->default(0);
            $table->bigInteger("gst_id")->unsigned();
            $table->foreign("gst_id")->references("id")->on("gst")->onDelete("restrict");
            $table->decimal("discount_amount",18,2)->default(0);
            $table->decimal("discount_percentage",18,2)->default(0);
            $table->decimal("gst_amount",18,2)->default(0);
            $table->decimal("gst_percentage",18,2)->default(0);
            $table->decimal("cgst_amount",18,3)->default(0);
            $table->decimal("cgst_percentage",18,2)->default(0);
            $table->decimal("sgst_amount",18,3)->default(0);
            $table->decimal("sgst_percentage",18,2)->default(0);
            $table->decimal("igst_amount",18,3)->default(0);
            $table->decimal("igst_percentage",18,2)->default(0);
            $table->decimal("sub_total",18,2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order');
    }
}
