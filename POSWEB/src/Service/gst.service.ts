import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gst } from '../Model/gst';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class GSTService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<gst[]>(`${this.helpermodel.ApiURL}/GSTList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<gst>(`${this.helpermodel.ApiURL}/GSTById/${Id}`);
  }
  public Insert(gstmodel: gst) {
    gstmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/GSTInsert`, gstmodel);
  }
  public Update(gstmodel: gst) {
    gstmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/GSTUpdate/${gstmodel.id}`, gstmodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/GSTDelete/${Id}`);
  }
}
