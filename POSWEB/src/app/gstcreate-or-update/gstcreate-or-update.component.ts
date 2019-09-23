import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { gst } from 'src/Model/gst';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GSTService } from 'src/Service/gst.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiReposeModel } from 'src/Model/ApiResponse-model';
import { gst_detail } from 'src/Model/gst_detail';
import { GSTDetailService } from 'src/Service/gstdetail.service';
import { PartialGSTDetailComponent } from '../partial-gstdetail/partial-gstdetail.component';
import { DialogService } from 'primeng/api';

@Component({
  selector: 'app-gstcreate-or-update',
  templateUrl: './gstcreate-or-update.component.html',
  styleUrls: ['./gstcreate-or-update.component.css'],
  providers: [DialogService]
})
export class GSTCreateOrUpdateComponent implements OnInit {
  _GstData: gst;
  _GstDetailData: gst_detail;
  _GSTForm: FormGroup;
  _GSTDetailList: gst_detail[];
  _TableDetailFields: any[];
  constructor(
    private _activeRoute: ActivatedRoute,
    private _route: Router,
    private _toastr: ToastrService,
    public _crf: ChangeDetectorRef,
    private _gstservice: GSTService,
    private _gstdetailservice: GSTDetailService,
    private _spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _dialogservice: DialogService,
  ) {
    this._GstData = new gst();
    this._GSTDetailList = new Array<gst_detail>();
    this._GstDetailData = new gst_detail();
  }

  ngOnInit() {
    this._GSTForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    const routeParams = this._activeRoute.snapshot.params;
    this.GetGSTById(routeParams.Id);
    this.GetGSTDetailByGSTId(routeParams.Id);
    this._TableDetailFields = [
      { field: 'category_name', header: 'Category' },
      { field: 'percentage', header: 'Percentage (%)' },
    ];
  }
  GetGSTById(Id: number = 0) {
    this._spinner.show();
    if (Id > 0) {
      this._gstservice.GetById(Id).subscribe((res) => {
        if (res) {
          this._GstData = res;
          this._GSTForm.patchValue(res);
        }
        this._spinner.hide();
      },
        (error) => {
          this._spinner.hide();
        });
    }
    else {
      this._spinner.hide();
    }
  }
  GetGSTDetailByGSTId(Id: number = 0) {
    
    this._spinner.show();
    if (Id > 0) {
      this._gstdetailservice.GetByGstId(Id).subscribe((res) => {
        if (res) {
          this._GSTDetailList = res;
          this._GSTDetailList.forEach(element => {
            element["category_name"] = element.gst_category.name;
          });
        }
        this._spinner.hide();
      },
        (error) => {
          this._spinner.hide();
        });
    }
    else {
      this._spinner.hide();
    }
  }
  InsertOrUpdate() {
    this._spinner.show();
    if (this._GstData.id == 0) {
      this._gstservice.Insert(this._GstData).subscribe((res: ApiReposeModel) => {
        if (res.Type == "S") {
          
          this._route.navigate([`${/GSTCreateOrUpdate/}${res.Id}`])
          this.Refresh(res.Id);
          this._toastr.success(res.Message, "GST");
        }
        else {
          this._toastr.error(res.Message, "GST");
        }
        this._spinner.hide();
      }, (error) => {
        this._spinner.hide();
      });
    }
    else {
      this._gstservice.Update(this._GstData).subscribe((res: ApiReposeModel) => {
        if (res.Type == "S") {
          this._route.navigate([`${/GSTCreateOrUpdate/}${this._GstData.id}`])
          this._toastr.success(res.Message, "GST");
          this.Refresh(this._GstData.id);
        }
        else {
          this._toastr.error(res.Message, "GST");
        }
        this._spinner.hide();
      }, (error) => {
        this._spinner.hide();
      });
    }
  }
  EditDetail(Id: number = 0) {
    if (Id == 0) {
      this._GstDetailData = new gst_detail();
      this._GstDetailData.gst_id = this._GstData.id;
      const ref = this._dialogservice.open(PartialGSTDetailComponent, {
        header: 'GST Detail - New',
        width: '50%',
        data: this._GstDetailData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true)
          this.GetGSTDetailByGSTId(this._GstData.id);
      });
    }
    else {
      this._spinner.show();
      this._gstdetailservice.GetById(Id).subscribe((res) => {
        this._GstDetailData = res;
        const ref = this._dialogservice.open(PartialGSTDetailComponent, {
          header: 'GST Detail - Edit',
          width: '50%',
          data: this._GstDetailData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true)
            this.GetGSTDetailByGSTId(this._GstData.id);
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
  Refresh(Id: number = 0) {
    this.GetGSTById(Id);
    this.GetGSTDetailByGSTId(Id);
  }
}
