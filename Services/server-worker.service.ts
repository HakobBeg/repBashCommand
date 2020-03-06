import {Injectable} from '@angular/core';

import {Item} from '../Models/ItemModel';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ServerWorkerService {

  constructor(private db: AngularFireDatabase) {
  }


  getItems() {
    return this.db.list<Item>('/items').valueChanges();
  }

  addItem(newItem: Item) {

    this.db.database.ref('/ID').once('value').then((response) => {
      newItem.Id = response.val();
      this.db.database.ref('/ID').set(newItem.Id + 1);
      return this.db.database.ref('/Items').child(newItem.Id.toString()).set(newItem);
    });
  }

  getTableData() {
    return this.db.object<{items: Item[], categories: string[], tableColumns: string[]}>('/Table').valueChanges();
  }


}
