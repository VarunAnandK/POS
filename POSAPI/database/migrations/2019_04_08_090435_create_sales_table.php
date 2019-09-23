<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->BaseEntity();
            $table->decimal("opening_cash",18,2)->default(0.00);
            $table->decimal("total_sales",18,2)->default(0.00);
            $table->decimal("total_card_sales",18,2)->default(0.00);
            $table->decimal("total_cash_sales",18,2)->default(0.00);
            $table->date("sales_date");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
