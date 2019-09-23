import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { payment_received_detail } from '../Model/payment_received_detail';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentReceivedDetailService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<payment_received_detail[]>(`${this.helpermodel.ApiURL}/PaymentReceivedDetailList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<payment_received_detail>(`${this.helpermodel.ApiURL}/PaymentReceivedDetailById/${Id}`);
  }
  public Insert(payment_received_detailmodel: payment_received_detail) {
    payment_received_detailmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/PaymentReceivedDetailInsert`, payment_received_detailmodel);
  }
  public Update(payment_received_detailmodel: payment_received_detail) {
    payment_received_detailmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/PaymentReceivedDetailUpdate/${payment_received_detailmodel.id}`, payment_received_detailmodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/PaymentReceivedDetailDelete/${Id}`);
  }
  public BulkInsert(payment_received_detailmodel: payment_received_detail[]) {
    return this.httpClient.post(`${this.helpermodel.ApiURL}/PaymentReceivedDetailInsertBulk`, payment_received_detailmodel);
  }
}
