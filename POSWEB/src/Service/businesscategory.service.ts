import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { business_category } from '../Model/business_category';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class BusinessCategoryService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<business_category[]>(`${this.helpermodel.ApiURL}/BusinessCategoryList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<business_category>(`${this.helpermodel.ApiURL}/BusinessCategoryById/${Id}`);
  }
  public Insert(businesscategorymodel: business_category) {
    businesscategorymodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/BusinessCategoryInsert`, businesscategorymodel);
  }
  public Update(businesscategorymodel: business_category) {
    businesscategorymodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/BusinessCategoryUpdate/${businesscategorymodel.id}`, businesscategorymodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/BusinessCategoryDelete/${Id}`);
  }
}
