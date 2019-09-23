<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderPayment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_payment', function (Blueprint $table) {
            $table->BaseEntity();
            $table->date("date");
            $table->bigInteger("order_no");
            $table->decimal("total_amount",18,2)->default(0);
            $table->decimal("card_amount",18,2)->default(0);
            $table->decimal("cash_amount",18,2)->default(0);
            $table->decimal("balance_amount",18,2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_payment');
    }
}
