import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { business } from '../Model/business';
import { HelperModel } from 'src/Model/Helper-model';
import { business_summary } from 'src/Model/business_summary';
import { business_detail_summary } from 'src/Model/business_detail_summary';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetSearchAndList(take: number = 1, skip: number = 0, globalfilter: string = '') {
    if (globalfilter == null) {
      globalfilter = '';
    }
    return this.httpClient.get<any[]>(`${this.helpermodel.ApiURL}/BusinessSearchAndList/${take}/${skip}/${globalfilter}`);
  }
  public GetAll() {
    return this.httpClient.get<business[]>(`${this.helpermodel.ApiURL}/BusinessList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<business>(`${this.helpermodel.ApiURL}/BusinessById/${Id}`);
  }
  public Insert(businessmodel: business) {
    businessmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/BusinessInsert`, businessmodel);
  }
  public Update(businessmodel: business) {
    businessmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/BusinessUpdate/${businessmodel.id}`, businessmodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/BusinessDelete/${Id}`);
  }
  public BusinessSummary(StartDate : string,EndDate : string) {
    return this.httpClient.get<business_summary[]>(`${this.helpermodel.ApiURL}/BusinessSummary/${StartDate}/${EndDate}`);
  }
  public BusinessDetailSummary(business_id: number, start_date: string, end_date: string) {
    return this.httpClient.get<business_detail_summary[]>(`${this.helpermodel.ApiURL}/BusinessDetailSummary/${business_id}/${start_date}/${end_date}`);
  }
}
