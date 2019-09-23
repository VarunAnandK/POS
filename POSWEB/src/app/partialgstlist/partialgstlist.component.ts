import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/Service/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperModel } from 'src/Model/Helper-model';
import { DynamicDialogRef } from 'primeng/api';
import { order as Ordermodel } from 'src/Model/order';
import { product } from 'src/Model/product';

@Component({
  selector: 'app-partialgstlist',
  templateUrl: './partialgstlist.component.html',
  styleUrls: ['./partialgstlist.component.css']
})
export class PartialgstlistComponent implements OnInit {
  _OrderGSTList: Ordermodel[];
  _TableFields: any[];

  constructor(
    public _orderservice: OrderService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    public _ref: DynamicDialogRef,
  ) {
    //this._OrderGSTList = new Array<Ordermodel>();
  }

  ngOnInit() {
    this.GetAllOrderGSTList();
  }

  GetAllOrderGSTList() {
    debugger
    this._spinner.show();
    this._orderservice.GetAllOrderGSTList(parseInt(this._helper.GetCookiesValue("Order"))).subscribe((res) => {
      this._OrderGSTList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }

  // GetHoldOrderList() {
  //   var index = 0;
  //   this._spinner.show();
  //   this._orderservice.GetAllOrderGSTList(parseInt(this._helper.GetCookiesValue("Order"))).subscribe((res) => {
  //     res.forEach((o, i) => {
  //       var _gstpercentage = 0.00;
  //       var _OrderGST = new Ordermodel();
  //       _gstpercentage = (parseFloat(o.cgst_percentage.toString()) + parseFloat(o.sgst_percentage.toString()));
  //       if(_gstpercentage > 0)
  //       {
  //         this._OrderGSTList[index] = _OrderGST;
  //         this._OrderGSTList[index].gst_percentage = _gstpercentage;
  //         this._OrderGSTList[index].product = new product();
  //         this._OrderGSTList[index].product.hsnorsac = o.product.hsnorsac;
  //         this._OrderGSTList[index].gst_amount = o.gst_amount;
  //         this._OrderGSTList[index].cgst_amount = o.cgst_amount;
  //         this._OrderGSTList[index].cgst_percentage = o.cgst_percentage;
  //         this._OrderGSTList[index].sgst_amount = o.sgst_amount;
  //         this._OrderGSTList[index].sgst_percentage = o.sgst_percentage;
  //         this._OrderGSTList[index].igst_amount = o.igst_amount;
  //         this._OrderGSTList[index].igst_percentage = o.igst_percentage;
  //         index++;
  //       }
  //     });
  //   }, (error) => {
  //     this._spinner.hide();
  //   }, () => {
  //     this._spinner.hide();
  //   });
  // }

}
