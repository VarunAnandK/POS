import { BaseModel } from '../Model/Base-model';
import { sales } from './sales';
import { business } from './business';
export class invoice extends BaseModel {
    invoice_no: number;
    invoice_full_no: string;
    invoice_date: string;
    order_no: number;
    sales_id: number;
    business_id: number;
    discount_amount: number = 0;
    invoice_amount: number = 0;
    balance_amount: number = 0;
    gst_amount: number = 0;
    sub_total: number = 0;
    round_off: number = 0;
    change: number = 0;
    sales: sales;
    business: business;
}
