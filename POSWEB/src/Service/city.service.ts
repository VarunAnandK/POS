import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { city } from '../Model/city';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<city[]>(`${this.helpermodel.ApiURL}/CityList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<city>(`${this.helpermodel.ApiURL}/CityById/${Id}`);
  }
  public Insert(citymodel: city) {
    citymodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/CityInsert`, citymodel);
  }
  public Update(citymodel: city) {
    citymodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/CityUpdate/${citymodel.id}`, citymodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/CityDelete/${Id}`);
  }
}
