<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentReceived extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_received', function (Blueprint $table) {
            $table->BaseEntity();
            $table->bigInteger("payment_received_no");
            $table->string("payment_received_full_no");
            $table->dateTime("payment_received_date");
            $table->bigInteger("invoice_id")->unsigned();
            $table->foreign("invoice_id")->references("id")->on("invoice")->onDelete("restrict");
            $table->bigInteger("payment_method_id")->unsigned();
            $table->foreign("payment_method_id")->references("id")->on("payment_method")->onDelete("restrict");
            $table->decimal("payment_received_amount",18,2)->default(0);
            $table->string("note")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_received');
    }
}
