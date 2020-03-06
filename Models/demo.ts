import * as FilterModel from './FilterModel';
import {Node} from './FilterModel';

export default function Demo() {

  let filterable = [
    {prop1: 23, prop2: 'tmp', prop3: 'etc'},
    {prop1: 10, prop2: 'test', prop3: 'etc'},
    {prop1: 140, prop2: 'test', prop3: 'etc'},
    {prop1: 2, prop2: 'tmp', prop3: 'etc'},
  ];


  const filterModelBuilder = new FilterModel.FilerModelBuilder();


  const filterModel = filterModelBuilder.setGreatherTHanExpression('prop1', 1, FilterModel.cross).setSmallerThanExpression('prop1', 100, FilterModel.cross)
    .setEqualExpression('prop2', 'test', FilterModel.cross).build();

  console.log('Not Filtered...', filterable);

  filterable = FilterModel.inorderTraverse(filterModel.tree, filterable);

  console.log('Filtered...', filterable);


}
