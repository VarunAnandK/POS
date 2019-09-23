import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig, SelectItem } from 'primeng/api';
import { gst_detail } from 'src/Model/gst_detail';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GSTDetailService } from 'src/Service/gstdetail.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import Swal from 'sweetalert2';
import { GSTCategoryService } from 'src/Service/gstcategory.service';

@Component({
  selector: 'app-partial-gstdetail',
  templateUrl: './partial-gstdetail.component.html',
  styleUrls: ['./partial-gstdetail.component.css'],
  providers: [DialogService]
})
export class PartialGSTDetailComponent implements OnInit {
  _GSTDetailData: gst_detail;
  _GSTDetailForm: FormGroup;
  _categorydropdown: SelectItem[];
  constructor(
    public _ref: DynamicDialogRef,
    public _config: DynamicDialogConfig,
    public _gstdetailservice: GSTDetailService,
    public _gstcategoryservice: GSTCategoryService,
    private _toastrservice: ToastrService,
    private _spinner: NgxSpinnerService,
    private _formbuilder: FormBuilder,
  ) {
    this._GSTDetailData = this._config.data;
  }

  ngOnInit() {
    this._GSTDetailForm = this._formbuilder.group({
      gst_category_id: new FormControl('', [Validators.required, Validators.min(1)]),
      percentage: new FormControl('', Validators.required),
    });
    this.PopulateCategoryDropdown();
  }

  PopulateCategoryDropdown() {
    let Id = 0
    this._categorydropdown = [];
    this._gstcategoryservice.GetAll().subscribe((res) => {
      res.forEach(element => {
        this._categorydropdown.push({ label: element.name, value: element.id });
        if (Id == 0) {
          Id = element.id;
        }
      });

    }, (error) => {
    }, () => {
      if (this._GSTDetailData.id == 0) {
        this._GSTDetailData.gst_category_id = Id;
      }
      this._GSTDetailForm.patchValue(this._GSTDetailData);
    });
  }


  CreateOrUpdate() {
    this._spinner.show();
    if (this._GSTDetailData.id == 0) {
      this._gstdetailservice.Insert(this._GSTDetailData).subscribe((res: ApiReposeModel) => {
        if (res.Type == "S") {
          this._toastrservice.success(res.Message, "GST Detail");
          this._ref.close(true);
        }
        else {
          this._toastrservice.error(res.Message, "GST Detail");
        }
        this._spinner.hide();
      }, (error) => {
        this._spinner.hide();
      });
    }
    else {
      this._gstdetailservice.Update(this._GSTDetailData).subscribe((res: ApiReposeModel) => {
        if (res.Type == "S") {
          this._toastrservice.success(res.Message, "GST Detail");
          this._ref.close(true);
          this._spinner.hide();
        }
        else {
          this._toastrservice.error(res.Message, "GST Detail");
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
      text: 'You want to delete [' + this._GSTDetailData.percentage + ']',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._spinner.show();
        this._gstdetailservice.Delete(this._GSTDetailData.id).subscribe((res: ApiReposeModel) => {
          if (res.Type == "S") {
            this._toastrservice.success(res.Message, "GST Detail");
            this._ref.close(true);
          }
          else {
            this._toastrservice.error(res.Message, "GST Detail");
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
