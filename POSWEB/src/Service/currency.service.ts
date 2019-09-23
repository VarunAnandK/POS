import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { currency } from '../Model/currency';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<currency[]>(`${this.helpermodel.ApiURL}/CurrencyList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<currency>(`${this.helpermodel.ApiURL}/CurrencyById/${Id}`);
  }
  public Insert(currencymodel: currency) {
    currencymodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/CurrencyInsert`, currencymodel);
  }
  public Update(currencymodel: currency) {
    currencymodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/CurrencyUpdate/${currencymodel.id}`, currencymodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/CurrencyDelete/${Id}`);
  }
}
