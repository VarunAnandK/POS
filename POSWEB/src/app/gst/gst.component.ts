import { Component, OnInit } from '@angular/core';
import { gst } from 'src/Model/gst';
import { GSTService } from 'src/Service/gst.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GSTComponent implements OnInit {
  _GSTList: gst[];
  _TableFields: any[];
  constructor(
    private _gstservice: GSTService,
    private _spinner: NgxSpinnerService,
    private _router : Router
  ) {
    this._GSTList = new Array<gst>();
  }

  ngOnInit() {
    this._TableFields = [
      { field: 'name', header: 'Name' },
    ];
    this.GetGSTList();
  }
  GetGSTList() {
    this._spinner.show();
    this._gstservice.GetAll().subscribe((res) => {
      this._GSTList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }

  Edit(Id: number = 0) {
    this._router.navigate([`${/GSTCreateOrUpdate/}${Id}`])
  }
}
