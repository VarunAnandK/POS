import {BaseModel} from './Base-model';
import { country } from './country';
export class state extends BaseModel {
    name : string;
    code : string;
    country_id : number = 0;
    country : country;
}