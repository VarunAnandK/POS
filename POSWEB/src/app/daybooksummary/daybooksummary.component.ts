import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { HelperModel } from "src/Model/Helper-model";
import { Router } from "@angular/router";
import { day_book_summary } from "src/Model/day_book_summary";
import { SalesService } from "src/Service/sales.service";
import { apphelper } from "src/Model/apphelper";
declare var Stimulsoft: any;

@Component({
  selector: "app-daybooksummary",
  templateUrl: "./daybooksummary.component.html",
  styleUrls: ["./daybooksummary.component.css"]
})
export class DaybooksummaryComponent implements OnInit {
  _DayBookSummaryList: day_book_summary[];
  StartDate: Date;
  EndDate: Date;
  rtotal_cash_sales: number;
  rtotal_card_sales: number;
  rtotal_credit_sales: number;
  rtotal_sales: number;

  constructor(
    public _salesservice: SalesService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    private _router: Router
  ) {
    this.StartDate = new Date();
    this.EndDate = new Date();
    this.StartDate.setMonth(this.StartDate.getMonth() - 1);
  }

  ngOnInit() {
    this.GetAllDayBookSummaryList();
  }

  GetAllDayBookSummaryList() {
    let startdate = apphelper.FormatData(this.StartDate);
    let enddate = apphelper.FormatData(this.EndDate);
    this._spinner.show();
    this._salesservice.DayBookSummary(startdate, enddate).subscribe(
      res => {
        this._DayBookSummaryList = res;
        this.rtotal_cash_sales = this._DayBookSummaryList.reduce(
          (ya, u) =>
            parseFloat(ya.toString()) +
            parseFloat(u.total_cash_sales.toString()),
          0
        );
        this.rtotal_card_sales = this._DayBookSummaryList.reduce(
          (ya, u) =>
            parseFloat(ya.toString()) +
            parseFloat(u.total_card_sales.toString()),
          0
        );
        this.rtotal_credit_sales = this._DayBookSummaryList.reduce(
          (ya, u) =>
            parseFloat(ya.toString()) +
            parseFloat(u.total_credit_sales.toString()),
          0
        );
        this.rtotal_sales = this._DayBookSummaryList.reduce(
          (ya, u) =>
            parseFloat(ya.toString()) +
            parseFloat(u.total_sales.toString()),
          0
        );
      },
      error => {
        this._spinner.hide();
      },
      () => {
        this._spinner.hide();
      }
    );
  }

  DayClosePrint(Id: number) {
    this._salesservice.DayClosePrint(Id).subscribe(res => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("Day Close");
      dataset.readJson(res);
      report.loadFile("Reports/DayClosePrint.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function() {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(data, "DayClosePrint.pdf", "application/pdf");
      });
    });
  }

  Print(Id: number = 0) {
    this.DayClosePrint(Id);
  }

  Submit() {
    this.GetAllDayBookSummaryList();
  }
}
