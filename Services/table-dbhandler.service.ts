import {Injectable} from '@angular/core';
import {Item} from '../Models/ItemModel';
import {ServerWorkerService} from './server-worker.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {TableModel} from '../Models/TableModel';


@Injectable({
  providedIn: 'root'
})
export class TableDBHandlerService {

  tableModel: TableModel;
  currentItemsChanges$: Subject<Item[]> = new BehaviorSubject([{Id: 1, name: 'init', category: 'init', price: 0, date: 0, count: 0, }]);
  categoryChange$: Subject<string[]> = new BehaviorSubject(['']);

  constructor(private SWService: ServerWorkerService) {
    this.initializeModel();
  }

  initializeModel() {
    this.SWService.getTableData().subscribe((tData) => {
      this.tableModel = new TableModel(tData.categories, tData.items, tData.tableColumns);
      this.currentItemsChanges$.next(this.tableModel.currentItems);
      this.categoryChange$.next(this.tableModel.categories);
    });

  }




  getModelItems$() {
    return this.currentItemsChanges$;
  }

  getColumnTitles() {
    return this.categoryChange$;
  }


}
