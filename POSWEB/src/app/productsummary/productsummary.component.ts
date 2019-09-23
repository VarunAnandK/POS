import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperModel } from 'src/Model/Helper-model';
import { product_summary } from 'src/Model/product_summary';
import { ProductService } from 'src/Service/product.service';
import {Router} from '@angular/router';
import { apphelper } from 'src/Model/apphelper';
declare var Stimulsoft: any;

@Component({
  selector: 'app-productsummary',
  templateUrl: './productsummary.component.html',
  styleUrls: ['./productsummary.component.css']
})
export class ProductsummaryComponent implements OnInit {
  _ProductSummaryList: product_summary[];
  StartDate: Date;
  EndDate: Date;
  rtotal: number;
  constructor(
    public _productservice: ProductService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    private _router: Router,
  ) {
    this.StartDate = new Date();
    this.EndDate = new Date();
    this.StartDate.setMonth( this.StartDate.getMonth() - 1);
  }

  ngOnInit() {
    this.GetAllProductSummaryList();
  }

  GetAllProductSummaryList() {
    let startdate = apphelper.FormatData(this.StartDate);
    let enddate = apphelper.FormatData(this.EndDate);

    this._spinner.show();
    this._productservice.ProductSummary(startdate, enddate).subscribe((res) => {
      this._ProductSummaryList = res;
      this.rtotal =  this._ProductSummaryList.reduce((ya, u) => parseFloat(ya.toString()) + parseFloat(u.actual_amount.toString()),0);
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }

  Submit()
  {
    this.GetAllProductSummaryList();
  }

  ProductDetailSummaryPrint(Id: number) {
    let startdate = apphelper.FormatData(this.StartDate);
    let enddate = apphelper.FormatData(this.EndDate);
    this._productservice.ProductDetailSummary(Id,startdate,enddate).subscribe((res) => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("Product Detail Summary");
      dataset.readJson(res);
      report.loadFile("Reports/ProductDetailSummary.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function () {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(data, "ProductDetailSummary.pdf", "application/pdf");
      });
    });
  }

  Edit(Id: number = 0) {
    let startdate = apphelper.FormatData(this.StartDate);
    let enddate = apphelper.FormatData(this.EndDate);
    this._router.navigate([`${/ProductDetailSummary/}${Id}/${startdate}/${enddate}`]);
  }

  Print(Id: number = 0)
  {
    this.ProductDetailSummaryPrint(Id);
  }
}
