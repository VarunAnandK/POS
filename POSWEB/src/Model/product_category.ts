import {BaseModel} from './Base-model';
export class product_category extends BaseModel {
    name : string;
    code : string;
    product_category_name : string;
    parent_category_id : number = 0;
    parent_category: product_category;
}