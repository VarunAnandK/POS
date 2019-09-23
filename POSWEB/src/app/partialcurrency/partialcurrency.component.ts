import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig, SelectItem } from 'primeng/api';
import { currency } from 'src/Model/currency';
import { CurrencyService } from 'src/Service/currency.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/Service/country.service';

@Component({
    templateUrl: './partialcurrency.component.html',
    providers: [DialogService]
})
export class PartialCurrency implements OnInit {
    _CurrencyData: currency;
    _CurrencyForm: FormGroup;
    _countrydropdown: SelectItem[];
    _ValidationState: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _currencyservice: CurrencyService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
        private _countryservice: CountryService
    ) {
        this._CurrencyData = this._config.data;
    }
    ngOnInit() {
        this.PopulateCountryDropdown();
        this._CurrencyForm = this._formbuilder.group({
            name: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
            symbol: new FormControl('', Validators.required),
            country_id: new FormControl('', [Validators.required, Validators.min(1)]),
        });
    }

    PopulateCountryDropdown() {
        let Id = 0;
        this._countrydropdown = [];
        this._countryservice.GetAll().subscribe((res) => {
            res.forEach(element => {
                this._countrydropdown.push({ label: element.name, value: element.id });
                if (Id == 0) {
                    Id = element.id;
                }
            });
        }, (error) => {
        }, () => {
            if (this._CurrencyData.id == 0)
                this._CurrencyData.country_id = Id;
            this._CurrencyForm.patchValue(this._CurrencyData);
        });
    }

    CreateOrUpdate() {
        
        this._spinner.show();
        if (this._CurrencyData.id == 0) {
            this._currencyservice.Insert(this._CurrencyData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "Currency");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "Currency");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            this._currencyservice.Update(this._CurrencyData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "Currency");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "Currency");
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
            text: 'You want to delete [' + this._CurrencyData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._currencyservice.Delete(this._CurrencyData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "Currency");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "Currency");
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