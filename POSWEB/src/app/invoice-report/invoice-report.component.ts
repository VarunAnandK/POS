import { Component, OnInit } from '@angular/core';
import { HelperModel } from 'src/Model/Helper-model';
import { ProductService } from 'src/Service/product.service';
import { InvoiceService } from 'src/Service/invoice.service';
declare var Stimulsoft: any;
@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css']
})
export class InvoiceReportComponent implements OnInit {
  options: any;
  designer: any;
  constructor(private _helper: HelperModel, private _invoiceservice: InvoiceService) { }

  ngOnInit() {
    // this._invoiceservice.InvoicePrint().subscribe((res) => {
    //   Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
    //   var report = new Stimulsoft.Report.StiReport();
    //   report.loadFile("Reports/Invoice.mrt");
    //   var dataset = new Stimulsoft.System.Data.DataSet("Invoice");
    //   dataset.readJson(res);
    //   report.regData(dataset.dataSetName,"",dataset);
    //   report.dictionary.synchronize();
    //   report.renderAsync(function () {
    //     var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
    //     (<any>Object).saveAs(data, "Report.pdf", "application/pdf");
    //   })
    // });

  }
}
