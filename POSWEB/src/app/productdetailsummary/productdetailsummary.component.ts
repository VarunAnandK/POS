import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { HelperModel } from "src/Model/Helper-model";
import { ProductService } from "src/Service/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { product_detail_summary } from "src/Model/product_detail_summary";
import { apphelper } from "src/Model/apphelper";
declare var Stimulsoft: any;

@Component({
  selector: "app-productdetailsummary",
  templateUrl: "./productdetailsummary.component.html",
  styleUrls: ["./productdetailsummary.component.css"]
})
export class ProductdetailsummaryComponent implements OnInit {
  _ProductDetailSummaryList: product_detail_summary[];
  _ProductID: number;
  _StartDate: Date;
  _EndDate: Date;
  rtotal: number;

  constructor(
    public _productservice: ProductService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeParams = this._activeRoute.snapshot.params;
    this._ProductID = routeParams.Id;
    this._StartDate = routeParams.StartDate;
    this._EndDate = routeParams.EndDate;
    this.GetAllProductDetailSummaryList(
      routeParams.Id,
      routeParams.StartDate,
      routeParams.EndDate
    );
  }

  GetAllProductDetailSummaryList(
    Id: number = 0,
    startdate: string,
    enddate: string
  ) {
    this._spinner.show();
    if (Id > 0) {
      this._productservice
        .ProductDetailSummary(Id, startdate, enddate)
        .subscribe(
          res => {
            if (res) {
              this._ProductDetailSummaryList = res;
              this.rtotal = this._ProductDetailSummaryList.reduce(
                (ya, u) =>
                  parseFloat(ya.toString()) +
                  parseFloat(u.product_amount.toString()),
                0
              );
            }
            this._spinner.hide();
          },
          error => {
            this._spinner.hide();
          }
        );
    } else {
      this._spinner.hide();
    }
  }

  ProductDetailSummaryPrint(Id: number) {
    let startdate = apphelper.FormatData(this._StartDate);
    let enddate = apphelper.FormatData(this._EndDate);
    this._productservice
      .ProductDetailSummary(Id, startdate, enddate)
      .subscribe(res => {
        Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
        var report = new Stimulsoft.Report.StiReport();
        var dataset = new Stimulsoft.System.Data.DataSet(
          "Product Detail Summary"
        );
        dataset.readJson(res);
        report.loadFile("Reports/ProductDetailSummary.mrt");
        report.regData(dataset.dataSetName, "", dataset);
        report.renderAsync(function() {
          var data = report.exportDocument(
            Stimulsoft.Report.StiExportFormat.Pdf
          );
          (<any>Object).saveAs(
            data,
            "ProductDetailSummary.pdf",
            "application/pdf"
          );
        });
      });
  }

  Print() {
    this.ProductDetailSummaryPrint(this._ProductID);
  }

  Back() {
    this._router.navigate([`${/ProductSummary/}`]);
  }
}
