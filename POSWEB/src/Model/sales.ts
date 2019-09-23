import { BaseModel } from '../Model/Base-model';
import { apphelper } from 'src/Model/apphelper';
export class sales extends BaseModel {
    opening_cash: number;
    total_sales: number;
    total_card_sales: number;
    total_cash_sales: number;
    total_credit_sales: number;
    sales_date : string = apphelper.GetCurrentDate();
    is_completed: boolean = false;
}