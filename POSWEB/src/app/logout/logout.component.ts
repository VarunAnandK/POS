import { Component, OnInit } from '@angular/core';
import { HelperModel } from 'src/Model/Helper-model';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _helper : HelperModel,private _router : Router) { }

  ngOnInit() {
    this._helper.DeletAllCookiesValue();
    this._helper.NavBar = false;
    this._helper.LeftMenu = false;
    this._router.navigate(["Login"]);
  }

}
