import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { unit_of_measurement } from '../Model/unit_of_measurement';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasurementService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<unit_of_measurement[]>(`${this.helpermodel.ApiURL}/UnitOfMeasurementList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<unit_of_measurement>(`${this.helpermodel.ApiURL}/UnitOfMeasurementById/${Id}`);
  }
  public Insert(unitofmeasurementmodel: unit_of_measurement) {
    unitofmeasurementmodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/UnitOfMeasurementInsert`, unitofmeasurementmodel);
  }
  public Update(unitofmeasurementmodel: unit_of_measurement) {
    unitofmeasurementmodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/UnitOfMeasurementUpdate/${unitofmeasurementmodel.id}`, unitofmeasurementmodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/UnitOfMeasurementDelete/${Id}`);
  }
}
