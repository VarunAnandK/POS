import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperModel } from 'src/Model/Helper-model';
import { DynamicDialogRef } from 'primeng/api';
import { invoice } from 'src/Model/invoice';
import { InvoiceService } from 'src/Service/invoice.service';
declare var Stimulsoft: any;

@Component({
  selector: 'app-partialinvoice',
  templateUrl: './partialinvoice.component.html',
  styleUrls: ['./partialinvoice.component.css']
})
export class PartialinvoiceComponent implements OnInit {
  _InvoiceList: invoice[];
  rsub_total_amount_total: number;
  rgst_amount_total: number;
  rdiscount_amount_total: number;
  rround_off_amount_total: number;
  rinvoice_amount_total: number;
  rbalance_amount_total: number;

  constructor(
    public _invoiceservice: InvoiceService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    public _ref: DynamicDialogRef,
  ) {
  }

  ngOnInit() {
    this.GetAllInvoiceList();
  }

  GetAllInvoiceList() {
    this._spinner.show();
    this._invoiceservice.GetAllInvoiceListBySalesId(parseInt(this._helper.GetCookiesValue("sales_id"))).subscribe((res) => {
      this._InvoiceList = res;
      this.rsub_total_amount_total = this._InvoiceList.reduce(
        (ya, u) =>
          parseFloat(ya.toString()) + parseFloat(u.sub_total.toString()),
        0
      );
      this.rgst_amount_total = this._InvoiceList.reduce(
        (ya, u) =>
          parseFloat(ya.toString()) + parseFloat(u.gst_amount.toString()),
        0
      );
      this.rdiscount_amount_total = this._InvoiceList.reduce(
        (ya, u) =>
          parseFloat(ya.toString()) +
          parseFloat(u.discount_amount.toString()),
        0
      );
      this.rround_off_amount_total = this._InvoiceList.reduce(
        (ya, u) =>
          parseFloat(ya.toString()) +
          parseFloat(u.round_off.toString()),
        0
      );
      this.rinvoice_amount_total = this._InvoiceList.reduce(
        (ya, u) =>
          parseFloat(ya.toString()) +
          parseFloat(u.invoice_amount.toString()),
        0
      );
      this.rbalance_amount_total = this._InvoiceList.reduce(
        (ya, u) =>
          parseFloat(ya.toString()) +
          parseFloat(u.balance_amount.toString()),
        0
      );
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }

  InvoicePrint(Id: number) {
    this._spinner.show();
    this._invoiceservice.InvoicePrint(Id).subscribe((res) => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("Invoice");
      dataset.readJson(res);
      report.loadFile("Reports/Invoice.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function () {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(data, "Invoice.pdf", "application/pdf");
      });
    });
  }

  InvoiceWithoutGSTPrint(Id: number) {
    this._spinner.show();
    this._invoiceservice.InvoicePrint(Id).subscribe((res) => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("InvoiceWithoutGST");
      dataset.readJson(res);
      report.loadFile("Reports/InvoiceWithoutGST.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function () {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(data, "InvoiceWithoutGST.pdf", "application/pdf");
      });
    });
  }

  Edit(id: number) {
    if (this._helper.GetCookiesValue("is_gst_enable") === '1')
    {
      this.InvoicePrint(id);
    }
    else
    {
      this.InvoiceWithoutGSTPrint(id);
    }
    //this.InvoicePrint(id);
    this._spinner.hide();
  }

}
