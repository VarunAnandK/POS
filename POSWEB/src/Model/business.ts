import { BaseModel } from '../Model/Base-model';
import { state } from './state';
import { country } from './country';
import { city } from './city';
import { business_group } from './business_group';
import { business_category } from './business_category';
export class business extends BaseModel {
    name: string;
    mobile_no: string;
    landline_no: string;
    contact_person_name: string;
    additional_mobile_no: string;
    business_category_id: number;
    business_group_id: number;
    country_id: number;
    state_id: number;
    city_id: number;
    business_category: business_category;
    business_group: business_group;
    country: country;
    state: state;
    city: city;
    address: string;
}