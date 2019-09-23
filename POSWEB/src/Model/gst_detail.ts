import {BaseModel} from './Base-model';
import { gst } from './gst';
import { gst_category } from './gst_category';
export class gst_detail extends BaseModel {
    percentage : number = 0;
    gst_id : number;
    gst_category_id : number;
    gst : gst;
    gst_category : gst_category;
}