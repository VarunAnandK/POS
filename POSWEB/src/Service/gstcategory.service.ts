import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gst_category } from '../Model/gst_category';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class GSTCategoryService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<gst_category[]>(`${this.helpermodel.ApiURL}/GSTCategoryList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<gst_category>(`${this.helpermodel.ApiURL}/GSTCategoryById/${Id}`);
  }
  public Insert(gstcategorymodel: gst_category) {
    gstcategorymodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/GSTCategoryInsert`, gstcategorymodel);
  }
  public Update(gstcategorymodel: gst_category) {
    gstcategorymodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/GSTCategoryUpdate/${gstcategorymodel.id}`, gstcategorymodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/GSTCategoryDelete/${Id}`);
  }
}
