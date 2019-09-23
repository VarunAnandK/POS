<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSpOrderToInvoice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $procedure = "
        create
    definer = root@localhost procedure sp_order_to_invoice(IN in_created_by_id bigint, IN in_order_no bigint,
                                                           IN in_sales_id bigint, IN in_note text, OUT out_type text,
                                                           OUT out_message text, OUT out_invoice_id bigint)
            BEGIN
            DECLARE var_invoice_id bigint default 0;
            DECLARE var_payment_received_id bigint default 0;
            DECLARE var_invoice_no bigint default 0;
            DECLARE var_payment_received_no bigint default 0;
            DECLARE mysql_msg longtext DEFAULT '';
            DECLARE mysql_code longtext DEFAULT '';
            DECLARE var_finished INTEGER DEFAULT 0;
            DECLARE cur_var_date date;
            DECLARE cur_var_cash_amount decimal(18,2);
            DECLARE cur_var_card_amount decimal(18,2);
            DECLARE cur_var_credit_amount decimal(18,2);
            DECLARE cur_var_balance_amount decimal(18,2);
            DECLARE cur_var_payment_method_id bigint default 0;
            DECLARE cur_var_is_cash boolean default false;
            DECLARE cur_order CURSOR FOR
                SELECT
                        op.date,
                        op.cash_amount,
                        op.card_amount,
                        op.credit_amount,
                        op.balance_amount,
                        op.payment_method_id ,
                        pm.is_cash
                from
                        pos.`order_payment` as op
                inner join
                        pos.payment_method as pm
                on
                        pm.id = op.payment_method_id
                where
                    order_no = in_order_no;

            DECLARE CONTINUE HANDLER  FOR NOT FOUND SET var_finished = 1;


            DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
                BEGIN
                GET DIAGNOSTICS CONDITION 1
                    mysql_code = RETURNED_SQLSTATE,mysql_msg = MESSAGE_TEXT;
                END;
            START TRANSACTION;
            SET FOREIGN_KEY_CHECKS=0;
            SET SQL_SAFE_UPDATES = 0;
            SELECT
                gn.last_order_no
            INTO var_invoice_no FROM
                pos.generate_number as gn
            WHERE
                gn.type = 'Invoice';

            UPDATE pos.generate_number as gn SET gn.last_order_no = var_invoice_no + 1 WHERE gn.type = 'Invoice';


            INSERT INTO
                pos.invoice
                (invoice_date,
                invoice_no,
                invoice_full_no,
                business_id,
                discount_amount,
                gst_amount,
                invoice_amount,
                balance_amount,
                round_off,
                order_no,
                sales_id,
                sub_total,
                created_by_id)
            SELECT
                CURRENT_DATE() as invoice_date,
                var_invoice_no,
                CONCAT(replace(date(CURRENT_DATE()),'-',''),'-',var_invoice_no),
                ord.business_id,
                sum(ord.discount_amount) as discount_amount,
                sum(gst_amount) as gst_amount,
                sum(((ord.qty * ord.price) - ord.discount_amount) + ord.gst_amount)  as invoice_amount,
                sum(0) as balance_amount,
                ord.round_off as rounf_off,
                ord.order_no,
                ord.sales_id,
                sum(ord.qty * ord.price) as sub_total,
                in_created_by_id
            FROM
                pos.order as ord
            WHERE
                ord.order_no = in_order_no
            GROUP BY
                ord.order_no,
                ord.business_id,
                ord.round_off,
                ord.sales_id;

            SET var_invoice_id = LAST_INSERT_ID();
            UPDATE pos.invoice SET pos.invoice.change = (select opi.balance_amount from pos.`order_payment` as opi where opi.order_no =  in_order_no limit  1), pos.invoice.invoice_amount = pos.invoice.invoice_amount + pos.invoice.round_off WHERE pos.invoice.id = var_invoice_id;

            INSERT INTO
                pos.invoice_detail
                (invoice_id,
                product_id,
                product_category_id,
                qty,
                price,
                gst_id,
                discount_amount,
                discount_percentage,
                gst_amount,
                cgst_amount,
                cgst_percentage,
                sgst_amount,
                sgst_percentage,
                igst_amount,
                igst_percentage,
                sub_total,
                total,
                created_by_id)
            SELECT
                var_invoice_id,
                ord.product_id,
                ord.product_category_id,
                ord.qty,
                ord.price,
                ord.gst_id,
                ord.discount_amount,
                ord.discount_percentage,
                ord.gst_amount,
                ord.cgst_amount,
                ord.cgst_percentage,
                ord.sgst_amount,
                ord.sgst_percentage,
                ord.igst_amount,
                ord.igst_percentage,
                (ord.qty * ord.price),
                ord.sub_total,
                in_created_by_id
            FROM
                pos.order as ord
            WHERE
                ord.order_no = in_order_no;

            Open cur_order;
            get_order: LOOP
            FETCH cur_order INTO cur_var_date,cur_var_cash_amount,cur_var_card_amount,cur_var_credit_amount,cur_var_balance_amount,cur_var_payment_method_id,cur_var_is_cash;
            IF var_finished = 1 THEN
                LEAVE get_order;
            end if;

            SELECT
                gn.last_order_no
            INTO var_payment_received_no FROM
                pos.generate_number as gn
            WHERE
                gn.type = 'Payment Received';

            UPDATE pos.generate_number as gn SET gn.last_order_no = var_invoice_no + 1 WHERE gn.type = 'Payment Received';

            INSERT INTO
                pos.payment_received
                (
                    payment_received_date,
                    payment_received_no,
                    payment_received_full_no,
                    invoice_id,
                    payment_method_id,
                    payment_received_amount,
                    note,
                    created_by_id
                )
            VALUES
                (
                    cur_var_date,
                    var_payment_received_no,
                    CONCAT(YEAR(CURRENT_DATE()),'-',var_payment_received_no),
                    var_invoice_id,
                    cur_var_payment_method_id,
                    (CASE WHEN cur_var_is_cash = true THEN
                        (cur_var_card_amount + cur_var_cash_amount + cur_var_credit_amount) + cur_var_balance_amount
                    ELSE
                        cur_var_card_amount + cur_var_cash_amount + cur_var_credit_amount
                    END),
                    in_note,
                    in_created_by_id
                );

            SET var_payment_received_id = LAST_INSERT_ID();

            INSERT INTO
                pos.payment_received_detail
                (
                    payment_received_id,
                    invoice_id,
                    amount,
                    created_by_id
                )
            VALUES
                (
                    var_payment_received_id,
                    var_invoice_id,
                    (CASE WHEN cur_var_is_cash = true THEN
                        (cur_var_card_amount + cur_var_cash_amount + cur_var_credit_amount) + cur_var_balance_amount
                    ELSE
                        cur_var_card_amount + cur_var_cash_amount + cur_var_credit_amount
                    END),
                    in_created_by_id
                );

            end loop get_order;
            CLOSE cur_order;

            UPDATE
                pos.sales  as sale
            SET
                sale.total_cash_sales=  sale.total_cash_sales +
                IFNULL((SELECT
                    (ordpay.cash_amount + ordpay.card_amount + ordpay.credit_amount) + ordpay.balance_amount
                FROM
                    pos.order_payment as ordpay
                INNER JOIN
                    pos.payment_method as pm
                on
                    pm.id = ordpay.payment_method_id
                WHERE
                    ordpay.order_no = in_order_no
                AND
                    pm.is_cash = true
                AND
                            pm.is_credit = false),0),
                sale.total_card_sales = sale.total_card_sales +
                IFNULL((SELECT
                    SUM(ordpay.cash_amount + ordpay.card_amount + ordpay.credit_amount)
                FROM
                    pos.order_payment as ordpay
                INNER JOIN
                    pos.payment_method as pm
                on
                    pm.id = ordpay.payment_method_id
                WHERE
                    ordpay.order_no = in_order_no
                AND
                    pm.is_cash = false
                    AND
                            pm.is_credit = false),0),
                sale.total_credit_sales = sale.total_credit_sales +
                    IFNULL((SELECT
                    SUM(ordpay.cash_amount + ordpay.card_amount + ordpay.credit_amount)
                FROM
                    pos.order_payment as ordpay
                INNER JOIN
                    pos.payment_method as pm
                on
                    pm.id = ordpay.payment_method_id
                WHERE
                    ordpay.order_no = in_order_no
                AND
                        pm.is_credit = true
                AND
                    pm.is_cash = false),0),
                sale.total_sales =  sale.total_sales +
                IFNULL((SELECT
                    SUM(ordpay.cash_amount + ordpay.card_amount + ordpay.credit_amount) + ordpay.balance_amount
                FROM
                    pos.order_payment as ordpay
                WHERE
                    ordpay.order_no = in_order_no),0)
            WHERE
                sale.id = in_sales_id;
            DELETE FROM pos.order where order_no =  in_order_no;
            DELETE FROM pos.order_payment where order_no =  in_order_no;
            IF mysql_code = null OR mysql_code = '' THEN
                SET FOREIGN_KEY_CHECKS=1;
                SET out_type = 'S';
                SET out_message = 'Invoice created successfully';
                SET out_invoice_id = var_invoice_id;
                COMMIT;
            ELSE
                SET FOREIGN_KEY_CHECKS=1;
                SET out_type = 'E';
                SET out_message = mysql_msg;
                SET out_invoice_id = 0;
                ROLLBACK;
            END IF;
    END;
    ";
        DB::unprepared($procedure);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $sql = "DROP PROCEDURE IF EXISTS sp_order_to_invoice";
        DB::connection()->getPdo()->exec($sql);
    }
}
