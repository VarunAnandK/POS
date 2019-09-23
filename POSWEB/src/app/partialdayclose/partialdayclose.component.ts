import { Component, OnInit } from '@angular/core';
import { sales } from 'src/Model/sales';
import { FormGroup } from '@angular/forms';
import { SalesService } from 'src/Service/sales.service';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/api';
import { HelperModel } from 'src/Model/Helper-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from 'src/Service/order.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { PartialopeningcashComponent } from '../partialopeningcash/partialopeningcash.component';
declare var Stimulsoft: any;
@Component({
  selector: 'app-partialdayclose',
  templateUrl: './partialdayclose.component.html',
  styleUrls: ['./partialdayclose.component.css']
})
export class PartialdaycloseComponent implements OnInit {
  options: any;
  designer: any;
  // _SalesData: sales;
  _SalesData: sales[];
  _SalesForm: FormGroup;
  _IsOpeningCashZero: boolean = false;
  constructor(
    public _salesservice: SalesService,
    public _helper: HelperModel,
    public _config: DynamicDialogConfig,
    private _spinner: NgxSpinnerService,
    private _orderservice: OrderService,
    private _toastrservice: ToastrService,
    public _ref: DynamicDialogRef,
    private _dialogservice: DialogService,
  ) {
    //this._SalesData = this._config.data;
    this._SalesData = new Array<sales>();
  }

  ngOnInit() {
    this.GetSalesList();
  }

  GetSalesList()
  {
    debugger
    this._salesservice.GetAll().subscribe((res) => {
      this._SalesData = res.filter(o => o.id == parseInt(this._helper.GetCookiesValue("sales_id")));
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }

  SaveDayClose() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Day Close ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        debugger
        this._spinner.show();
        this._orderservice.GetAllOrdersBySalesID(parseInt(this._helper.GetCookiesValue("sales_id"))).subscribe((res) => {
          if (res > 0) {
            this._toastrservice.error("Already some Pending Orders are there, so you first complete the Payment for those Pending Orders", "Order");

          }
          else {
            this._salesservice.SalesCompleteUpdate(parseInt(this._helper.GetCookiesValue("sales_id"))).subscribe((res: ApiReposeModel) => {

            }, (error) => {
              this._spinner.hide();

            }, () => {
              this.DayClosePrint(parseInt(this._helper.GetCookiesValue("sales_id")));
              this._spinner.hide();
              this._ref.close(true);
            });
          }
        }, (error) => {
          this._spinner.hide();
        }, () => {
          this._spinner.hide();
        });
      }
    });
  }
  PrintDayClose() {
    this._salesservice.SalesDayClosePrint(parseInt(this._helper.GetCookiesValue("sales_id"))).subscribe((res) => {
      debugger
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("DayClose");
      dataset.readJson(res);
      report.loadFile("Reports/DayClose.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.dictionary.synchronize();
      report.render();
      var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
      (<any>Object).saveAs(data, "DayClose.pdf", "application/pdf");
    });
  }

  DayClosePrint(Id: number) {
    this._salesservice.DayClosePrint(Id).subscribe((res) => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("Day Close");
      dataset.readJson(res);
      report.loadFile("Reports/DayClosePrint.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function () {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(data, "DayClosePrint.pdf", "application/pdf");
      });
    });
  }

  PartialOpeningCash() {
    const ref = this._dialogservice.open(PartialopeningcashComponent, {
      header: 'Opening Cash',
      width: '40%',
      contentStyle: { "overflow": "scroll", "overflow-y": "auto" },
      data: this._SalesData[0].opening_cash,
    });
    ref.onClose.subscribe((res) => {
      if (res["status"]) {
        this.OpeningCashUpdate(res["OpeningCash"])
      }
    });
  }

  OpeningCashUpdate(OepningCashAmount: number)
  {
    this._spinner.show();
    this._salesservice.SalesOpeningCashUpdate(parseInt(this._helper.GetCookiesValue("sales_id")), OepningCashAmount).subscribe((res: ApiReposeModel) => {
      if (res.Type == "S") {
        this._toastrservice.success(res.Message, "Opening Cash");
      }
      else {
        this._toastrservice.error(res.Message, "Opening Cash");
      }
      this._spinner.hide();
    }, (error) => {
      this._spinner.hide();

    }, () => {
      this.GetSalesList();
    });
  }
}
