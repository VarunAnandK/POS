import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { invoice } from '../Model/invoice';
import { HelperModel } from 'src/Model/Helper-model';
import { invoice_list } from 'src/Model/invoice_list';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<invoice[]>(`${this.helpermodel.ApiURL}/InvoiceList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<invoice>(`${this.helpermodel.ApiURL}/InvoiceById/${Id}`);
  }
  public Insert(invoicemodel: invoice) {
    invoicemodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/InvoiceInsert`, invoicemodel);
  }
  public Update(invoicemodel: invoice) {
    invoicemodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/InvoiceUpdate/${invoicemodel.id}`, invoicemodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/InvoiceDelete/${Id}`);
  }
  public InvoicePrint(Id: number) {
    return this.httpClient.get<any>(`${this.helpermodel.ApiURL}/InvoicePrint/${Id}`);
  }
  public GetAllInvoiceListBySalesId(SalesID: number) {
    return this.httpClient.get<invoice[]>(`${this.helpermodel.ApiURL}/GetAllInvoiceListBySalesId/${SalesID}`);
  }
  public GetAllInvoiceList(Start_Date: string, End_Date: string, Payment_Metho_Id: number) {
    return this.httpClient.get<invoice_list[]>(`${this.helpermodel.ApiURL}/GetAllInvoiceList/${Start_Date}/${End_Date}/${Payment_Metho_Id}`);
  }
  public GetAllInvoiceListPrint(Start_Date: string, End_Date: string, Payment_Metho_Id: number) {
    return this.httpClient.get<invoice_list[]>(`${this.helpermodel.ApiURL}/GetAllInvoiceListPrint/${Start_Date}/${End_Date}/${Payment_Metho_Id}`);
  }
}
