import { BaseModel } from '../Model/Base-model';
import { state } from './state';
import { country } from './country';
import { city } from './city';
export class company extends BaseModel {
    name: string;
    address: string;
    postal_code: string;
    email: string;
    website: string;
    phone_no: string;
    gst_no: string;
    logo: string;
    is_gst: boolean = false;
    country_id: number;
    state_id: number;
    city_id: number;
    is_gst_enable: boolean = false;
    is_credits_enable: boolean = false;
    country: country;
    state: state;
    city: city;
}
