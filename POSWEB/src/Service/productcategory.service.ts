import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product_category } from '../Model/product_category';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<product_category[]>(`${this.helpermodel.ApiURL}/ProductCategoryList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<product_category>(`${this.helpermodel.ApiURL}/ProductCategoryById/${Id}`);
  }
  public Insert(productcategorymodel: product_category) {
    productcategorymodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/ProductCategoryInsert`, productcategorymodel);
  }
  public Update(productcategorymodel: product_category) {
    productcategorymodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/ProductCategoryUpdate/${productcategorymodel.id}`, productcategorymodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/ProductCategoryDelete/${Id}`);
  }
  public GetAllParentCategory() {
    return this.httpClient.get<product_category[]>(`${this.helpermodel.ApiURL}/ParentProductCategoryList`);
  }
  public GetProductCategoryByParentCategoryId(Id: number) {
    return this.httpClient.get<product_category[]>(`${this.helpermodel.ApiURL}/ProductCategoryByParentCategoryId/${Id}`);
  }
}
