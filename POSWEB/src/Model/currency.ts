import {BaseModel} from '../Model/Base-model';
import { country } from './country';
export class currency extends BaseModel {
    name : string;
    code : string;
    symbol : string;
    country_id : number = 0;
    country : country;
}