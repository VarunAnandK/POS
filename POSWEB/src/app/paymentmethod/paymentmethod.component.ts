import { Component, OnInit } from '@angular/core';
import { payment_method } from 'src/Model/payment_method';
import { PaymentMethodService } from 'src/Service/paymentmethod.service';
import { DialogService } from 'primeng/api';
import { PartialPaymentMethod } from '../partialpaymentmethod/partialpaymentmethod.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.css'],
  providers: [DialogService]
})
export class PaymentMethodComponent implements OnInit {
  _PaymentMethodList: payment_method[];
  _TableFields: any[];
  _PaymentMethodData: payment_method;
  constructor(
    private _paymentmethodservice: PaymentMethodService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'name', header: 'Payment Method Name' },
      { field: 'code', header: 'Code' }
    ];
    this.GetPaymentMethodList();
  }

  GetPaymentMethodList() {
    this._spinner.show();
    this._paymentmethodservice.GetAll().subscribe((res) => {
      this._PaymentMethodList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._PaymentMethodData = new payment_method();
      const ref = this._dialogservice.open(PartialPaymentMethod, {
        header: 'Payment Method - New',
        width: '50%',
        data: this._PaymentMethodData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true)
          this.GetPaymentMethodList();
      });
    }
    else {
      this._spinner.show();
      this._paymentmethodservice.GetById(Id).subscribe((res) => {
        this._PaymentMethodData = res;
        const ref = this._dialogservice.open(PartialPaymentMethod, {
          header: 'Payment Method - Edit',
          width: '50%',
          data: this._PaymentMethodData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true)
            this.GetPaymentMethodList();
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
}
