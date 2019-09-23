import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { state } from '../Model/state';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<state[]>(`${this.helpermodel.ApiURL}/StateList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<state>(`${this.helpermodel.ApiURL}/StateById/${Id}`);
  }
  public Insert(statemodel: state) {
    statemodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/StateInsert`, statemodel);
  }
  public Update(statemodel: state) {
    statemodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/StateUpdate/${statemodel.id}`, statemodel);
  }
  public Delete(Id: number) {
    return this.httpClient.get(`${this.helpermodel.ApiURL}/StateDelete/${Id}`);
  }
}
