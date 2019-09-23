import { Component, OnInit, Inject } from '@angular/core';
import { HelperModel } from 'src/Model/Helper-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _helper: HelperModel) {

  }

  ngOnInit() {
    this._helper.NavBar = true;
    this._helper.LeftMenu = true;
  }

}
