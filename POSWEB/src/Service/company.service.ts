import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { company } from '../Model/company';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetSearchAndList(take: number = 1, skip: number = 0, global_filter: string = "") {
    if (global_filter == null) {
      global_filter = "";
    }
    return this.httpClient.get<any[]>(`${this.helpermodel.ApiURL}/CompanySearchAndList/${take}/${skip}/${global_filter}`);
  }
  public GetAll() {
    return this.httpClient.get<company[]>(`${this.helpermodel.ApiURL}/CompanyList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<company>(`${this.helpermodel.ApiURL}/CompanyById/${Id}`);
  }
  public Insert(companymodel: company) {
    companymodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/CompanyInsert`, companymodel);
  }
  public Update(companymodel: company) {
    companymodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/CompanyUpdate/${companymodel.id}`, companymodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/CompanyDelete/${Id}`);
  }

  
}
