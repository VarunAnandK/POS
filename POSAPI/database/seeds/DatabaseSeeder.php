<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user')->insert([
            'company_id' => '1',
            'user_name' => "sadmin",
            'email' => 'admin@gmail.com',
            'password' => '123',
            'created_by_id' => '1',
            'api_token' => Hash("sha256",Str::random(60))
        ]);
        DB::table('business_category')->insert([
            'id' => "1",
            'name' => "Walk In",
            'code' => 'WI',
            'created_by_id' => '1',
        ]);

        DB::table('payment_method')->insert([
            'id' => "1",
            'name' => "Cash",
            'code' => 'Cash',
            'is_cash' => true,
            'is_credit' => false,
            'created_by_id' => '1',
        ]);

        DB::table('payment_method')->insert([
            'id' => "2",
            'name' => "Credit",
            'code' => 'Credit',
            'is_cash' => false,
            'is_credit' => true,
            'created_by_id' => '1',
        ]);

        DB::table('country')->insert([
            'id' => "1",
            'name' => "India",
            'code' => 'IND',
            'created_by_id' => '1',
        ]);

        DB::table('state')->insert([
            'id' => "1",
            'name' => "Tamil Nadu",
            'code' => 'TN',
            'country_id' => '1',
            'created_by_id' => '1',
        ]);

        DB::table('city')->insert([
            'id' => "1",
            'name' => "Coimbatore",
            'code' => 'CBE',
            'country_id' => '1',
            'state_id' => '1',
            'created_by_id' => '1',
        ]);

        DB::table('company')->insert([
            'id' => "1",
            'name' => "Wipro Info Tech Solutions",
            'country_id' => '1',
            'state_id' => '1',
            'city_id' => '1',
            'address' => 'Saibaba Colony',
            'postal_code' => '641011',
            'phone_no' => '9999999999',
            'created_by_id' => '1',
        ]);

        DB::table('currency')->insert([
            'id' => "1",
            'name' => "Rupees",
            'code' => 'RS',
            'country_id' => '1',
            'symbol' => '₹',
            'created_by_id' => '1',
        ]);
        DB::table('business')->insert([
            'id' => "1",
            'name' => "Walk In",
            'created_by_id' => '1',
            'business_category_id' => "1",
            "mobile_no" => '',
            "landline_no" => '',
            "additional_mobile_no" => '',
            "country_id" => '1',
            "state_id" => '1',
            "city_id" => '1',
            "address" => 'walk in',
        ]);
        DB::table('generate_number')->insert([
            'id' => "1",
            'type' => "Order",
            'last_order_no' => '1',
            'created_by_id' => '1',
        ]);

        DB::table('generate_number')->insert([
            'id' => "2",
            'type' => "Invoice",
            'last_order_no' => '1',
            'created_by_id' => '1',
        ]);

        DB::table('generate_number')->insert([
            'id' => "3",
            'type' => "Payment Received",
            'last_order_no' => '1',
            'created_by_id' => '1',
        ]);

        DB::table('gst_category')->insert([
            'id' => "1",
            'type' => "L",
            'name' => 'CGST',
            'created_by_id' => '1',
        ]);
        DB::table('gst_category')->insert([
            'id' => "2",
            'type' => "L",
            'name' => 'SGST',
            'created_by_id' => '1',
        ]);

        DB::table('gst_category')->insert([
            'id' => "3",
            'type' => "O",
            'name' => 'IGST',
            'created_by_id' => '1',
        ]);

        DB::table('gst')->insert([
            'id' => "1",
            'name' => 'Non GST',
            'created_by_id' => '1',
        ]);

        DB::table('gst')->insert([
            'id' => "2",
            'name' => '5%',
            'created_by_id' => '1',
        ]);

        DB::table('gst')->insert([
            'id' => "3",
            'name' => '12%',
            'created_by_id' => '1',
        ]);

        DB::table('gst')->insert([
            'id' => "4",
            'name' => '18%',
            'created_by_id' => '1',
        ]);

        DB::table('gst')->insert([
            'id' => "5",
            'name' => '28%',
            'created_by_id' => '1',
        ]);

        DB::table('gst_detail')->insert([
            'id' => "1",
            'percentage' => '2.5',
            'gst_id' => '2',
            'gst_category_id' => '1',
            'created_by_id' => '1',
        ]);

        DB::table('gst_detail')->insert([
            'id' => "2",
            'percentage' => '2.5',
            'gst_id' => '2',
            'gst_category_id' => '2',
            'created_by_id' => '1',
        ]);

        DB::table('gst_detail')->insert([
            'id' => "3",
            'percentage' => '6',
            'gst_id' => '3',
            'gst_category_id' => '1',
            'created_by_id' => '1',
        ]);

        DB::table('gst_detail')->insert([
            'id' => "4",
            'percentage' => '6',
            'gst_id' => '3',
            'gst_category_id' => '2',
            'created_by_id' => '1',
        ]);

        DB::table('gst_detail')->insert([
            'id' => "5",
            'percentage' => '9',
            'gst_id' => '4',
            'gst_category_id' => '1',
            'created_by_id' => '1',
        ]);

        DB::table('gst_detail')->insert([
            'id' => "6",
            'percentage' => '9',
            'gst_id' => '4',
            'gst_category_id' => '2',
            'created_by_id' => '1',
        ]);

        DB::table('gst_detail')->insert([
            'id' => "7",
            'percentage' => '14',
            'gst_id' => '5',
            'gst_category_id' => '1',
            'created_by_id' => '1',
        ]);

        DB::table('gst_detail')->insert([
            'id' => "8",
            'percentage' => '14',
            'gst_id' => '5',
            'gst_category_id' => '2',
            'created_by_id' => '1',
        ]);
    }
}
