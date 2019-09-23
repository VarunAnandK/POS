import { Component, OnInit } from "@angular/core";
import { SelectItem, DynamicDialogConfig, DynamicDialogRef } from "primeng/api";
import { PaymentMethodService } from "src/Service/paymentmethod.service";
import { OrderFooterData } from "../pos-dashoard/pos-dashoard.component";
import { ToastrService } from "ngx-toastr";
import { order_payment } from "src/Model/order_payment";
import { NgxSpinnerService } from "ngx-spinner";
import { OrderPaymentService } from "src/Service/orderpayment.service";
import { ApiReposeModel } from "src/Model/ApiResponse-model";
import { apphelper } from "src/Model/apphelper";
import { HelperModel } from "src/Model/Helper-model";
import { invoice_detail } from "src/Model/invoice_detail";
import { invoice } from "src/Model/invoice";
import { InvoiceDetailService } from "src/Service/invoicedetail.service";
import { InvoiceService } from "src/Service/invoice.service";
import { OrderService } from "src/Service/order.service";
import { payment_received } from "src/Model/payment_received";
import { payment_received_detail } from "src/Model/payment_received_detail";
import { PaymentReceivedService } from "src/Service/paymentreceived.service";
import { PaymentReceivedDetailService } from "src/Service/paymentreceiveddetail.service";
import { GenerateNumberService } from "src/Service/generate_number.service";
import { SalesService } from "src/Service/sales.service";
import Swal from "sweetalert2";
import { elementStyleProp } from "@angular/core/src/render3";
import { FormGroup, FormControl, Validators } from "@angular/forms";
declare var Stimulsoft: any;
@Component({
  selector: "app-partialcash",
  templateUrl: "./partialcash.component.html",
  styleUrls: ["./partialcash.component.css"]
})
export class PartialcashComponent implements OnInit {
  options: any;
  designer: any;
  _paymentmethoddropdown: SelectItem[];
  _FooterOrderdata: OrderFooterData[];
  _OrderPaymentList: order_payment[];
  _OrderPaymentListForSales: order_payment[];
  _PartialCashForm: FormGroup;
  _TableFields: any[];
  _OrderPaymentData: order_payment;
  _payment_method_id: number = 0;
  _lable_no_of_total_items: string;
  _lable_total_payable: string;
  _lable_balance_amount: string;
  _lable_total_Paid: string;
  _total_payable: number = 0;
  _total_Paid: number = 0;
  _total_balance: number = 0;
  _total_amount: number = 0;
  _Items: number = 0;
  _note: string;
  _noteCredit: string;
  _amount: number = 0;
  _invoiceId: number = 0;
  _IsBalanceZero: boolean = false;
  _order_no: number = parseInt(this._helper.GetCookiesValue("Order"));
  _invoicemodel: invoice;
  _invoice_detail_List: invoice_detail[];
  _Addinvoice_detail: invoice_detail;
  _payment_receivedmodel: payment_received;
  _payment_received_detail_List: payment_received_detail[];
  _Addpaymentreceived_detail: payment_received_detail;
  _IsNoteRequired: boolean = false;
  constructor(
    private _paymentmethodservice: PaymentMethodService,
    public _config: DynamicDialogConfig,
    private _toastrservice: ToastrService,
    private _orderpaymentservice: OrderPaymentService,
    private _spinner: NgxSpinnerService,
    public _ref: DynamicDialogRef,
    public _helper: HelperModel,
    public _orderservice: OrderService,
    public _invoiceservice: InvoiceService,
    public _invoicedetailservice: InvoiceDetailService,
    public _paymentreceivedservice: PaymentReceivedService,
    public _paymentreceiveddetailservice: PaymentReceivedDetailService,
    private _generatenumberservice: GenerateNumberService,
    public _salesservice: SalesService
  ) {
    this._FooterOrderdata = this._config.data;
    this._OrderPaymentData = new order_payment();
    this._invoicemodel = new invoice();
    this._invoice_detail_List = new Array<invoice_detail>();
    this._payment_receivedmodel = new payment_received();
    this._payment_received_detail_List = new Array<payment_received_detail>();
    this._OrderPaymentListForSales = new Array<order_payment>();
  }

  ngOnInit() {
    this.GetOrderPaymentList();
    this._lable_no_of_total_items = "Total Items : ";
    this._lable_total_payable = "Total Payable : ";
    this._lable_total_Paid = "Total Paid : ";
    this._lable_balance_amount = "Balance : ";
    this._Items = this._FooterOrderdata[0].Items;
    this._total_payable = this._FooterOrderdata[0].TotalPayable;
    this._total_Paid = this._FooterOrderdata[0].PaidAmount;
    this._total_balance = this._FooterOrderdata[0].BalanceAmount;

    this._PartialCashForm = new FormGroup({
    note: new FormControl("", [Validators.nullValidator]),
    noteCredit: new FormControl("", [Validators.required]),
    amount: new FormControl("", [Validators.nullValidator]),
    paymentmethodid: new FormControl("", [Validators.nullValidator])
    });
    if (this._helper.GetCookiesValue("is_credits_enable") === '1') {
      let selectedvalue = this._paymentmethoddropdown.filter(
        o => o.value === true
      )[0].icon;
      if (selectedvalue === "true") {
        this._IsNoteRequired = true;
      } else {
        this._IsNoteRequired = false;
      }
    }
  }
  PopulatePaymentMethodDropdown() {
    debugger;
    let Id = 0;
    let IsCredit = false;
    let data: any[];
    this._paymentmethoddropdown = [];
    if (this._OrderPaymentList.length > 0) {
      IsCredit = false;
    } else {
      IsCredit = true;
    }
    this._paymentmethodservice.GetAll().subscribe(
      res => {
        if (IsCredit == true) {
          data = res.filter(
            o =>
              !this._OrderPaymentList
                .map(i => i.payment_method_id)
                .includes(o.id) || o.is_credit == IsCredit
          );
        } else {
          data = res.filter(
            o =>
              !this._OrderPaymentList
                .map(i => i.payment_method_id)
                .includes(o.id) && o.is_credit == IsCredit
          );
        }
        if (this._helper.GetCookiesValue("is_credits_enable") == "0") {
          data
            .filter(o => o.id != 2)
            .forEach(element => {
              if (element.is_cash) {
                this._paymentmethoddropdown.push({
                  label: element.name,
                  value: element.id,
                  title: "true",
                  icon: "false"
                });
              } else if (element.is_credit) {
                this._paymentmethoddropdown.push({
                  label: element.name,
                  value: element.id,
                  title: "false",
                  icon: "true"
                });
              } else {
                this._paymentmethoddropdown.push({
                  label: element.name,
                  value: element.id,
                  title: "false",
                  icon: "false"
                });
              }
              if (Id == 0) {
                this._payment_method_id = element.id;
              }
            });
        } else {
          data.forEach(element => {
            if (element.is_cash) {
              this._paymentmethoddropdown.push({
                label: element.name,
                value: element.id,
                title: "true",
                icon: "false"
              });
            } else if (element.is_credit) {
              this._paymentmethoddropdown.push({
                label: element.name,
                value: element.id,
                title: "false",
                icon: "true"
              });
            } else {
              this._paymentmethoddropdown.push({
                label: element.name,
                value: element.id,
                title: "false",
                icon: "false"
              });
            }
            if (Id == 0) {
              this._payment_method_id = element.id;
            }
          });
        }
      },
      error => {},
      () => {}
    );
  }
  GetOrderPaymentList() {
    this._spinner.show();
    this._orderpaymentservice
      .GetOrderPaymentByOrderNo(this._order_no)
      .subscribe(
        res => {
          this._OrderPaymentList = res.sort(o => o.balance_amount).reverse();
        },
        error => {
          this._spinner.hide();
        },
        () => {
          this.PopulatePaymentMethodDropdown();
          this._spinner.hide();
        }
      );
  }
  CashButtonClick(event, amount) {
    if (amount == 0) {
      this._amount = 0;
      this._total_balance = this._FooterOrderdata[0].BalanceAmount;
    } else {
      this._amount += amount;
      this._total_balance -= amount;
    }
  }

  SavePayment() {
    debugger;
    var message = "Please paid full balance amount";
    let _dropdownvalue: boolean = true;
    let selectedvalue = this._paymentmethoddropdown.filter(
      o => o.value == this._payment_method_id
    )[0];
    if (selectedvalue.title == "false" && selectedvalue.icon == "true") {
      if (this._total_payable == this._amount) {
        _dropdownvalue = true;
      } else {
        _dropdownvalue = false;
      }
    } else if (selectedvalue.title == "true" && selectedvalue.icon == "false") {
      _dropdownvalue = true;
    } else {
      if (this._OrderPaymentList.length == 1) {
        if (this._total_payable == this._amount) {
          _dropdownvalue = true;
        } else if (
          parseFloat(
            (
              parseFloat(this._total_payable.toFixed(2)) -
              parseFloat(this._total_Paid.toFixed(2))
            ).toFixed(2)
          ) == parseFloat(this._amount.toFixed(2))
        ) {
          _dropdownvalue = true;
        } else {
          _dropdownvalue = false;
          if (
            parseFloat(
              (
                parseFloat(this._total_payable.toFixed(2)) -
                parseFloat(this._total_Paid.toFixed(2))
              ).toFixed(2)
            ) <= parseFloat(this._amount.toFixed(2))
          )
            message = "Please pay exact balance amount";
          else
            message =
              "You can add only two payments, So make full payment for this scond payment";
        }
      } else {
        if (
          (this._total_payable == this._amount &&
            this._OrderPaymentList.length != 1) ||
          this._total_payable >= this._amount
        ) {
          _dropdownvalue = true;
        } else {
          _dropdownvalue = false;
          message = "Please pay exact balance amount";
        }
      }
    }

    if (_dropdownvalue) {
      this._spinner.show();
      this._OrderPaymentData.date = apphelper.GetCurrentDate();
      this._OrderPaymentData.order_no = this._order_no;
      this._OrderPaymentData.total_amount = this._FooterOrderdata[0].TotalPayable;
      if (selectedvalue.title == "true" && selectedvalue.icon == "false") {
        this._OrderPaymentData.card_amount = 0;
        this._OrderPaymentData.credit_amount = 0;
        this._OrderPaymentData.cash_amount = this._amount;
      } else if (
        selectedvalue.title == "false" &&
        selectedvalue.icon == "true"
      ) {
        this._OrderPaymentData.card_amount = 0;
        this._OrderPaymentData.credit_amount = this._amount;
        this._OrderPaymentData.cash_amount = 0;
      } else {
        this._OrderPaymentData.card_amount = this._amount;
        this._OrderPaymentData.cash_amount = 0;
        this._OrderPaymentData.credit_amount = 0;
      }
      this._OrderPaymentData.balance_amount = this._total_balance;
      this._OrderPaymentData.payment_method_id = this._payment_method_id;

      this._orderpaymentservice.Insert(this._OrderPaymentData).subscribe(
        (res: ApiReposeModel) => {
          if (res.Type == "S") {
            this._total_Paid +=
              parseFloat(this._OrderPaymentData.cash_amount.toString()) +
              parseFloat(this._OrderPaymentData.card_amount.toString()) +
              parseFloat(this._OrderPaymentData.credit_amount.toString());
            if (this._total_balance > 0) {
              this._FooterOrderdata[0].BalanceAmount -=
                parseFloat(this._OrderPaymentData.cash_amount.toString()) +
                parseFloat(this._OrderPaymentData.card_amount.toString()) +
                parseFloat(this._OrderPaymentData.credit_amount.toString());
              this._amount = 0;
              this.GetOrderPaymentList();
              this._toastrservice.success("Order Payment", res.Message);
              this._spinner.hide();
            } else {
              this.PaymentComplete();
            }
          } else {
            this._spinner.hide();
            this._toastrservice.error("Order Payment", res.Message);
          }
        },
        error => {
          this._spinner.hide();
        },
        () => {}
      );
    } else {
      this._toastrservice.error(message, "Order Payment");
    }
  }

  AmountCalculation(value) {
    if (value == "") {
      value = 0;
      this._amount = 0;
    }
    this._amount = 0;
    this._total_balance = parseFloat(
      this._FooterOrderdata[0].BalanceAmount.toString()
    );
    this._amount += parseFloat(value.toString());
    this._total_balance -= parseFloat(value.toString());
  }

  AmountUpdate(icon) {
    debugger;
    let selectedvalue = this._paymentmethoddropdown.filter(
      o => o.value == icon
    )[0].icon;
    if (selectedvalue == "true") {
      this._IsNoteRequired = true;
      this._amount = this._total_balance;
      this.AmountCalculation(this._amount);
    } else {
      this._IsNoteRequired = false;
      this._amount = 0;
      this.AmountCalculation(this._amount);
    }
  }

  CardAmountUpdate(event) {
    debugger;
    if (this._payment_method_id > 1) {
      if (this._amount > this._total_payable) {
        this._amount = this._total_payable;
      }
    }
  }

  DeleteOrderPayment(Id: number, data: order_payment) {
    this._spinner.show();
    this._orderpaymentservice.Delete(Id).subscribe(
      (res: ApiReposeModel) => {
        if (res.Type == "S") {
          this._total_Paid -=
            parseFloat(data.cash_amount.toString()) +
            parseFloat(data.card_amount.toString()) +
            parseFloat(data.credit_amount.toString());
          if (isNaN(this._total_Paid)) this._total_Paid = 0;
          this._total_balance +=
            parseFloat(data.cash_amount.toString()) +
            parseFloat(data.card_amount.toString()) +
            parseFloat(data.credit_amount.toString());
          this._FooterOrderdata[0].BalanceAmount +=
            parseFloat(data.cash_amount.toString()) +
            parseFloat(data.card_amount.toString()) +
            parseFloat(data.credit_amount.toString());
          this.GetOrderPaymentList();
          this._toastrservice.success("Order Payment", res.Message);
        } else {
          this._toastrservice.error("Order Payment", res.Message);
        }
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      },
      () => {}
    );
  }

  PaymentComplete() {
    debugger;
    this._spinner.show();
    let _Note: string;
    let selectedvalue = this._paymentmethoddropdown.filter(
      o => o.value == this._payment_method_id
    )[0].icon;
    if (selectedvalue === "true")
    {
      _Note = this._noteCredit;
    }
    else
    {
      if (this._note === "" || this._note === undefined || this._note === null) {
        _Note = "-";
      }
    }
    this._orderservice
      .OrderToInvoice(
        parseInt(this._helper.GetCookiesValue("Order")),
        parseInt(this._helper.GetCookiesValue("sales_id")),
        _Note
      )
      .subscribe(
        (res: ApiReposeModel) => {
          if (res.Type == "S") {
            this._toastrservice.success(res.Message, "Order");
            if (this._helper.GetCookiesValue("is_gst_enable") === "1") {
              this.InvoicePrint(res.Id);
            } else {
              this.InvoiceWithoutGSTPrint(res.Id);
            }
            this._ref.close(true);
            this.ShowBalance();
            this._spinner.hide();
          } else {
            this._toastrservice.error(res.Message, "Order");
          }
        },
        error => {
          this._spinner.hide();
        },
        () => {}
      );
  }

  ShowBalance() {
    Swal.fire({
      title:
        "Total Payable is : " +
        parseFloat(this._total_payable.toFixed(2)) +
        "<br/> Total is :" +
        parseFloat(this._total_Paid.toFixed(2)) +
        "<br/> Balance is :" +
        parseFloat(this._total_balance.toFixed(2)),
      text: "",
      type: "success",
      confirmButtonText: "Ok"
    }).then(result => {
      if (result.value) {
      }
    });
  }

  InvoicePrint(Id: number) {
    this._invoiceservice.InvoicePrint(Id).subscribe(res => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("Invoice");
      dataset.readJson(res);
      report.loadFile("Reports/Invoice.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function() {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(data, "Invoice.pdf", "application/pdf");
      });
    });
  }

  InvoiceWithoutGSTPrint(Id: number) {
    this._invoiceservice.InvoicePrint(Id).subscribe(res => {
      Stimulsoft.Base.StiLicense.Key = this._helper.GetStimulsoftKey();
      var report = new Stimulsoft.Report.StiReport();
      var dataset = new Stimulsoft.System.Data.DataSet("InvoiceWithoutGST");
      dataset.readJson(res);
      report.loadFile("Reports/InvoiceWithoutGST.mrt");
      report.regData(dataset.dataSetName, "", dataset);
      report.renderAsync(function() {
        var data = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(data, "InvoiceWithoutGST.pdf", "application/pdf");
      });
    });
  }
}
