import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig, SelectItem } from 'primeng/api';
import { gst_category } from 'src/Model/gst_category';
import { GSTCategoryService } from 'src/Service/gstcategory.service';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './partialgstcategory.component.html',
    providers: [DialogService]
})
export class PartialGSTCategory implements OnInit {
    _GSTCategoryData: gst_category;
    _GSTCategoryForm: FormGroup;
    _typedropdown: SelectItem[];
    _ValidationState: boolean;
    constructor(
        public _ref: DynamicDialogRef,
        public _config: DynamicDialogConfig,
        public _gstcategoryservice: GSTCategoryService,
        private _toastrservice: ToastrService,
        private _spinner: NgxSpinnerService,
        private _formbuilder: FormBuilder,
    ) {
        this._GSTCategoryData = this._config.data;
    }
    ngOnInit() {
        this.PopulateTypeDropdown();
        this._GSTCategoryForm = this._formbuilder.group({
            name: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
        });
    }

    PopulateTypeDropdown() {
        this._typedropdown = [];
        this._typedropdown.push({ label: "Local State", value: "L" });
        this._typedropdown.push({ label: "Other State", value: "O" });
        if (this._GSTCategoryData.id == 0)
            this._GSTCategoryData.type = "L";
    }

    CreateOrUpdate() {
        this._spinner.show();
        this._ValidationState = true;
        if (this._GSTCategoryData.id == 0) {
            this._gstcategoryservice.Insert(this._GSTCategoryData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "GST Category");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "GST Category");
                }
                this._spinner.hide();
            }, (error) => {
                this._spinner.hide();
            });
        }
        else {
            this._gstcategoryservice.Update(this._GSTCategoryData).subscribe((res: ApiReposeModel) => {
                if (res.Type == "S") {
                    this._toastrservice.success(res.Message, "GSTCategory");
                    this._ref.close(true);
                }
                else {
                    this._toastrservice.error(res.Message, "GSTCategory");
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
            text: 'You want to delete [' + this._GSTCategoryData.name + ']',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this._spinner.show();
                this._gstcategoryservice.Delete(this._GSTCategoryData.id).subscribe((res: ApiReposeModel) => {
                    if (res.Type == "S") {
                        this._toastrservice.success(res.Message, "GSTCategory");
                        this._ref.close(true);
                    }
                    else {
                        this._toastrservice.error(res.Message, "GSTCategory");
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