import { BaseModel } from '../Model/Base-model';
import { product_category } from './product_category';
import { unit_of_measurement } from './unit_of_measurement';
import { gst } from './gst';
export class product extends BaseModel {
    name: string;
    product_category_id: number;
    unit_id: number;
    product_sub_category_id: number;
    hsnorsac: string;
    sku: string;
    is_stockable: boolean = true;
    gst_id: number;
    purchase_price: number = 0;
    selling_price: number = 0;
    opening_stock: number = 0;
    barcode : string;
    product_sub_category_name : string;
    product_category: product_category;
    unit: unit_of_measurement;
    sub_product_category: product_category;
    gst: gst;
}
