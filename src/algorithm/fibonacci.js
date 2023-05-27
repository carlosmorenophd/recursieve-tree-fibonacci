import dataTree from "data-tree";
import { uid } from "uid";

const useFibonacci = () => {
  let treeFibonacci = [];
  const parent = uid();
  let N;

  const fibonacci = (n) => {
    N = n;
    return fibonacciImplementation({ n, parentId: parent });
  }

  const fibonacciImplementation = ({ n, parentId }) => {
    const tree = { parent: parentId, n, id: uid() };
    treeFibonacci.push(tree);
    if (n <= 1) {
      return n;
    } else {
      return (
        fibonacciImplementation({ n: n - 1, parentId: tree.id }) +
        fibonacciImplementation({ n: n - 2, parentId: tree.id })
      );
    }
  }

  const getTree = () => {
    if (treeFibonacci.length > 0){
      return getTreeImplementation();
    }else{
      throw new Error('The fibonacci function must be called before getTree function!');
    }
  };

  const getTreeImplementation = () => {
    let nowParent = parent;
    let continueTree = true;
    let panicButton = 0;
    let dataTreeFibonacci = dataTree.create();
    let finishAllNodes = 1;
    let parentCollectors = [];
    const nOfFibonacci = N;
    while (continueTree) {
      const nowParentConst = nowParent;
      const children = treeFibonacci.filter((t) => t.parent === nowParentConst);
      children.forEach((child) => {
        parentCollectors.push(child.id);
        if (child.n === nOfFibonacci) {
          dataTreeFibonacci.insert({
            key: child.id,
            values: {
              n: child.n,
              type: "Parent",
            },
          });
        } else {
          dataTreeFibonacci.insertTo((data) => data.key === nowParentConst, {
            key: child.id,
            values: {
              n: child.n,
              type: "Child",
            },
          });
        }
      });
      finishAllNodes = finishAllNodes + children.length;
      nowParent = parentCollectors.pop();
      if (finishAllNodes === 0) continueTree = false;
      finishAllNodes--;

      // Panic button to prevent infinite loop only on dev mode
      if (panicButton > 100) {
        console.warn("Panic button activate");
        continueTree = false;
      } else {
        panicButton++;
      }
    }
    return dataTreeFibonacci.export((data) => {
      return {
        name: `${data.values.n}`,
        attributes: {
          tag: `${data.values.type} - ${data.values.n}`,
        },
      };
    });
  };

  return {
    fibonacci,
    getTree,
  };
};

export default useFibonacci;
