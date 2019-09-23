import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sales } from '../Model/sales';
import { HelperModel } from 'src/Model/Helper-model';
import { day_book_summary } from 'src/Model/day_book_summary';
import { sales_register_summary } from 'src/Model/sales_register_summary';
import { sales_register_detail_summary } from 'src/Model/sales_register_detail_summary';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<sales[]>(`${this.helpermodel.ApiURL}/SalesList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<sales>(`${this.helpermodel.ApiURL}/SalesById/${Id}`);
  }
  public Insert(salesmodel: sales) {
    salesmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/SalesInsert`, salesmodel);
  }
  public Update(salesmodel: sales) {
    salesmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/SalesUpdate/${salesmodel.id}`, salesmodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/SalesDelete/${Id}`);
  }
  public GetSalesByDate(Date: string) {
    return this.httpClient.get<any>(`${this.helpermodel.ApiURL}/SalesByDate/${Date}`);
  }
  public SalesCompleteUpdate(SalesID: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/SalesCompleteUpdate/${SalesID}`);
  }
  public SalesDayClosePrint(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/SalesDayCloseReport/${Id}`);
  }
  public SalesAmountUpdate(SalesID: number, CashAmount: number, CardAmount: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/SalesAmountUpdate/${SalesID}/${CashAmount}/${CardAmount}`);
  }
  public SalesOpeningCashUpdate(SalesID: number, OpeningCash: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/SalesOpeningCashUpdate/${SalesID}/${OpeningCash}`);
  }
  public DayClosePrint(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/DayClosePrint/${Id}`);
  }
  public DayBookSummary(StartDate : string,EndDate : string) {
    return this.httpClient.get<day_book_summary[]>(`${this.helpermodel.ApiURL}/DayBookSummary/${StartDate}/${EndDate}`);
  }
  public SalesRegister(year: number) {
    return this.httpClient.get<sales_register_summary[]>(`${this.helpermodel.ApiURL}/SalesRegister/${year}`);
  }
  public SalesRegisterDetail(month: number) {
    return this.httpClient.get<sales_register_detail_summary[]>(`${this.helpermodel.ApiURL}/SalesRegisterDetail/${month}`);
  }
}
