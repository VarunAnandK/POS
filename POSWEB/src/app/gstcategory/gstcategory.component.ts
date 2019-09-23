import { Component, OnInit } from '@angular/core';
import { gst_category } from 'src/Model/gst_category';
import { GSTCategoryService } from 'src/Service/gstcategory.service';
import { DialogService } from 'primeng/api';
import { PartialGSTCategory } from '../partialgstcategory/partialgstcategory.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-gstcategory',
  templateUrl: './gstcategory.component.html',
  styleUrls: ['./gstcategory.component.css'],
  providers: [DialogService]
})
export class GSTCategoryComponent implements OnInit {
  _GSTCategoryList: gst_category[];
  _TableFields: any[];
  _GSTCategoryData: gst_category;
  constructor(
    private _gstcategoryservice: GSTCategoryService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'type', header: 'Type' },
      { field: 'name', header: 'GST Category Name' }
    ];
    this.GetGSTCategoryList();
  }

  GetGSTCategoryList() {
    this._spinner.show();
    this._gstcategoryservice.GetAll().subscribe((res) => {
      this._GSTCategoryList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._GSTCategoryData = new gst_category();
      const ref = this._dialogservice.open(PartialGSTCategory, {
        header: 'GST Category - New',
        width: '50%',
        data: this._GSTCategoryData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true)
          this.GetGSTCategoryList();
      });
    }
    else {
      this._spinner.show();
      this._gstcategoryservice.GetById(Id).subscribe((res) => {
        this._GSTCategoryData = res;
        const ref = this._dialogservice.open(PartialGSTCategory, {
          header: 'GST Category - Edit',
          width: '50%',
          data: this._GSTCategoryData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true)
            this.GetGSTCategoryList();
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
}
