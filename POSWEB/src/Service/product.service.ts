import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../Model/product';
import { HelperModel } from 'src/Model/Helper-model';
import { product_summary } from 'src/Model/product_summary';
import { product_detail_summary } from 'src/Model/product_detail_summary';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetSearchAndList(take: number = 1, skip: number = 0, global_filter: string = "") {
    if (global_filter == null) {
      global_filter = "";
    }
    return this.httpClient.get<any[]>(`${this.helpermodel.ApiURL}/ProductSearchAndList/${take}/${skip}/${global_filter}`);
  }
  public GetAll() {
    return this.httpClient.get<product[]>(`${this.helpermodel.ApiURL}/ProductList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<product>(`${this.helpermodel.ApiURL}/ProductById/${Id}`);
  }
  public Insert(productmodel: product) {
    productmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/ProductInsert`, productmodel);
  }
  public Update(productmodel: product) {
    productmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/ProductUpdate/${productmodel.id}`, productmodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/ProductDelete/${Id}`);
  }
  public GetAllProductByName(product_filter: string = "") {
    if (product_filter == null) {
      product_filter = "";
    }
    return this.httpClient.get<product[]>(`${this.helpermodel.ApiURL}/GetAllProductByName/${product_filter}`);
  }
  public GetAllProductByBarcode(product_filter: string = "") {
    return this.httpClient.get<product>(`${this.helpermodel.ApiURL}/GetAllProductByBarcode/${product_filter}`);
  }
  public ProductSummary(StartDate : string,EndDate : string) {
    return this.httpClient.get<product_summary[]>(`${this.helpermodel.ApiURL}/ProductSummary/${StartDate}/${EndDate}`);
  }
  public ProductDetailSummary(product_id: number, start_date: string, end_date: string) {
    return this.httpClient.get<product_detail_summary[]>(`${this.helpermodel.ApiURL}/ProductDetailSummary/${product_id}/${start_date}/${end_date}`);
  }
}
