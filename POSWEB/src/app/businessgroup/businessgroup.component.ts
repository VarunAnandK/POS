import { Component, OnInit } from '@angular/core';
import { business_group } from 'src/Model/business_group';
import { BusinessGroupService } from 'src/Service/businessgroup.service';
import { DialogService, SelectItem } from 'primeng/api';
import { PartialBusinessGroup } from '../partialbusinessgroup/partialbusinessgroup.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-businessgroup',
  templateUrl: './businessgroup.component.html',
  styleUrls: ['./businessgroup.component.css'],
  providers: [DialogService]
})
export class BusinessGroupComponent implements OnInit {
  _BusinessGroupList: business_group[];
  _TableFields: any[];
  _BusinessGroupData: business_group;
  constructor(
    private _businessgroupservice: BusinessGroupService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'name', header: 'Discount Group' },
      { field: 'percentage', header: 'Percentage (%)' }
    ];
    this.GetBusinessGroupList();
  }

  GetBusinessGroupList() {
    this._spinner.show();
    this._businessgroupservice.GetAll().subscribe((res) => {
      this._BusinessGroupList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._BusinessGroupData = new business_group();
      const ref = this._dialogservice.open(PartialBusinessGroup, {
        header: 'Discount Group',
        width: '50%',
        data: this._BusinessGroupData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if(res == true)
        this.GetBusinessGroupList();
      });
    }
    else {
      this._spinner.show();
      this._businessgroupservice.GetById(Id).subscribe((res) => {
        this._BusinessGroupData = res;
        const ref = this._dialogservice.open(PartialBusinessGroup, {
          header: 'Discount Group',
          width: '50%',
          data: this._BusinessGroupData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if(res == true)
          this.GetBusinessGroupList();
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
}
