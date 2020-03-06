import {Component, OnInit} from '@angular/core';
import {TableDBHandlerService} from '../../Services/table-dbhandler.service';
import * as FilterModel from '../../Models/FilterModel';
import {cross, Equal, GreaterThan, join, Node, SmallerThan} from '../../Models/FilterModel';
import {Item} from '../../Models/ItemModel';
import {FilterCmptModel} from '../../Models/FilterComponentModel';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
// FilterModel contains all data about filter Binary tree
  filterModel: FilterModel.FilterModel;
  filterModelBuilder: FilterModel.FilerModelBuilder;
// filterComponentModel contains all data that is needed to render compinent and that binded with template "inputs" (exm. checkbox data..),
  filterCompinnetModel: FilterCmptModel;

  constructor(private modelService: TableDBHandlerService) {
  }

  ngOnInit() {

    this.filterModelBuilder = new FilterModel.FilerModelBuilder();
    this.filterCompinnetModel = new FilterCmptModel();
    this.modelService.getColumnTitles().subscribe((cats) => {
      this.filterCompinnetModel.categories = cats;
      this.filterCompinnetModel.checkBoxValue = this.filterCompinnetModel.categories.map((cat) => {
        return {[cat]: false};
      });
    });
    this.filterCompinnetModel.priceAt = 0;
    this.filterCompinnetModel.priceTo = 100000;
    this.filterCompinnetModel.selected = 'Select';
  }

  generateExpression() {


    this.filterModelBuilder.setExpression(new GreaterThan('price', this.filterCompinnetModel.priceAt, cross));
    this.filterModelBuilder.setExpression(new SmallerThan('price', this.filterCompinnetModel.priceTo, cross));


    for (const key in this.filterCompinnetModel.checkBoxValue) {
      if (this.filterCompinnetModel.checkBoxValue[key] === true) {
        this.filterModelBuilder.setExpression(new Equal('category', key, join));
      }
    }

    this.filterModel = this.filterModelBuilder.build();
  }


  filterAction() {
    this.generateExpression();
    this.filterModelBuilder.reset();

    this.modelService.currentItemsChanges$.next(this.inorderTraverse(this.filterModel.tree, this.modelService.tableModel.allItems));

  }

  inorderTraverse(current: Node, list: Item[]) {

    if (current.Left === null) {
      list = list.filter((item) => {
          return current.expression.result(item);
        }
      );
      return list;
    }

    return current.method(this.inorderTraverse(current.Left, list), this.inorderTraverse(current.Right, list));


  }

  show() {
    this.filterCompinnetModel.showComponent = !this.filterCompinnetModel.showComponent;
  }

}
