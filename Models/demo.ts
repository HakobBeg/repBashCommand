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

  const expression1 = new FilterModel.SmallerThan('prop1', 100, FilterModel.cross);
  const expression2 = new FilterModel.GreaterThan('prop1', 1, FilterModel.cross);
  const expression3 = new FilterModel.Equal('prop2', 'test', FilterModel.cross);


  const filterModel = filterModelBuilder.setExpression(expression1).setExpression(expression2).setExpression(expression3).build();

  console.log('Not Filtered...', filterable);

  filterable = inorderTraverse(filterModel.tree, filterable);

  console.log('Filtered...', filterable);


  function inorderTraverse(current: Node, list) {

    if (current.Left === null) {
      list = list.filter((item) => {
          return current.expression.result(item);
        }
      );
      return list;
    }

    return current.method(inorderTraverse(current.Left, list), inorderTraverse(current.Right, list));


  }

}
