<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice', function (Blueprint $table) {
            $table->BaseEntity();
            $table->bigInteger("invoice_no");
            $table->dateTime("invoice_date");
            $table->bigInteger("order_no");
            $table->bigInteger("sales_id")->unsigned();
            $table->foreign("sales_id")->references("id")->on("sales")->onDelete("restrict");
            $table->bigInteger("business_id")->unsigned();
            $table->foreign("business_id")->references("id")->on("business")->onDelete("restrict");
            $table->decimal("discount_amount",18,2)->default(0);
            $table->decimal("invoice_amount",18,2)->default(0);
            $table->decimal("balance_amount",18,2)->default(0);
            $table->decimal("gst_amount",18,2)->default(0);
            $table->decimal("sub_total",18,2)->default(0);
            $table->decimal("change",18,2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoice');
    }
}
