import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperModel } from 'src/Model/Helper-model';
import { business_summary } from 'src/Model/business_summary';
import { BusinessService } from 'src/Service/business.service';
import {Router} from '@angular/router';
import { apphelper } from 'src/Model/apphelper';
declare var Stimulsoft: any;

@Component({
  selector: 'app-businesssummary',
  templateUrl: './businesssummary.component.html',
  styleUrls: ['./businesssummary.component.css']
})
export class BusinesssummaryComponent implements OnInit {
  _BusinessSummaryList: business_summary[];
  StartDate : Date;
  EndDate : Date;
  rtotal: number;

  constructor(
    public _businessservice: BusinessService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    private _router : Router,
  ) {
    this.StartDate = new Date();
    this.EndDate = new Date();
    this.StartDate.setMonth( this.StartDate.getMonth() - 1);
  }

  ngOnInit() {
    this.GetAllBusinessSummaryList();
  }

  GetAllBusinessSummaryList() {
    let startdate = apphelper.FormatData(this.StartDate);
    let enddate = apphelper.FormatData(this.EndDate);
    this._spinner.show();
    this._businessservice.BusinessSummary(startdate,enddate).subscribe((res) => {
      this._BusinessSummaryList = res;
      this.rtotal =  this._BusinessSummaryList.reduce((ya, u) => parseFloat(ya.toString()) + parseFloat(u.amount.toString()),0);
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }

  Submit()
  {
    this.GetAllBusinessSummaryList();
  }

  BusinessDetailSummaryPrint(Id: number) {
    let startdate = apphelper.FormatData(this.StartDate);
    let enddate = apphelper.FormatData(this.EndDate);
    this._businessservice.BusinessDetailSummary(Id,startdate,enddate).subscribe((res) => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("Business Detail Summary");
      dataset.readJson(res);
      report.loadFile("Reports/BusinessDetailSummary.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function () {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(data, "BusinessDetailSummary.pdf", "application/pdf");
      });
    });
  }

  Edit(Id: number = 0) {
    let startdate = apphelper.FormatData(this.StartDate);
    let enddate = apphelper.FormatData(this.EndDate);
    this._router.navigate([`${/BusinessDetailSummary/}${Id}/${startdate}/${enddate}`]);
  }

  Print(Id: number = 0)
  {
    this.BusinessDetailSummaryPrint(Id);
  }

}
