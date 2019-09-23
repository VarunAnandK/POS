import {BaseModel} from './Base-model';
export class payment_method extends BaseModel {
    name : string;
    code : string;
    is_cash : boolean = false;
    is_credit : boolean = false;
}