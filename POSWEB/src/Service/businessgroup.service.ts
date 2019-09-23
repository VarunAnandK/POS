import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { business_group } from '../Model/business_group';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class BusinessGroupService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<business_group[]>(`${this.helpermodel.ApiURL}/BusinessGroupList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<business_group>(`${this.helpermodel.ApiURL}/BusinessGroupById/${Id}`);
  }
  public Insert(business_group: business_group) {
    business_group.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/BusinessGroupInsert`, business_group);
  }
  public Update(business_group: business_group) {
    business_group.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/BusinessGroupUpdate/${business_group.id}`, business_group);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/BusinessGroupDelete/${Id}`);
  }
}
