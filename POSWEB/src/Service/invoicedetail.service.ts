import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { invoice_detail } from '../Model/invoice_detail';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<invoice_detail[]>(`${this.helpermodel.ApiURL}/InvoiceDetailList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<invoice_detail>(`${this.helpermodel.ApiURL}/InvoiceDetailById/${Id}`);
  }
  public Insert(invoice_detailmodel: invoice_detail) {
    invoice_detailmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/InvoiceDetailInsert`, invoice_detailmodel);
  }
  public BulkInsert(invoice_detailmodel: invoice_detail[]) {
    return this.httpClient.post(`${this.helpermodel.ApiURL}/InvoiceDetailInsertBulk`, invoice_detailmodel);
  }
  public Update(invoice_detailmodel: invoice_detail) {
    invoice_detailmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/InvoiceDetailUpdate/${invoice_detailmodel.id}`, invoice_detailmodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/InvoiceDetailDelete/${Id}`);
  }
}
