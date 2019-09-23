import { BaseModel } from '../Model/Base-model';
import { sales } from './sales';
import { business } from './business';
import { invoice } from './invoice';
import { payment_method } from './payment_method';
export class payment_received extends BaseModel {
    payment_received_no: number;
    payment_received_full_no: string;
    payment_received_date: string;
    invoice_id: number;
    business_id: number;
    payment_received_amount: number = 0;
    note: string;
    payment_method_id: number;
    payment_method: payment_method;
    invoice: invoice;
    business: business;
}