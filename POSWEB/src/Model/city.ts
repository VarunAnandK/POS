import { BaseModel } from '../Model/Base-model';
import { state } from './state';
import { country } from './country';
export class city extends BaseModel {
    name: string;
    code: string;
    country_id: number;
    state_id: number;
    state: state;
    country: country;
}