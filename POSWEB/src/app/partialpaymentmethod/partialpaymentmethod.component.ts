import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { payment_method } from 'src/Model/payment_method';
import { PaymentMethodService } from 'src/Service/paymentmethod.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './partialpaymentmethod.component.html',
    providers: [DialogService]
})
export class PartialPaymentMethod implements OnInit {
    _PaymentMethodData: payment_method;
    _PaymentMethodForm: FormGroup;
    _ValidationState: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _paymentmethodservice: PaymentMethodService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
    ) {
        this._PaymentMethodData = this._config.data;
    }
    ngOnInit() {
        this._PaymentMethodForm = this._formbuilder.group({
            name: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
            is_cash: new FormControl('', Validators.nullValidator),
        });
    }

    CreateOrUpdate() {
        debugger
        this._spinner.show();
        this._ValidationState = true;
        if (this._PaymentMethodData.id == 0) {
            this._paymentmethodservice.Insert(this._PaymentMethodData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "PaymentMethod");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "PaymentMethod");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            this._paymentmethodservice.Update(this._PaymentMethodData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "PaymentMethod");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "PaymentMethod");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
    }
    Delete() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete [' + this._PaymentMethodData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._paymentmethodservice.Delete(this._PaymentMethodData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "PaymentMethod");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "PaymentMethod");
                    }
                }, (error) => {
                    this._spinner.hide();
                }, () => {
                    this._spinner.hide();
                });

            }
        });
    }
}