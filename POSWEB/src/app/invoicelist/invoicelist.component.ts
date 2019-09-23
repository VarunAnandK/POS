import { Component, OnInit } from "@angular/core";
import { InvoiceService } from "src/Service/invoice.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HelperModel } from "src/Model/Helper-model";
import { apphelper } from "src/Model/apphelper";
import { invoice_list } from "src/Model/invoice_list";
import { SelectItem } from "primeng/api";
import { PaymentMethodService } from 'src/Service/paymentmethod.service';
declare var Stimulsoft: any;

@Component({
  selector: "app-invoicelist",
  templateUrl: "./invoicelist.component.html",
  styleUrls: ["./invoicelist.component.css"]
})
export class InvoicelistComponent implements OnInit {
  _InvoiceList: invoice_list[];
  _PaymentMethodDropdown: SelectItem[];
  StartDate: Date;
  EndDate: Date;
  _selectedid: number;
  rsub_total_amount_total: number;
  rgst_amount_total: number;
  rdiscount_amount_total: number;
  rround_off_amount_total: number;
  rinvoice_amount_total: number;
  constructor(
    public _invoiceservice: InvoiceService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    public _paymentmethodservice: PaymentMethodService,
  ) {
    this.StartDate = new Date();
    this.EndDate = new Date();
    this.StartDate.setMonth(this.StartDate.getMonth() - 1);
  }

  ngOnInit() {
    this.filldropdown();
    this.GetAllInvoiceList();
  }

  filldropdown() {
    this._PaymentMethodDropdown = [];
    this._PaymentMethodDropdown.push({ label: "All", value: 0 });
    this._paymentmethodservice.GetAll().subscribe((res) => {
      res.forEach(element => {
        this._PaymentMethodDropdown.push({ label: element.name, value: element.id });
      });
      //this._BusinessForm.patchValue(this._BusinessData);
    }, (error) => {
    }, () => {
    });
    //this._PaymentMethodDropdown.push({ label: "Credits", value: 2 });
  }

  GetAllInvoiceList() {
    debugger;
    let startdate = apphelper.FormatData(this.StartDate);
    let enddate = apphelper.FormatData(this.EndDate);
    this._spinner.show();
    this._invoiceservice
      .GetAllInvoiceList(startdate, enddate, this._selectedid)
      .subscribe(
        res => {
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
              parseFloat(u.round_off_amount.toString()),
            0
          );
          this.rinvoice_amount_total = this._InvoiceList.reduce(
            (ya, u) =>
              parseFloat(ya.toString()) +
              parseFloat(u.invoice_amount.toString()),
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

  Submit() {
    this.GetAllInvoiceList();
  }

  InvoiceListPrint() {
    let startdate = apphelper.FormatData(this.StartDate);
    let enddate = apphelper.FormatData(this.EndDate);
    this._spinner.show();
    this._invoiceservice
      .GetAllInvoiceListPrint(startdate, enddate, this._selectedid)
      .subscribe(res => {
        Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
        var report = new Stimulsoft.Report.StiReport();
        var dataset = new Stimulsoft.System.Data.DataSet("NewInvoiceList");
        dataset.readJson(res);
        report.loadFile("Reports/NewInvoiceList.mrt");
        report.regData(dataset.dataSetName, "", dataset);
        report.renderAsync(function() {
          var data = report.exportDocument(
            Stimulsoft.Report.StiExportFormat.Pdf
          );
          (<any>Object).saveAs(data, "NewInvoiceList.pdf", "application/pdf");
        });
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

  Print() {
    this.InvoiceListPrint();
    this._spinner.hide();
  }

  Edit(id: number)
  {
    if (this._helper.GetCookiesValue("is_gst_enable") === '1')
    {
      this.InvoicePrint(id);
    }
    else
    {
      this.InvoiceWithoutGSTPrint(id);
    }
    this._spinner.hide();
  }
}
