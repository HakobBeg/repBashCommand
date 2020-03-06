import {Item} from './ItemModel';


export function inorderTraverse(current: Node, list) {

  if (current.Left === null) {
    list = list.filter((item) => {
        return current.expression.result(item);
      }
    );
    return list;
  }

  return current.method(inorderTraverse(current.Left, list), inorderTraverse(current.Right, list));


}

// standart, simple Node for BinaryTree

export class Node {
  Left: Node;
  Right: Node;
  expression: BooleanExpression;
  method: any;

  constructor(lft: Node, rght: Node, exp: BooleanExpression, meth: object) {
    this.expression = exp;
    this.Left = lft;
    this.Right = rght;
    this.method = meth;
  }
}


export class NodeBuilder {
  Left: Node = null;
  Right: Node = null;
  expression: BooleanExpression = null;
  method?: object = null;

  setLeft(lft: Node) {
    this.Left = lft;
    return this;
  }

  setRight(rght: Node) {
    this.Right = rght;
    return this;
  }

  setExpression(exp: BooleanExpression) {
    this.expression = exp;
    return this;
  }

  setMethod(meth: object) {
    this.method = meth;
    return this;
  }

  build() {
    return new Node(this.Left, this.Right, this.expression, this.method);
  }

}

// functions that join or croos to arrays

export function join(list1: Item[], list2: Item[]) {
  return Array.from(new Set(list1.concat(list2)));
}


export function cross(list1: Item[], list2: Item[]) {
  return list1.filter(element => list2.includes(element));
}


// Expression class Implementation
// Boolean expression stored as objects
// -- linkedMethod(&,||)

export class BooleanExpression {
  leftOpProp: string;
  rightOp: number | string;
  linkMethod: object;
  result: any;

  constructor(lft: string, rght: number | string, linkMeth: object, res: object) {
    this.leftOpProp = lft;
    this.rightOp = rght;
    this.linkMethod = linkMeth;
    this.result = res;
  }
}


export class GreaterThan extends BooleanExpression {
  constructor(lft: string, rght: number | string, linkMeth: object) {
    super(lft, rght, linkMeth, (element: object) => {
      return element[this.leftOpProp] > this.rightOp;
    });
  }
}


export class SmallerThan extends BooleanExpression {
  constructor(lft: string, rght: number | string, linkMeth: object) {
    super(lft, rght, linkMeth, (element) => {
      return element[this.leftOpProp] < this.rightOp;
    });
  }
}


export class Equal extends BooleanExpression {
  constructor(lft: string, rght: number | string, linkMeth: object) {
    super(lft, rght, linkMeth, (element) => {
      // tslint:disable-next-line:triple-equals
      return element[this.leftOpProp] == this.rightOp;
    });
  }
}


// Filter Model with Filter model builder

export class FilerModelBuilder {
  expressions: BooleanExpression[] = [];

  setExpression(leftOpProp, rightOp, method, expType) {

    if (expType === 'g') {
      this.expressions.push(new GreaterThan(leftOpProp, rightOp, method));
    } else if (expType === 's') {
      this.expressions.push(new SmallerThan(leftOpProp, rightOp, method));
    } else if (expType === 'e') {
      this.expressions.push(new Equal(leftOpProp, rightOp, method));
    } else {
      alert('False Expression Typre!');
    }

    return this;
  }

  setGreatherTHanExpression(leftOpProp, rightOp, method) {
    this.expressions.push(new GreaterThan(leftOpProp, rightOp, method));
    return this;
  }

  setSmallerThanExpression(leftOpProp, rightOp, method) {
    this.expressions.push(new SmallerThan(leftOpProp, rightOp, method));
    return this;
  }

  setEqualExpression(leftOpProp, rightOp, method) {
    this.expressions.push(new Equal(leftOpProp, rightOp, method));
    return this;
  }

  reset() {
    this.expressions.length = 0;
  }

  build() {
    return new FilterModel(this.expressions);
  }

}

export class FilterModel {
  tree: Node = null;

  constructor(expressions: BooleanExpression[]) {
    expressions.forEach(exp => this.addExpression(exp));
  }


  addExpression(exp: BooleanExpression) {
    if (this.tree === null) {
      this.tree = new NodeBuilder().setExpression(exp).build();
    } else {
      const tmp = (new NodeBuilder().setMethod(exp.linkMethod).setLeft(this.tree).setRight(new NodeBuilder().setExpression(exp).build())).build();
      this.tree = tmp;
      this.tree.method = tmp.method;
    }
  }
}
