
const tree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        {
          name: 'child1-1'
        },
        {
          name: 'child1-2'
        }
      ]
    },
    {
      name: 'child2',
      children: [
        {
          name: 'child2-1'
        },
        {
          name: 'child2-2'
        }
      ]
    }
  ]
}



function reversalTree(tree) {
  if (!tree.children || tree.children.length <= 0) return tree;
  tree.children = tree.children.reverse()
  tree.children = tree.children.map(item => {
    return reversalTree(item)
  })


  return tree
}



const processedTree = reversalTree(tree);

console.log(processedTree);
