import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { HelperModel } from "src/Model/Helper-model";
import { DialogService, SelectItem, LazyLoadEvent } from "primeng/api";
import { BusinessService } from "src/Service/business.service";
import { order as Ordermodel, order } from "src/Model/order";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { OrderService } from "src/Service/order.service";
import { product } from "src/Model/product";
import { ProductService } from "src/Service/product.service";
import { ApiReposeModel } from "src/Model/ApiResponse-model";
import { GSTDetailService } from "src/Service/gstdetail.service";
import { SalesService } from "src/Service/sales.service";
import { sales } from "src/Model/sales";
import { formatDate } from "@angular/common";
import { Router } from "@angular/router";
import { GenerateNumberService } from "src/Service/generate_number.service";
import { PartialDiscountComponent } from "../partialdiscount/partialdiscount.component";
import Swal from "sweetalert2";
import { DataView } from "primeng/dataview";
import { PartialholdlistComponent } from "../partialholdlist/partialholdlist.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { __values } from "tslib";
import { PartialcashComponent } from "../partialcash/partialcash.component";
import { OrderPaymentService } from "src/Service/orderpayment.service";
import { apphelper } from "src/Model/apphelper";
declare var Stimulsoft: any;
import { PartialdaycloseComponent } from "../partialdayclose/partialdayclose.component";
import { PartialaddcustomerComponent } from "../partialaddcustomer/partialaddcustomer.component";
import { PartialaddproductComponent } from "../partialaddproduct/partialaddproduct.component";
import { business } from "src/Model/business";
import { PartialgstlistComponent } from "../partialgstlist/partialgstlist.component";
import { PartialroundoffComponent } from "../partialroundoff/partialroundoff.component";
import { PartialinvoiceComponent } from "../partialinvoice/partialinvoice.component";

@Component({
  selector: "app-pos-dashoard",
  templateUrl: "./pos-dashoard.component.html",
  styleUrls: ["./pos-dashoard.component.css"],
  providers: [DialogService]
})
export class PosDashoardComponent implements OnInit {
  options: any;
  designer: any;
  _business_id: number = 0;
  _OrderList: Ordermodel[];
  _businessdropdown: SelectItem[];
  _ProductList: product[];
  _orderadd: Ordermodel;
  _FooterOrderdata: OrderFooterData[];
  _SalesList: sales[];
  _OrderNo: number;
  _ClonedOrder: Ordermodel;
  _IsSalesOrNot: boolean = true;
  _IsOrderHave: boolean = false;
  _currentdate: string;
  _today: string;
  _SalesData: sales;
  _SalesForm: FormGroup;
  _ProducttotalRecords: number = 0;
  _productloader: boolean;
  values = "";
  txtbarcode: string;
  _businessgroupdiscountpercentage: number = 0;
  _roundoffamount: number = 0;
  _BusinessData: business;
  _ProductData: product;
  constructor(
    public _helper: HelperModel,
    public _orderservice: OrderService,
    private _toastrservice: ToastrService,
    private _spinner: NgxSpinnerService,
    private _formbuilder: FormBuilder,
    private businessservice: BusinessService,
    private _productservice: ProductService,
    private _gstdetailservice: GSTDetailService,
    private _salesservice: SalesService,
    private _route: Router,
    private _generatenumberservice: GenerateNumberService,
    private _dialogservice: DialogService,
    private _orderpaymentservice: OrderPaymentService
  ) {
    this._helper.NavBar = true;
    this._helper.LeftMenu = false;
    this._OrderList = new Array<Ordermodel>();
    this._ClonedOrder = new Ordermodel();
    this._FooterOrderdata = new Array<OrderFooterData>();
    this._SalesData = new sales();
  }

  ngOnInit() {
    // this._SalesForm = this._formbuilder.group({
    //   opening_cash: new FormControl("", Validators.nullValidator)
    // });

    this.SetSalesId();

    if (this._helper.GetCookiesValue("Order") == "") {
      this._OrderNo = 0;
    } else {
      this._OrderNo = parseInt(this._helper.GetCookiesValue("Order"));
    }
      this.GetOrderList(this._OrderNo);
      this.PopulateBusinessDropdown();
      this.GetProductList();
  }

  SetSalesId()
  {
    if (this._helper.GetCookiesValue("sales_id") === "") {
      this._currentdate = apphelper.GetCurrentDate();
      this._salesservice.GetSalesByDate(this._currentdate).subscribe(
        res => {
          if (res["lastrecord"] == true) {
            this._IsSalesOrNot = false;
            this._SalesData.opening_cash = res["openingcash"];
          } else {
            this._IsSalesOrNot = true;
          }
          this._helper.SetCookiesValue("sales_id", res["sales_id"]);
        },
        error => {},
        () => {}
      );
    }
  }


  GetOrderList(orderno: number, needspinner: boolean = true) {
    if (needspinner) {
      this._spinner.show();
    }
    this._FooterOrderdata = new Array<OrderFooterData>();
    this._FooterOrderdata[0] = new OrderFooterData();
    this._FooterOrderdata[0].Discount = 0.0;
    this._FooterOrderdata[0].GST = 0.0;
    this._FooterOrderdata[0].Items = 0.0;
    this._FooterOrderdata[0].Total = 0.0;
    this._FooterOrderdata[0].TotalPayable = 0.0;
    this._FooterOrderdata[0].PaidAmount = 0.0;
    this._FooterOrderdata[0].BalanceAmount = 0.0;
    this._FooterOrderdata[0].RoundOffAmount = 0.0;
    this._orderservice.GetOrderByOrderId(orderno).subscribe(
      res => {
        this._OrderList = res;
        this._OrderList.forEach((o, i) => {
          o["product_name"] = o.product.name == null ? "N/A" : o.product.name;
          this._FooterOrderdata[0].Items =
            parseFloat(this._FooterOrderdata[0].Items.toFixed(2)) +
            parseFloat(o.qty.toFixed(2));
          this._FooterOrderdata[0].Total =
            parseFloat(this._FooterOrderdata[0].Total.toString()) +
            parseFloat(o.qty.toString()) * parseFloat(o.price.toString());
          this._FooterOrderdata[0].Discount =
            parseFloat(this._FooterOrderdata[0].Discount.toString()) +
            parseFloat(o.discount_amount.toString());
          this._FooterOrderdata[0].GST =
            parseFloat(this._FooterOrderdata[0].GST.toString()) +
            parseFloat(o.gst_amount.toString());
          this._FooterOrderdata[0].TotalPayable =
            parseFloat(o.gst_amount.toString()) +
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            parseFloat(o.sub_total.toString());
          this._FooterOrderdata[0].BalanceAmount =
            parseFloat(o.gst_amount.toString()) +
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            parseFloat(o.sub_total.toString());
          this._FooterOrderdata[0].RoundOffAmount = parseFloat(
            parseFloat(o.round_off.toString()).toFixed(2)
          );
        });
        this._FooterOrderdata[0].TotalPayable =
          parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
          parseFloat(this._FooterOrderdata[0].RoundOffAmount.toString());
        this._FooterOrderdata[0].BalanceAmount =
          parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
          parseFloat(this._FooterOrderdata[0].RoundOffAmount.toString());
        if (needspinner) {
          this._spinner.hide();
        }
      },
      error => {
        if (needspinner) {
          this._spinner.hide();
        }
      },
      () => {
        this.GetPaymentDetails();
        this.txtbarcode = "";
        if (this._OrderList.length > 0) {
          this._IsOrderHave = true;
        } else {
          this._IsOrderHave = false;
        }
      }
    );
  }

  GetPaymentDetails() {
    this._spinner.show();
    this._FooterOrderdata[0].PaidAmount = 0.0;
    this._orderpaymentservice.GetOrderPaymentByOrderNo(this._OrderNo).subscribe(
      res => {
        res.forEach(o => {
          this._FooterOrderdata[0].PaidAmount =
            parseFloat(this._FooterOrderdata[0].PaidAmount.toFixed(2)) +
            parseFloat(
              (
                parseFloat(o.cash_amount.toString()) +
                parseFloat(o.card_amount.toString())
              ).toString()
            );
          this._FooterOrderdata[0].BalanceAmount = parseFloat(
            o.balance_amount.toString()
          );
        });
      },
      error => {
        this._spinner.hide();
      },
      () => {
        this._spinner.hide();
      }
    );
  }

  PopulateBusinessDropdown(Selectedid: number = 0) {
    var id = 0;
    this._business_id = 0;
    this._businessdropdown = [];
    this.businessservice.GetAll().subscribe(
      res => {
        res.forEach(element => {
          if (element.business_group_id != null) {
            this._businessdropdown.push({
              label: element.name,
              value: element.id,
              title: element.business_group.percentage.toString()
            });
          } else {
            this._businessdropdown.push({
              label: element.name,
              value: element.id,
              title: "0"
            });
          }
          if (id == 0) {
            id = element.id;
          }
        });
      },
      error => {},
      () => {
        debugger;
        if (this._OrderList.length > 0 && Selectedid == 0) {
          this._business_id = this._OrderList[0].business_id;
        } else {
          if (Selectedid > 0) {
            this._business_id = Selectedid;
          } else {
            this._business_id = id;
          }
        }
      }
    );
  }

  GetProductList(take: number = 8, skip: number = 0, search: string = "") {
    this._productloader = true;
    this._productservice.GetSearchAndList(take, skip, search).subscribe(
      res => {
        this._ProductList = res["data"];
        this._ProducttotalRecords = res["totalrecord"];
      },
      error => {
        this._productloader = false;
      },
      () => {
        this._productloader = false;
      }
    );
  }
  OrderAddProduct(data: product, qty: number = 1) {
    if (this._FooterOrderdata[0].PaidAmount > 0) {
      this._toastrservice.error(
        "Product cannot add due to partial payment",
        "Order"
      );
    } else {
      this._orderadd = new Ordermodel();
      if (
        this._helper.GetCookiesValue("Order") == null ||
        this._helper.GetCookiesValue("Order") == "" ||
        this._helper.GetCookiesValue("Order") == undefined
      ) {
        this._generatenumberservice.GetNumber("Order").subscribe(res => {
          this._orderadd.order_no = res;
          this._helper.SetCookiesValue("Order", res);
          this._OrderNo = res;
          this.ProductAdd(data, qty);
        });
      } else {
        this._orderadd.order_no = parseInt(
          this._helper.GetCookiesValue("Order")
        );
        this.ProductAdd(data, qty);
      }
    }
  }

  ProductAdd(data: product, qty: number = 1) {
    debugger;
    this._spinner.show();
    this._orderadd.order_date = apphelper.GetCurrentDate();
    this._orderadd.business_id = this._business_id;
    this._orderadd.sales_id = parseInt(
      this._helper.GetCookiesValue("sales_id")
    );
    this._orderadd.product_id = data.id;
    this._orderadd.product_category_id = data.product_category_id;
    this._orderadd.product_sub_category_id = data.product_sub_category_id;
    this._orderadd.qty = qty;
    this._orderadd.gst_id = data.gst_id;
    this._orderadd.price = data.selling_price;
    this._orderadd.sub_total = this._orderadd.qty * this._orderadd.price;
    this._orderservice.Insert(this._orderadd).subscribe(
      (res: ApiReposeModel) => {
        if (res.Type == "S") {
          this.DiscountLogic(0, false);
        } else {
          this._toastrservice.error(res.Message, "Order");
        }
      },
      error => {
        this._spinner.hide();
      },
      () => {
        this._spinner.hide();
      }
    );
  }

  DeleteOrder(Id: number = 0) {
    this._spinner.show();
    this._orderservice.Delete(Id).subscribe(
      (res: ApiReposeModel) => {
        if (res.Type == "S") {
        } else {
          this._toastrservice.error(res.Message, "Order");
        }
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      },
      () => {
        this.GetOrderList(this._OrderNo);
      }
    );
  }

  UpdateOrderBusiness(event) {
    this._spinner.show();
    this._orderservice.OrderBusinessUpdate(this._OrderNo, event).subscribe(
      (res: ApiReposeModel) => {
        if (res.Type == "S") {
          //var _businessgroupdiscountpercentage = 0;
          this._businessgroupdiscountpercentage = parseFloat(
            this._businessdropdown.filter(o => o.value == this._business_id)[0]
              .title
          );
          this._businessgroupdiscountpercentage =
            (this._FooterOrderdata[0].Total *
              this._businessgroupdiscountpercentage) /
            100;
          this._businessgroupdiscountpercentage =
            this._businessgroupdiscountpercentage /
            this._FooterOrderdata[0].Items;
          this.DiscountLogic(this._businessgroupdiscountpercentage);
        } else {
          this._toastrservice.error(res.Message, "Order");
        }
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      },
      () => {
        //this.GetOrderList(this._OrderNo);
      }
    );
  }

  DeleteAllOrder() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this Order",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this._spinner.show();
        this._orderservice.DeleteAll(this._OrderNo).subscribe(
          (res: ApiReposeModel) => {
            if (res.Type == "S") {
              this._toastrservice.success(res.Message, "Order");
            } else {
              this._toastrservice.error(res.Message, "Order");
            }
            this._spinner.hide();
          },
          error => {
            this._spinner.hide();
          },
          () => {
            this.GetOrderList(this._OrderNo);
          }
        );
      }
    });
  }

  OrderonRowEditInit(order: Ordermodel) {
    this._ClonedOrder = Object.assign({}, order);
  }

  OrderonRowEditSave(order: Ordermodel) {
    if (order.discount_amount > 0 || order.round_off > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "Discount And Round Off will remove for all product",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(result => {
        if (result.value) {
          order.discount_amount = 0;
          order.round_off = 0;
          this.OrderEditProduct(order);
        }
      });
    } else {
      this.OrderEditProduct(order);
    }
  }

  OrderonRowEditCancel(order: Ordermodel, index: number) {
    this._OrderList[index] = this._ClonedOrder;
    delete this._ClonedOrder;
  }

  QtyChange($event, rowData: Ordermodel, index: number) {
    rowData.sub_total =
      (this._ClonedOrder.price - this._ClonedOrder.discount_amount) *
      rowData.qty;
  }
  AmountChange($event, rowData: Ordermodel, index: number) {
    rowData.sub_total = rowData.qty * (rowData.price - rowData.discount_amount);
  }

  OrderEditProduct(data: Ordermodel) {
    this._spinner.show();
    data.sub_total =
      parseInt(data.qty.toString()) * parseFloat(data.price.toString()) -
      parseFloat(data.discount_amount.toString());
    delete data.sales;
    delete data.product;
    delete data.product_category;
    delete data.sub_product_category;
    delete data.gst;
    delete data.business;
    delete data["product_name"];
    this._orderservice.Update(data).subscribe(
      (res: ApiReposeModel) => {
        if (res.Type == "S") {
          this.DiscountLogic(0);
          // this._toastrservice.success(res.Message, "Order");
          this._orderservice
            .OrderRoundOffAmountUpdate({
              order_no: parseInt(this._helper.GetCookiesValue("Order")),
              roundoff_amount: 0
            })
            .subscribe(
              (res: ApiReposeModel) => {
                if (res.Type == "S") {
                }
                this._spinner.hide();
              },
              error => {
                this._spinner.hide();
              }
            );
        } else {
          this._toastrservice.error(res.Message, "Order");
        }
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      },
      () => {
        this._spinner.hide();
      }
    );
  }

  CreateOpeningCash() {
    this._spinner.show();
    this._salesservice.Insert(this._SalesData).subscribe(
      (res: ApiReposeModel) => {
        if (res.Type == "S") {
          this._IsSalesOrNot = true;
          this._toastrservice.success(res.Message, "Sales");
          this._helper.SetCookiesValue("sales_id", res.Id);
        } else {
          this._toastrservice.error(res.Message, "Sales");
        }
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      }
    );
  }

  OpenHoldList() {
    const ref = this._dialogservice.open(PartialholdlistComponent, {
      header: "Hold List",
      width: "50%",
      contentStyle: { overflow: "auto" }
    });
    ref.onClose.subscribe(res => {
      if (res) {
        this._OrderNo = parseInt(this._helper.GetCookiesValue("Order"));
        this.GetOrderList(this._OrderNo);
      }
    });
  }

  InvoiceList() {
    const ref = this._dialogservice.open(PartialinvoiceComponent, {
      header: "Invocie List as of " + apphelper.GetCurrentDate(),
      width: "90%",
      contentStyle: { overflow: "auto" }
    });
    ref.onClose.subscribe(res => {
      // if (res) {
      //   this._OrderNo = parseInt(this._helper.GetCookiesValue("Order"));
      //   this.GetOrderList(this._OrderNo);
      // }
    });
  }

  AddDiscount() {
    const ref = this._dialogservice.open(PartialDiscountComponent, {
      header: "Discount",
      width: "30%",
      data: {
        Qty: this._FooterOrderdata[0].Items,
        Amount: this._FooterOrderdata[0].Total,
        LastDiscountAmount: this._FooterOrderdata[0].Discount
      },
      contentStyle: { overflow: "auto" }
    });
    ref.onClose.subscribe(res => {
      if (res["status"]) {
        //this.GetOrderList(this._OrderNo);
        this.DiscountLogic(res["percentage"]);
      }
    });
  }

  PartialCash() {
    const ref = this._dialogservice.open(PartialcashComponent, {
      header: "Payment",
      width: "70%",
      data: this._FooterOrderdata,
      contentStyle: { overflow: "scroll", "overflow-y": "auto" }
    });
    ref.onClose.subscribe(res => {
      if (res) {
        this.HoldOrder();
      } else {
        this.GetOrderList(this._OrderNo);
      }
    });
  }

  PartialDayClose() {
    const ref = this._dialogservice.open(PartialdaycloseComponent, {
      header: "Day Close",
      width: "50%",
      contentStyle: { overflow: "scroll", "overflow-y": "auto" }
    });
    ref.onClose.subscribe(res => {
      if (res) {
        this._helper.DeletCookiesValue("sales_id");
        this._helper.DeletCookiesValue("Order");
        this.SetSalesId();
      }
    });
  }

  PartialAddCustomer() {
    const ref = this._dialogservice.open(PartialaddcustomerComponent, {
      header: "Add Business",
      width: "70%",
      data: new business(),
      contentStyle: { overflow: "scroll", "overflow-y": "auto" }
    });
    ref.onClose.subscribe(res => {
      if (res["Status"]) {
        this.PopulateBusinessDropdown(res["BusinessId"]);
        this.UpdateOrderBusiness(res["BusinessId"]);
      }
    });
  }

  PartialEditCustomer() {
    this._spinner.show();
    if (this._business_id > 0) {
      this.businessservice.GetById(this._business_id).subscribe(
        res => {
          if (res) {
            this._BusinessData = res;
            const ref = this._dialogservice.open(PartialaddcustomerComponent, {
              header: "Edit Business",
              width: "70%",
              data: this._BusinessData,
              contentStyle: { overflow: "scroll", "overflow-y": "auto" }
            });
            ref.onClose.subscribe(res => {
              if (res["Status"]) {
                this.UpdateOrderBusiness(this._business_id);
              }
            });
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

  PartialEditProduct(data: product) {
    this._spinner.show();
    if (data.id > 0) {
      this._productservice.GetById(data.id).subscribe(
        res => {
          if (res) {
            this._ProductData = res;
            const ref = this._dialogservice.open(PartialaddproductComponent, {
              header: "Edit Product",
              width: "70%",
              data: this._ProductData,
              contentStyle: { overflow: "scroll", "overflow-y": "auto" }
            });
            ref.onClose.subscribe(res => {
              if (res) {
                this.GetProductList();
              }
            });
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

  Partialgstlist() {
    const ref = this._dialogservice.open(PartialgstlistComponent, {
      header: "GST Summary",
      width: "80%",
      contentStyle: { overflow: "scroll", "overflow-y": "auto" }
    });
    ref.onClose.subscribe(res => {
      if (res) {
        // this._helper.DeletCookiesValue("sales_id");
        // this._helper.DeletCookiesValue("Order");
        // this._IsSalesOrNot = false;
      }
    });
  }

  Partialroundoff() {
    const ref = this._dialogservice.open(PartialroundoffComponent, {
      header: "Round Off",
      width: "30%",
      data: this._FooterOrderdata[0].RoundOffAmount,
      contentStyle: { overflow: "scroll", "overflow-y": "auto" }
    });
    ref.onClose.subscribe(res => {
      if (res) {
        this.GetOrderList(
          parseInt(this._helper.GetCookiesValue("Order")),
          false
        );
      }
    });
  }

  PartialAddProduct() {
    const ref = this._dialogservice.open(PartialaddproductComponent, {
      header: "Add Product",
      width: "70%",
      data: new product(),
      contentStyle: { overflow: "scroll", "overflow-y": "auto" }
    });
    ref.onClose.subscribe(res => {
      if (res) {
        this.GetProductList();
      }
    });
  }

  AutoRoundOff() {
    debugger;
    let _roundtaotal = parseFloat(
      this._FooterOrderdata[0].TotalPayable.toString()
    );
    let i = Math.floor(_roundtaotal);
    let LastDigit = (_roundtaotal - i).toFixed(2);
    let last = LastDigit.substr(LastDigit.length - 1);
    //double GST
    if (LastDigit.length >= 4 && last != "5") {
      if (parseFloat(LastDigit) < 0.05) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) -
            parseFloat(LastDigit)
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) -
            parseFloat(LastDigit)
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.00") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.1) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.05") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.05") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.05") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.15) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.10") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.10") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.10") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.2) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.15") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.15") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.15") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.25) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.20") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.20") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.20") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.3) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.25") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.25") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.25") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.35) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.30") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.30") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.30") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.4) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.35") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.35") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.35") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.45) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.40") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.40") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.40") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.5) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.45") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.45") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.45") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.55) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.50") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.50") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.50") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.6) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.55") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.55") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.55") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.65) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.60") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.60") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.60") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.7) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.65") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.65") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.65") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.75) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.70") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.70") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.70") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.8) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.75") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.75") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.75") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.85) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.80") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.80") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.80") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.9) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.85") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.85") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.85") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (parseFloat(LastDigit) < 0.95) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.90") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.90") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.90") - parseFloat(LastDigit)).toFixed(2)
        );
      } else if (
        parseFloat(LastDigit) == 0.96 ||
        parseFloat(LastDigit) == 0.97 ||
        parseFloat(LastDigit) == 0.98 ||
        parseFloat(LastDigit) == 0.99
      ) {
        this._FooterOrderdata[0].TotalPayable = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].TotalPayable.toString()) +
            (parseFloat("0.95") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._FooterOrderdata[0].BalanceAmount = parseFloat(
          (
            parseFloat(this._FooterOrderdata[0].BalanceAmount.toString()) +
            (parseFloat("0.95") - parseFloat(LastDigit))
          ).toFixed(2)
        );
        this._roundoffamount = parseFloat(
          (parseFloat("0.95") - parseFloat(LastDigit)).toFixed(2)
        );
      }
      this._orderservice
        .OrderRoundOffAmountUpdate({
          order_no: parseInt(this._helper.GetCookiesValue("Order")),
          roundoff_amount: this._roundoffamount
        })
        .subscribe(
          (res: ApiReposeModel) => {
            if (res.Type == "S") {
              this.GetOrderList(
                parseInt(this._helper.GetCookiesValue("Order")),
                false
              );
            }
            this._spinner.hide();
          },
          error => {
            this._spinner.hide();
          }
        );
    } else {
    }
  }

  DiscountLogic(amount: number, needspinner: boolean = true) {
    if (needspinner) {
      this._spinner.show();
    }
    this._orderservice.OrderDiscountUpdate(this._OrderNo, amount).subscribe(
      (res: ApiReposeModel) => {
        if (res.Type == "S") {
        } else {
          this._toastrservice.error(res.Message, "Order");
        }
        if (needspinner) {
          this._spinner.hide();
        }
      },
      error => {
        if (needspinner) {
          this._spinner.hide();
        }
      },
      () => {
        this.GetOrderList(this._OrderNo);
      }
    );
  }

  OpeningCash() {}

  HoldOrder() {
    this._generatenumberservice.GetNumber("Order").subscribe(res => {
      this._helper.DeletCookiesValue("Order");
      this._helper.SetCookiesValue("Order", res);
      this._OrderNo = res;
      this.GetOrderList(this._OrderNo);
      this._business_id = this._helper.DefaultBusinessId;
    });
  }
  loadProductLazy(event) {
    this.GetProductList(event.rows, event.first, event.globalFilter);
  }
  SearchProductLazy(event, dv: DataView) {
    this.GetProductList(dv.rows, 0, event.target.value);
  }

  ProductByBarcode(event) {
    if (event.code == "NumpadEnter" || event.code == "Enter") {
      this._productservice.GetAllProductByBarcode(event.target.value).subscribe(
        res => {
          if (res) {
            this.OrderAddProduct(res, 1);
          }
        },
        error => {},
        () => {}
      );
    }
  }
}
export class OrderFooterData {
  Items: number;
  Total: number;
  Discount: number;
  GST: number;
  TotalPayable: number;
  PaidAmount: number;
  BalanceAmount: number;
  RoundOffAmount: number;
}
