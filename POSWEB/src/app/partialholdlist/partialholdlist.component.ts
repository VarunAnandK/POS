import { Component, OnInit } from '@angular/core';
import { order as Ordermodel } from 'src/Model/order';
import { OrderService } from 'src/Service/order.service';
import { OrderFooterData } from '../pos-dashoard/pos-dashoard.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperModel } from 'src/Model/Helper-model';
import { DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-partialholdlist',
  templateUrl: './partialholdlist.component.html',
  styleUrls: ['./partialholdlist.component.css']
})
export class PartialholdlistComponent implements OnInit {
  _OrderList: Ordermodel[];
  _TableFields: any[];

  constructor(
    public _orderservice: OrderService,
    private _spinner: NgxSpinnerService,
    private _helper: HelperModel,
    public _ref: DynamicDialogRef,
  ) {
  }

  ngOnInit() {
    // this._TableFields = [
    //   { field: 'order_no', header: 'Order No' },
    //   { field: 'sub_total', header: 'Amount' }
    // ];
    this.GetHoldOrderList();
  }

  GetHoldOrderList() {
    
    this._spinner.show();
    this._orderservice.GetHoldListAll(parseInt(this._helper.GetCookiesValue("Order"))).subscribe((res) => {
      this._OrderList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }

  Edit(order_no: number) {
    
    this._helper.DeletCookiesValue("Order");
    this._helper.SetCookiesValue("Order",order_no);
    this._ref.close(true);
  }

}
