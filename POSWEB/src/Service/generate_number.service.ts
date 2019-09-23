import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sales } from '../Model/sales';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class GenerateNumberService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetNumber(Type: string) {
    return this.httpClient.get<number>(`${this.helpermodel.ApiURL}/GetNumber/${Type}`);
  }

}
