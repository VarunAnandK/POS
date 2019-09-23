import { Component, OnInit } from '@angular/core';
import { HelperModel } from 'src/Model/Helper-model';

@Component({
  selector: 'app-pos-navbar',
  templateUrl: './pos-navbar.component.html',
  styleUrls: ['./pos-navbar.component.css']
})
export class PosNavbarComponent implements OnInit {

  constructor(public _helper : HelperModel) { }

  ngOnInit() {
  }

}
