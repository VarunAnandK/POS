import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperModel } from 'src/Model/Helper-model';
import { BusinessService } from 'src/Service/business.service';
import {Router, ActivatedRoute} from '@angular/router';
import { business_detail_summary } from 'src/Model/business_detail_summary';
import { apphelper } from 'src/Model/apphelper';
declare var Stimulsoft: any;

@Component({
  selector: 'app-businessdetailsummary',
  templateUrl: './businessdetailsummary.component.html',
  styleUrls: ['./businessdetailsummary.component.css']
})
export class BusinessdetailsummaryComponent implements OnInit {
  _BusinessDetailSummaryList: business_detail_summary[];
  _BusinessID: number;
  _StartDate: Date;
  _EndDate: Date;
  rtotal: number;

  constructor(
    public _businessservice: BusinessService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    private _router : Router,
    private _activeRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    const routeParams = this._activeRoute.snapshot.params;
    this._BusinessID = routeParams.Id;
    this._StartDate = routeParams.StartDate;
    this._EndDate = routeParams.EndDate;
    this.GetAllBusinessDetailSummaryList(routeParams.Id, routeParams.StartDate, routeParams.EndDate);
  }

  GetAllBusinessDetailSummaryList(Id: number = 0, startdate: string, enddate: string) {
    this._spinner.show();
    if (Id > 0) {
      this._businessservice.BusinessDetailSummary(Id, startdate, enddate).subscribe((res) => {
        if (res) {
          this._BusinessDetailSummaryList = res;
          this.rtotal = this._BusinessDetailSummaryList.reduce(
            (ya, u) =>
              parseFloat(ya.toString()) +
              parseFloat(u.invoice_amount.toString()),
            0
          );
        }
        this._spinner.hide();
      },
        (error) => {
          this._spinner.hide();
        });
    }
    else {
      this._spinner.hide();
    }
  }

  BusinessDetailSummaryPrint(Id: number) {
    let startdate = apphelper.FormatData(this._StartDate);
    let enddate = apphelper.FormatData(this._EndDate);
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

  Print()
  {
    this.BusinessDetailSummaryPrint(this._BusinessID);
  }

  Back() {
    this._router.navigate([`${/BusinessSummary/}`]);
  }
}
