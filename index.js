const { Tree } = require("./bst.js");
const { prettyPrint } = require("./prettyprint.js");

function getRandomArray(length = 10) {
  let output = [];
  for (let i = 0; i < length; i++) {
    const value = Math.floor(Math.random() * 100);
    output.push(value);
  }
  return output;
}

const array = getRandomArray(20);
const bst = new Tree(array);

console.log("*** Initial BST ***");
console.log("This BST is balanced: " + bst.isBalanced());
console.log("Level Order: " + bst.levelOrder());
console.log("Pre-Order " + bst.preOrder());
console.log("Post-Order: " + bst.postOrder());
console.log("In-Order: " + bst.inOrder());
console.log("");

console.log("Adding values...");
bst.insert(Math.floor(Math.random() * 1000));
bst.insert(Math.floor(Math.random() * 1000));
bst.insert(Math.floor(Math.random() * 1000));
bst.insert(Math.floor(Math.random() * 1000));
bst.insert(Math.floor(Math.random() * 1000));
console.log("");

console.log("*** Unbalanced BST ***");
console.log("This BST is balanced: " + bst.isBalanced());
console.log("");

console.log("Rebalancing...");
bst.rebalance();
console.log("");

console.log("*** Re-balanced BST ***");
console.log("This BST is balanced: " + bst.isBalanced());
console.log("Level Order: " + bst.levelOrder());
console.log("Pre-Order " + bst.preOrder());
console.log("Post-Order: " + bst.postOrder());
console.log("In-Order: " + bst.inOrder());
