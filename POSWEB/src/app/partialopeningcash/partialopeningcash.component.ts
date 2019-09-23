import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/Service/order.service';
import { HelperModel } from 'src/Model/Helper-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-partialopeningcash',
  templateUrl: './partialopeningcash.component.html',
  styleUrls: ['./partialopeningcash.component.css']
})
export class PartialopeningcashComponent implements OnInit {
  _openingcash: number;
  _OpeningCashForm: FormGroup;

  constructor(
    public _ref: DynamicDialogRef,
    public _config: DynamicDialogConfig,
    private _formbuilder: FormBuilder,
    public _orderservice: OrderService,
    public _helper: HelperModel,
    private _toastrservice: ToastrService,
  ) {
    this._openingcash = this._config.data;
  }

  ngOnInit() {
    this._OpeningCashForm = this._formbuilder.group({
      _openingcash: new FormControl('', Validators.required),
    });
  }

  SaveOpeningCash() {
    this._ref.close({ "status": true, "OpeningCash": this._openingcash });
  }

}
