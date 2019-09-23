import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { payment_received } from '../Model/payment_received';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentReceivedService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<payment_received[]>(`${this.helpermodel.ApiURL}/PaymentReceivedList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<payment_received>(`${this.helpermodel.ApiURL}/PaymentReceivedById/${Id}`);
  }
  public Insert(paymentmethodmodel: payment_received) {
    paymentmethodmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/PaymentReceivedInsert`, paymentmethodmodel);
  }
  public Update(paymentmethodmodel: payment_received) {
    paymentmethodmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/PaymentReceivedUpdate/${paymentmethodmodel.id}`, paymentmethodmodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/PaymentReceivedDelete/${Id}`);
  }
}
