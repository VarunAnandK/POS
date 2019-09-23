import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, SelectItem, DynamicDialogConfig } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/Service/order.service';
import { HelperModel } from 'src/Model/Helper-model';
import { order as Ordermodel, order } from 'src/Model/order';
import { OrderFooterData } from '../pos-dashoard/pos-dashoard.component';
import { ToastrService } from 'ngx-toastr';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-partialdiscount',
  templateUrl: './partialdiscount.component.html',
  styleUrls: ['./partialdiscount.component.css']
})
export class PartialDiscountComponent implements OnInit {
  _percentage: number;
  _sliderpercentage: number;
  _DiscountForm: FormGroup;
  _typedropdown: SelectItem[];
  _OrderList: Ordermodel[];
  _discounttype: number;
  _IsTextBox: boolean = false;
  _IsSlider: boolean = false;
  _TotalQty : number = 0;
  _TotalAmount : number = 0;
  constructor(
    public _ref: DynamicDialogRef,
    public _config: DynamicDialogConfig,
    private _formbuilder: FormBuilder,
    public _orderservice: OrderService,
    public _helper: HelperModel,
    private _toastrservice: ToastrService,
  ) {
    this._TotalQty = this._config.data["Qty"];
    this._TotalAmount = this._config.data["Amount"];
    this._percentage =  this._config.data["LastDiscountAmount"];
  }

  ngOnInit() {
    this.PopulateTypeDropdown();
    this._DiscountForm = this._formbuilder.group({
      _percentage: new FormControl('', Validators.max(100)),
      _sliderpercentage: new FormControl('', Validators.max(100)),
    });
  }

  PopulateTypeDropdown() {
    this._typedropdown = [];
    this._typedropdown.push({ label: "Amount", value: "A" });
    this._typedropdown.push({ label: "Percentage", value: "P" });
    if (this._typedropdown[0].value === "A") {
      this._IsTextBox = false;
      this._IsSlider = true;
    }
  }

  DiscountType(value) {
    if (value === "A") {
      this._IsTextBox = false;
      this._IsSlider = true;
    }
    else {
      this._IsTextBox = true;
      this._IsSlider = false;
    }
    this._percentage = 0;
    this._sliderpercentage = 0;
  }

  // DiscountLimit(value) {
  //   this._FooterOrderdata = new Array<OrderFooterData>();
  //   this._FooterOrderdata[0] = new OrderFooterData();
  //   this._FooterOrderdata[0].Items = 0.00;
  //   this._FooterOrderdata[0].Total = 0.00;
  //   if (this._percentage >= 0) {
  //     this._orderservice.GetOrderByOrderId(parseInt(this._helper.GetCookiesValue("Order"))).subscribe((res) => {
  //       this._OrderList = res;
  //       this._OrderList.forEach((o, i) => {
  //         this._FooterOrderdata[0].Items = (parseFloat(this._FooterOrderdata[0].Items.toFixed(2)) + parseFloat(o.qty.toFixed(2)));
  //         this._FooterOrderdata[0].Total = parseFloat(this._FooterOrderdata[0].Total.toString()) + (parseFloat(o.qty.toString()) * parseFloat(o.price.toString()));
  //       });
  //       this._lowestproductamount = this._OrderList.reduce((ya, u) => Math.min(ya, u.sub_total), Number.MAX_VALUE);
  //       this._label_lowestproductamount = this._lowestproductamount.toString();
  //       if (value <= this._lowestproductamount) {
  //         this._percentage = value;
  //       }
  //       else {
  //         this._percentage = this._lowestproductamount;
  //       }
  //     }, (error) => {
  //     }, () => {
  //     });
  //   }
  //   else {
  //     this._IsTextBox = false;
  //     this._IsSlider = true;
  //   }
  // }

  Save() {
    if (this._IsTextBox == false) {
      if (this._percentage > 0) {
        this._percentage = this._percentage / this._TotalQty;
        this._ref.close({ "status": true, "percentage": this._percentage });
      }
      else {
        this._ref.close({ "status": true, "percentage": this._percentage });
      }

    }
    else {
        this._sliderpercentage = (this._TotalAmount * this._sliderpercentage) / 100;
        this._sliderpercentage = this._sliderpercentage / this._TotalQty;
        this._ref.close({ "status": true, "percentage": this._sliderpercentage });
    }
  }
}
