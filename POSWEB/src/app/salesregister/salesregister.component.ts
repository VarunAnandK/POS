import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { HelperModel } from "src/Model/Helper-model";
import { Router } from "@angular/router";
import { sales_register_summary } from "src/Model/sales_register_summary";
import { SalesService } from "src/Service/sales.service";
import { apphelper } from "src/Model/apphelper";
import { SelectItem } from "primeng/api";
declare var Stimulsoft: any;

@Component({
  selector: "app-salesregister",
  templateUrl: "./salesregister.component.html",
  styleUrls: ["./salesregister.component.css"]
})
export class SalesregisterComponent implements OnInit {
  _SalesRegisterList: sales_register_summary[];
  StartDate: Date;
  rtotal: number;
  _yeardropdown: SelectItem[];
  _startingyear: number = 2001;
  _selectedyear: number;
  constructor(
    public _salesservice: SalesService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    private _router: Router
  ) {
    this.StartDate = new Date();
  }

  ngOnInit() {
    this.YearGenerate();
    this.GetAllSalesRegisterList();
  }

  GetAllSalesRegisterList() {
    this._spinner.show();
    this._salesservice
      .SalesRegister(
        this._selectedyear,
      )
      .subscribe(
        res => {
          this._SalesRegisterList = res;
          this.rtotal = this._SalesRegisterList.reduce(
            (ya, u) =>
              parseFloat(ya.toString()) + parseFloat(u.sales_amount.toString()),
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

  YearGenerate()
  {
    this._yeardropdown = [];
    for(let i = this._startingyear; i <= 2100; i++)
    {
      this._yeardropdown.push({ label: i.toString(), value: i });
    }
  }

  Submit() {
    this.GetAllSalesRegisterList();
  }

  SalesRegisterDetailPrint(month: number) {
    this._salesservice.SalesRegisterDetail(month).subscribe(res => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("Sales Register Detail");
      dataset.readJson(res);
      report.loadFile("Reports/SalesRegisterDetail.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function() {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(
          data,
          "SalesRegisterDetail.pdf",
          "application/pdf"
        );
      });
    });
  }

  Edit(Id: number = 0) {
    this._router.navigate([`${/SalesRegisterDetail/}${Id}`]);
  }

  Print(month: number = 0) {
    this.SalesRegisterDetailPrint(month);
  }
}
