import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperModel } from 'src/Model/Helper-model';
import {Router, ActivatedRoute} from '@angular/router';
import { sales_register_detail_summary } from 'src/Model/sales_register_detail_summary';
import { SalesService } from 'src/Service/sales.service';
declare var Stimulsoft: any;

@Component({
  selector: 'app-salesregisterdetail',
  templateUrl: './salesregisterdetail.component.html',
  styleUrls: ['./salesregisterdetail.component.css']
})
export class SalesregisterdetailComponent implements OnInit {
  _SalesRegisterDetailList: sales_register_detail_summary[];
  rtotal: number;
  _month: number;
  routeParams : any;
  constructor(
    public _salesservice: SalesService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.routeParams = this._activeRoute.snapshot.params;
    this.GetAllSalesRegisterDetailList(this.routeParams.Id);
  }

  GetAllSalesRegisterDetailList(Id: number = 0) {
    this._spinner.show();
    this._salesservice.SalesRegisterDetail(Id).subscribe((res) => {
      this._SalesRegisterDetailList = res;
      this.rtotal =  this._SalesRegisterDetailList.reduce((ya, u) => parseFloat(ya.toString()) + parseFloat(u.invoice_amount.toString()),0);
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }

  SalesRegisterDetailPrint(month: number) {
    this._salesservice.SalesRegisterDetail(month).subscribe((res) => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("Sales Register Detail");
      dataset.readJson(res);
      report.loadFile("Reports/SalesRegisterDetail.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function () {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(data, "SalesRegisterDetail.pdf", "application/pdf");
      });
    });
  }

  Print() {
    this.SalesRegisterDetailPrint(this.routeParams.Id);
  }

  Back() {
    this._router.navigate([`${/SalesRegister/}`]);
  }
}
