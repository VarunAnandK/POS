<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentReceivedDetail extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_received_detail', function (Blueprint $table) {
            $table->BaseEntity();
            $table->bigInteger("payment_received_id")->unsigned();
            $table->foreign("payment_received_id")->references("id")->on("payment_received")->onDelete("restrict");
            $table->bigInteger("invoice_id")->unsigned();
            $table->foreign("invoice_id")->references("id")->on("invoice")->onDelete("restrict");
            $table->decimal("amount",18,2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_received_detail');
    }
}
