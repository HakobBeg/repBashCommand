import {Component, OnInit} from '@angular/core';
import {TableDBHandlerService} from '../../Services/table-dbhandler.service';
import * as FilterModel from '../../Models/FilterModel';
import {cross, join} from '../../Models/FilterModel';
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


    this.filterModelBuilder.setGreatherTHanExpression('price', this.filterCompinnetModel.priceAt, cross);
    this.filterModelBuilder.setSmallerThanExpression('price', this.filterCompinnetModel.priceTo, cross);


    for (const key in this.filterCompinnetModel.checkBoxValue) {
      if (this.filterCompinnetModel.checkBoxValue[key] === true) {
        this.filterModelBuilder.setEqualExpression('category', key, join);
      }
    }

    this.filterModel = this.filterModelBuilder.build();
  }


  filterAction() {
    this.generateExpression();
    this.filterModelBuilder.reset();

    this.modelService.currentItemsChanges$.next(FilterModel.inorderTraverse(this.filterModel.tree, this.modelService.tableModel.allItems));

  }



  show() {
    this.filterCompinnetModel.showComponent = !this.filterCompinnetModel.showComponent;
  }

}
