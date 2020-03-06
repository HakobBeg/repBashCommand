import { Component, OnInit } from '@angular/core';
import Demo from '../../Models/demo';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.css']
})
export class ContentBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(Demo());
  }

}
