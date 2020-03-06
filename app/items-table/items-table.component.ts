import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ServerWorkerService} from '../../Services/server-worker.service';
import {MatTable} from '@angular/material';
import {TableDBHandlerService} from '../../Services/table-dbhandler.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.css']
})
export class ItemsTableComponent implements OnInit, OnDestroy {

  deletables: { checked: boolean, id: number }[] = [];
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'count', 'date'];
  dataSource = [];
  loading = true;
  private subscriptions$ = new Array<Subscription>();

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  constructor(private itemsService: ServerWorkerService, private modelService: TableDBHandlerService) {
  }

  checkaction(id: string) {
    this.deletables.forEach((x) => {
      if (x.id === Number(id)) {
        x.checked = !x.checked;
      }
    });


  }


  ngOnInit() {

    this.subscriptions$.push(this.modelService.getModelItems$().subscribe((items) => {
      this.dataSource = items;
      this.loading = false;
      items.forEach(item => this.deletables.push({checked: false, id: item.Id}));
      this.deletables.shift();
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
