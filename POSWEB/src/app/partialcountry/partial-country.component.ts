import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { country } from 'src/Model/country';
import { CountryService } from 'src/Service/country.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './partialcountry.component.html',
    providers: [DialogService]
})
export class PartialCountry implements OnInit {
    _CountryData: country;
    _CountryForm: FormGroup;
    _ValidationState: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _countryservice: CountryService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
    ) {
        this._CountryData = this._config.data;
    }
    ngOnInit() {
        this._CountryForm = this._formbuilder.group({
            name: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
        });
    }

    CreateOrUpdate() {
        this._spinner.show();
        this._ValidationState = true;
        if (this._CountryData.id == 0) {
            this._countryservice.Insert(this._CountryData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "Country");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "Country");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            this._countryservice.Update(this._CountryData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "Country");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "Country");
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
            text: 'You want to delete [' + this._CountryData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._countryservice.Delete(this._CountryData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "Country");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "Country");
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