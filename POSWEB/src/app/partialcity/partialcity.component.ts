import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig, SelectItem } from 'primeng/api';
import { city } from 'src/Model/city';
import { CityService } from 'src/Service/city.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/Service/country.service';
import { StateService } from 'src/Service/state.service';
import { debug } from 'util';

@Component({
    templateUrl: './partialcity.component.html',
    providers: [DialogService]
})
export class PartialCity implements OnInit {
    _CityData: city;
    _CityForm: FormGroup;
    _countrydropdown: SelectItem[];
    _statedropdown: SelectItem[];
    _ValidationState: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _cityservice: CityService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
        private _countryservice: CountryService,
        private _stateservice: StateService
    ) {
        this._CityData = this._config.data;
    }
    ngOnInit() {
        this.PopulateCountryDropdown();
        this._CityForm = this._formbuilder.group({
            name: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
            country_id: new FormControl('', [Validators.required, Validators.min(1)]),
            state_id: new FormControl('', [Validators.required, Validators.min(1)]),
        });
    }
    PopulateCountryDropdown() {
        this._spinner.show();
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
            this._spinner.hide();
        }, () => {
            if (this._CityData.id == 0) {
                this._CityData.country_id = Id;
                this.PopulateStateDropdown(Id);
            }
            else {
                this.PopulateStateDropdown(this._CityData.country_id);
            }
            this._CityForm.patchValue(this._CityData);
        });
    }

    PopulateStateDropdown(CountryId: number) {
        this._spinner.show();
        let Id = 0;
        this._statedropdown = [];
        this._stateservice.GetAll().subscribe((res) => {
            res.filter((t) => t.country_id === CountryId).forEach(element => {
                this._statedropdown.push({ label: element.name, value: element.id });
                if (Id == 0) {
                    Id = element.id;
                }
            });
        }, (error) => {
            this._spinner.hide();
        }, () => {
            if (this._CityData.id == 0)
                this._CityData.state_id = Id;
            this._CityForm.patchValue(this._CityData);
            this._spinner.hide();
        });
    }

    GetState(value) {
        this.PopulateStateDropdown(value);
    }

    CreateOrUpdate() {
        this._spinner.show();
        this._ValidationState = true;
        if (this._CityData.id == 0) {
            this._cityservice.Insert(this._CityData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "City");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "City");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            this._cityservice.Update(this._CityData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "City");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "City");
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
            text: 'You want to delete [' + this._CityData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._cityservice.Delete(this._CityData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "City");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "City");
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