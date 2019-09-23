import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { business_group } from 'src/Model/business_group';
import { BusinessGroupService } from 'src/Service/businessgroup.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './partialbusinessgroup.component.html',
    providers: [DialogService]
})
export class PartialBusinessGroup implements OnInit {
    _BusinessGroupData: business_group;
    _BusinessGroupForm: FormGroup;
    _ValidationState: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _businessgroupservice: BusinessGroupService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
    ) {
        this._BusinessGroupData = this._config.data;
    }
    ngOnInit() {
        this._BusinessGroupForm = this._formbuilder.group({
            Name: new FormControl('', Validators.required),
            Percentage: new FormControl('', Validators.required),
        });
    }

    CreateOrUpdate() {
        
        this._spinner.show();
        this._ValidationState = true;
        if (this._BusinessGroupData.id == 0) {
            this._businessgroupservice.Insert(this._BusinessGroupData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "Discount Group");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "Discount Group");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            this._businessgroupservice.Update(this._BusinessGroupData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "Discount Group");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "Discount Group");
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
            text: 'You want to delete [' + this._BusinessGroupData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._businessgroupservice.Delete(this._BusinessGroupData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "Discount Group");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "Discount Group");
                    }
                }, (error) => {
                    this._spinner.hide();
                }, () => {
                    this._spinner.hide();
                });

            }
        });
    }

    numberOnly(event): boolean {
        
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            //this._toastrservice.error(event.Message, "Numeric Characters Only");
            return false;
        }
        return true;
    }
}