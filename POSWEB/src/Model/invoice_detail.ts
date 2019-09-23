import { BaseModel } from '../Model/Base-model';
import { invoice } from './invoice';
import { product } from './product';
import { product_category } from './product_category';
import { gst } from './gst';
export class invoice_detail extends BaseModel {
    invoice_id: number;
    product_id: number;
    product_category_id: number;
    qty: number = 0;
    price: number = 0;
    gst_id: number;
    discount_amount: number = 0;
    discount_percentage: number = 0;
    gst_amount: number = 0;
    gst_percentage: number = 0;
    cgst_amount: number = 0;
    cgst_percentage: number = 0;
    sgst_amount: number = 0;
    sgst_percentage: number = 0;
    igst_amount: number = 0;
    igst_percentage: number = 0;
    sub_total: number = 0;
    total: number = 0;
    invoice: invoice;
    product: product;
    product_category: product_category;
    gst: gst;
}
