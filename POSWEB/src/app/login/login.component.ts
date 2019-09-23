import { Component, OnInit } from '@angular/core';
import { HelperModel } from 'src/Model/Helper-model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/Service/user.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/Model/user';
import { CompanyService } from 'src/Service/company.service';
import { company } from 'src/Model/company';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _InsertUser: user;
  constructor(private _helper: HelperModel,
    private _toastr: ToastrService,
    private _router: Router,
    private _SpinnerService: NgxSpinnerService,
    private _userservice: UserService,
    public _companyservice: CompanyService
    ) {
    this._helper.NavBar = false;
    this._helper.LeftMenu = false;
    this._InsertUser = new user();

  }

  ngOnInit() {
    // let currentuser = this._helper.GetCookiesValue(this._helper.CookiesUser);
    // if (currentuser.length > 0) {
    //   debugger
    //   this._helper.CurrentUser = JSON.parse(currentuser);
    //   this._helper.NavBar = true;
    //   this._helper.LeftMenu = true;
    //   this._router.navigate(['/Dashboard']);
    // }
    this._helper.DeletAllCookiesValue();
  }

  ValidateLogin() {
    this._SpinnerService.show();
    this._userservice.ValidateUser(this._InsertUser).subscribe((res: ApiReposeModel) => {
      if (res.AdditionalData.length > 0) {
        var json_str = JSON.stringify(res.AdditionalData[0]);
        this._helper.SetCookiesValue(this._helper.CookiesUser, json_str);
        this._helper.CurrentUser = JSON.parse(json_str);
      }
      this._SpinnerService.hide();
      if (res.Type == "S") {
        this._toastr.success(res.Message, "Login");
        this._helper.NavBar = true;
        this._helper.LeftMenu = true;
        this._companyservice.GetById(1).subscribe((res) => {
          if (res) {
            this._helper.SetCookiesValue("is_credits_enable", res.is_credits_enable);
            this._helper.SetCookiesValue("is_gst_enable", res.is_gst_enable);
          }
          this._SpinnerService.hide();
        },
          (error) => {
            this._SpinnerService.hide();
          });
        this._router.navigate(['/Dashboard']);
      }
      else {
        this._toastr.error(res.Message, "Login");
        this._helper.DeletCookiesValue(this._helper.CookiesUser);
      }
      //this.router.navigate(['Dashboard']);
    },
      (error) => {
        this._SpinnerService.hide();
        this._helper.DeletCookiesValue(this._helper.CookiesUser);
      }
    );
  }

}
