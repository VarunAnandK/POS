import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { country } from '../Model/country';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {
  }
  public GetAll() {
    return this.httpClient.get<country[]>(`${this.helpermodel.ApiURL}/CountryList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<country>(`${this.helpermodel.ApiURL}/CountryById/${Id}`);
  }
  public Insert(countrymodel: country) {
    countrymodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/CountryInsert`, countrymodel);
  }
  public Update(countrymodel: country) {
    countrymodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/CountryUpdate/${countrymodel.id}`, countrymodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/CountryDelete/${Id}`);
  }
}
