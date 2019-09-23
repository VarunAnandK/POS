import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperModel } from 'src/Model/Helper-model';
import { InvoiceService } from 'src/Service/invoice.service';
import { invoice } from 'src/Model/invoice';
declare var Stimulsoft: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  _InvoiceList: invoice[];
  _TableFields: any[];

  constructor(
    public _invoiceservice: InvoiceService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
  ) {
    //this._InvoiceList = new Array<Ordermodel>();
  }

  ngOnInit() {
    this.GetAllInvoiceList();
  }

  GetAllInvoiceList() {
    debugger
    this._spinner.show();
    this._invoiceservice.GetAllInvoiceListBySalesId(parseInt(this._helper.GetCookiesValue("sales_id"))).subscribe((res) => {
      this._InvoiceList = res;
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

  Edit(id: number) {
    this.InvoicePrint(id);
    this._spinner.hide();
  }

}
