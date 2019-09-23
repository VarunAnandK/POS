import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gst_detail } from '../Model/gst_detail';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class GSTDetailService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<gst_detail[]>(`${this.helpermodel.ApiURL}/GSTDetailList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<gst_detail>(`${this.helpermodel.ApiURL}/GSTDetailById/${Id}`);
  }
  public Insert(gstdetailmodel: gst_detail) {
    gstdetailmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/GSTDetailInsert`, gstdetailmodel);
  }
  public Update(gstdetailmodel: gst_detail) {
    gstdetailmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/GSTDetailUpdate/${gstdetailmodel.id}`, gstdetailmodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/GSTDetailDelete/${Id}`);
  }
  public GetByGstId(Id: number) {
    return this.httpClient.get<gst_detail[]>(`${this.helpermodel.ApiURL}/GSTDetailByGSTId/${Id}`);
  }
}
