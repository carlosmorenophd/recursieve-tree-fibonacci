import { uid } from "uid";

const useFibonacci = () => {
  let treeFibonacci = [];
  const parent = uid();

  function fibonacci(n, parent) {
    const tree = { parent, n, id: uid() };
    treeFibonacci.push(tree);
    if (n <= 1) {
      return n;
    } else {
      return fibonacci(n - 1, tree.id) + fibonacci(n - 2, tree.id);
    }
  }

  const getTree = () => {
    const ids = [...new Set(treeFibonacci.map((t) => t.parent))].filter(f=> f !== parent);
    let nowParent = parent;
    ids.forEach(id => {
      
    });

  };

  return {
    parent,
    treeFibonacci,
    fibonacci,
    getTree,
  };
};

export default useFibonacci;
