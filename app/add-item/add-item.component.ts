import {Component, OnInit} from '@angular/core';
import {ServerWorkerService} from '../../Services/server-worker.service';
import {Item} from '../../Models/ItemModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  newItem: Item = {name: '', category: '', price: null, count: null, date: null, Id: null};
  categories = ['shoese', 'food', 'technique', 'tools', 'wear', 'electronics'];

  constructor(private itemsService: ServerWorkerService, private route: Router) {
    this.newItem.name = '';
    this.newItem.category = '';
    this.newItem.Id = 1000;
  }

  onAddButton() {
    this.newItem.date = Date.now();
    this.itemsService.addItem(this.newItem);
  }

  onResetField() {
    this.newItem = {name: '', category: '', price: null, count: null, date: null, Id: null};
  }

  visualisateModel() {
      this.route.navigate(['/visual']);
  }

  ngOnInit() {
  }

}
