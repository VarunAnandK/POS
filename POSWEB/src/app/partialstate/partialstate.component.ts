import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig, SelectItem } from 'primeng/api';
import { state } from 'src/Model/state';
import { StateService } from 'src/Service/state.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/Service/country.service';

@Component({
    templateUrl: './partialstate.component.html',
    providers: [DialogService]
})
export class PartialState implements OnInit {
    _StateData: state;
    _StateForm: FormGroup;
    _countrydropdown: SelectItem[];
    _ValidationState: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _stateservice: StateService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
        private _countryservice: CountryService
    ) {
        this._StateData = this._config.data;
    }
    ngOnInit() {
        this.PopulateCountryDropdown();
        this._StateForm = this._formbuilder.group({
            name: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required),
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
            if (this._StateData.id == 0)
                this._StateData.country_id = Id;
            this._StateForm.patchValue(this._StateData);
        });
    }

    CreateOrUpdate() {
        this._spinner.show();
        this._ValidationState = true;
        if (this._StateData.id == 0) {
            this._stateservice.Insert(this._StateData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "State");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "State");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            this._stateservice.Update(this._StateData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "State");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "State");
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
            text: 'You want to delete [' + this._StateData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._stateservice.Delete(this._StateData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "State");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "State");
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