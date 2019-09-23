import { Component, OnInit } from '@angular/core';
import { business_category } from 'src/Model/business_category';
import { BusinessCategoryService } from 'src/Service/businesscategory.service';
import { DialogService } from 'primeng/api';
import { PartialBusinessCategory } from '../partialbusinesscategory/partialbusinesscategory.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-businesscategory',
  templateUrl: './businesscategory.component.html',
  styleUrls: ['./businesscategory.component.css'],
  providers: [DialogService]
})
export class BusinessCategoryComponent implements OnInit {
  _BusinessCategoryList: business_category[];
  _TableFields: any[];
  _BusinessCategoryData: business_category;
  constructor(
    private _businesscategoryservice: BusinessCategoryService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'name', header: 'Business Category' },
      { field: 'code', header: 'Code' }
    ];
    this.GetBusinessCategoryList();
  }

  GetBusinessCategoryList() {
    this._spinner.show();
    this._businesscategoryservice.GetAll().subscribe((res) => {
      this._BusinessCategoryList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._BusinessCategoryData = new business_category();
      const ref = this._dialogservice.open(PartialBusinessCategory, {
        header: 'Business Category - New',
        width: '50%',
        data: this._BusinessCategoryData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true) {
          this.GetBusinessCategoryList();
        }
      });
    }
    else {
      this._spinner.show();
      this._businesscategoryservice.GetById(Id).subscribe((res) => {
        this._BusinessCategoryData = res;
        const ref = this._dialogservice.open(PartialBusinessCategory, {
          header: 'Business Category - Edit',
          width: '50%',
          data: this._BusinessCategoryData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true) {
            this.GetBusinessCategoryList();
          }
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
}
