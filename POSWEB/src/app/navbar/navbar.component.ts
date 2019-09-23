import { Component, OnInit } from '@angular/core';
import { HelperModel } from 'src/Model/Helper-model';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(public _helper : HelperModel) { }
  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
     $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }

}
