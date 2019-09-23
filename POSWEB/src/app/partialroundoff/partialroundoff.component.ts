import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, SelectItem, DynamicDialogConfig } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/Service/order.service';
import { HelperModel } from 'src/Model/Helper-model';
import { order as Ordermodel, order } from 'src/Model/order';
import { OrderFooterData } from '../pos-dashoard/pos-dashoard.component';
import { ToastrService } from 'ngx-toastr';
import { IfStmt } from '@angular/compiler';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-partialroundoff',
  templateUrl: './partialroundoff.component.html',
  styleUrls: ['./partialroundoff.component.css']
})
export class PartialroundoffComponent implements OnInit {
  _Roundoffamount: number = 0.00;
  _RoundOffForm: FormGroup;
  _FooterOrderdata: OrderFooterData[];
  constructor(
    public _ref: DynamicDialogRef,
    public _config: DynamicDialogConfig,
    private _formbuilder: FormBuilder,
    public _orderservice: OrderService,
    public _helper: HelperModel,
    private _toastrservice: ToastrService,
    private _spinner: NgxSpinnerService,
  ) {
    this._Roundoffamount = this._config.data;
  }

  ngOnInit() {
    this._RoundOffForm = this._formbuilder.group({
      _Roundoffamount: new FormControl('', Validators.nullValidator),
    });
  }

  Save()
  {
    this._orderservice.OrderRoundOffAmountUpdate({"order_no" : parseInt(this._helper.GetCookiesValue("Order")) , "roundoff_amount" : this._Roundoffamount}).subscribe((res: ApiReposeModel) => {
      if (res.Type == "S") {
        this._ref.close(true);
      }
      this._spinner.hide();
    }, (error) => {
      this._spinner.hide();
    });
  }
}
