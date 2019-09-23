import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { order } from '../Model/order';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<order[]>(`${this.helpermodel.ApiURL}/OrderList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<order>(`${this.helpermodel.ApiURL}/OrderById/${Id}`);
  }
  public Insert(ordermodel: order) {
    ordermodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/OrderInsert`, ordermodel);
  }
  public Update(ordermodel: order) {
    ordermodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/OrderUpdate/${ordermodel.id}`, ordermodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/OrderDelete/${Id}`);
  }
  public OrderBusinessUpdate(Orderno: number, BusinessId: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/OrderBusinessUpdate/${Orderno}/${BusinessId}`);
  }
  public GetOrderByOrderId(no: number) {
    return this.httpClient.get<order[]>(`${this.helpermodel.ApiURL}/GetOrderByOrderNo/${no}`);
  }
  public OrderDiscountUpdate(Orderno: number, DiscountAmount: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/OrderDiscountUpdate/${Orderno}/${DiscountAmount}`);
  }
  public DeleteAll(no: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/OrderDeleteAll/${no}`);
  }
  public DeleteOrderAndPaymentAll(no: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/OrderAndPaymentDeleteAll/${no}`);
  }
  public GetHoldListAll(Orderno: number) {
    return this.httpClient.get<order[]>(`${this.helpermodel.ApiURL}/HoldOrderList/${Orderno}`);
  }
  public GetAllOrdersBySalesID(SalesID: number) {

    return this.httpClient.get<number>(`${this.helpermodel.ApiURL}/GetAllOrdersBySalesID/${SalesID}`);
  }
  public GetAllOrderGSTList(Orderno: number) {
    return this.httpClient.get<order[]>(`${this.helpermodel.ApiURL}/GetAllOrderGSTList/${Orderno}`);
  }
  public OrderToInvoice(orderno: number, salesid: number, note: string) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/OrderToInvoice/${this.helpermodel.GetUserId()}/${orderno}/${salesid}/${note}`);
  }
  public OrderRoundOffAmountUpdate(data: any) {
    return this.httpClient.post(`${this.helpermodel.ApiURL}/OrderRoundOffAmountUpdate`, data);
  }
}
