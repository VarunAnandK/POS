import { Component, OnInit } from '@angular/core';
import { city } from 'src/Model/city';
import { CityService } from 'src/Service/city.service';
import { DialogService } from 'primeng/api';
import { PartialCity } from '../partialcity/partialcity.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [DialogService]
})
export class CityComponent implements OnInit {
  _CityList: city[];
  _TableFields: any[];
  _CityData: city;
  constructor(
    private _cityservice: CityService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'country_name', header: 'Country Name' },
      { field: 'state_name', header: 'State Name' },
      { field: 'name', header: 'City' },
      { field: 'code', header: 'Code' },
    ];
    this.GetCityList();
  }

  GetCityList() {
    this._spinner.show();
    this._cityservice.GetAll().subscribe((res) => {
      this._CityList = res;
      this._CityList.forEach(o => {
        o["country_name"] = o.country.name;
        o["state_name"] = o.state.name;
      });
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._CityData = new city();
      const ref = this._dialogservice.open(PartialCity, {
        header: 'City - New',
        width: '50%',
        data: this._CityData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true)
          this.GetCityList();
      });
    }
    else {
      this._spinner.show();
      this._cityservice.GetById(Id).subscribe((res) => {
        this._CityData = res;
        const ref = this._dialogservice.open(PartialCity, {
          header: 'City - Edit',
          width: '50%',
          data: this._CityData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true)
            this.GetCityList();
        });
      }, (error) => {
        this._spinner.hide();
      }, () => {
        this._spinner.hide();
      });
    }
  }
}
