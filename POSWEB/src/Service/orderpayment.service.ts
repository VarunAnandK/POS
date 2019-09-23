import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperModel } from 'src/Model/Helper-model';
import { order_payment } from 'src/Model/order_payment';

@Injectable({
  providedIn: 'root'
})
export class OrderPaymentService {
  constructor(private httpClient: HttpClient,private helpermodel : HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<order_payment[]>(`${this.helpermodel.ApiURL}/OrderPaymentList`);
  }
  public GetById(Id:number) {
    return this.httpClient.get<order_payment>(`${this.helpermodel.ApiURL}/OrderPaymentById/${Id}`);
  }
  public Insert(orderpaymentmodel: order_payment) {
    orderpaymentmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/OrderPaymentInsert`, orderpaymentmodel);
  }
  public Update(orderpaymentmodel: order_payment) {
   
    orderpaymentmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/OrderPaymentUpdate/${orderpaymentmodel.id}`, orderpaymentmodel);
  }
  public Delete(Id:number) {
    
    return this.httpClient.get(`${this.helpermodel.ApiURL}/OrderPaymentDelete/${Id}`);
  }
  public GetOrderPaymentByOrderNo(OrderNo: number) {
    return this.httpClient.get<order_payment[]>(`${this.helpermodel.ApiURL}/GetOrderPaymentByOrderNo/${OrderNo}`);
  }
}
