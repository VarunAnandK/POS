import { BaseModel } from '../Model/Base-model';
import { payment_received } from './payment_received';
//import { payment_method } from './payment_method';
import { invoice } from './invoice';
export class payment_received_detail extends BaseModel {
    payment_received_id: number;
    invoice_id: number;
    amount: number = 0;
    note: string;
    payment_received: payment_received;
    invoice: invoice;
}