import { Component, OnInit } from '@angular/core';
import { country } from 'src/Model/country';
import { CountryService } from 'src/Service/country.service';
import { DialogService, SelectItem } from 'primeng/api';
import { PartialCountry } from '../partialcountry/partial-country.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [DialogService]
})
export class CountryComponent implements OnInit {
  _CountryList: country[];
  _TableFields: any[];
  _CountryData: country;
  constructor(
    private _countryservice: CountryService,
    private _dialogservice: DialogService,
    private _spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this._TableFields = [
      { field: 'name', header: 'Country Name' },
      { field: 'code', header: 'Code' }
    ];
    this.GetCountryList();
  }

  GetCountryList() {
    this._spinner.show();
    this._countryservice.GetAll().subscribe((res) => {
      this._CountryList = res;
    }, (error) => {
      this._spinner.hide();
    }, () => {
      this._spinner.hide();
    });
  }
  Edit(Id: number = 0) {
    if (Id == 0) {
      this._CountryData = new country();
      const ref = this._dialogservice.open(PartialCountry, {
        header: 'Country - New',
        width: '50%',
        data: this._CountryData,
        contentStyle: { "overflow": "auto" }
      });
      ref.onClose.subscribe((res) => {
        if (res == true) {
          this.GetCountryList();
        }
      });
    }
    else {
      this._spinner.show();
      this._countryservice.GetById(Id).subscribe((res) => {
        this._CountryData = res;
        const ref = this._dialogservice.open(PartialCountry, {
          header: 'Country - Edit',
          width: '50%',
          data: this._CountryData,
          contentStyle: { "overflow": "auto" }
        });
        ref.onClose.subscribe((res) => {
          if (res == true) {
            this.GetCountryList();
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
