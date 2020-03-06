import {Item} from './ItemModel';

export class TableModel {
  categories: string[];
  allItems: Item[];
  currentItems: Item[];
  tableColumns: string[];

  constructor(ct, items, tc) {
    this.categories = ct;
    this.tableColumns = tc;
    this.currentItems = items;
    this.allItems = items;
  }
}
