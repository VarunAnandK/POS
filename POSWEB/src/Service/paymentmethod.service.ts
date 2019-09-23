import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { payment_method } from '../Model/payment_method';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<payment_method[]>(`${this.helpermodel.ApiURL}/PaymentMethodList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<payment_method>(`${this.helpermodel.ApiURL}/PaymentMethodById/${Id}`);
  }
  public Insert(paymentmethodmodel: payment_method) {
    paymentmethodmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/PaymentMethodInsert`, paymentmethodmodel);
  }
  public Update(paymentmethodmodel: payment_method) {
    paymentmethodmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/PaymentMethodUpdate/${paymentmethodmodel.id}`, paymentmethodmodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/PaymentMethodDelete/${Id}`);
  }
}
