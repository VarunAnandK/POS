import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../Model/user';
import { HelperModel } from 'src/Model/Helper-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private helpermodel: HelperModel) {

  }
  public GetAll() {
    return this.httpClient.get<user[]>(`${this.helpermodel.ApiURL}/UserList`);
  }
  public GetById(Id: number) {
    return this.httpClient.get<user>(`${this.helpermodel.ApiURL}/UserById/${Id}`);
  }
  public Insert(usermodel: user) {
    usermodel.created_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/UserInsert`, usermodel);
  }
  public Update(usermodel: user) {
    usermodel.updated_by_id = this.helpermodel.GetUserId();
    return this.httpClient.post(`${this.helpermodel.ApiURL}/UserUpdate/${usermodel.id}`, usermodel);
  }
  public Delete(Id: number) {

    return this.httpClient.get(`${this.helpermodel.ApiURL}/UserDelete/${Id}`);
  }
  public ValidateUser(usermodel: user) {
    return this.httpClient.post(`${this.helpermodel.ApiURL}/ValidateUser`, usermodel);
  }

}
