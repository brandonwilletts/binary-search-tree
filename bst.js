const { mergeSort } = require("./mergesort.js");

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const processedArray = mergeSort(this.removeDuplicates(array));
    this.root = this.buildTree(processedArray, 0, processedArray.length - 1);
  }

  removeDuplicates(array) {
    let uniqueArray = [];
    array.forEach((element) => {
      if (!uniqueArray.includes(element)) {
        uniqueArray.push(element);
      }
    });
    return uniqueArray;
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    } else {
      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);
      node.left = this.buildTree(array, start, mid - 1);
      node.right = this.buildTree(array, mid + 1, end);
      return node;
    }
  }

  insert(value, node = this.root) {
    if (!node) {
      const newNode = new Node(value);
      return newNode;
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  getMinChildValue(node) {
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  deleteItem(value, node = this.root) {
    if (value === node.data) {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left || !node.right) {
        return !node.left ? node.right : node.left;
      } else {
        node.data = this.getMinChildValue(node.right);
        node.right = this.deleteItem(node.data, node.right);
        return node;
      }
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (!node || value === node.data) {
      return node;
    }
    if (value < node.data) {
      return this.find(value, node.left);
    } else if (value > node.data) {
      return this.find(value, node.right);
    }
  }

  levelOrder(callback) {
    let queue = [this.root];
    let output = [];

    while (queue.length > 0) {
      let currentNode = queue[0];
      if (callback) output.push(callback(currentNode.data));
      else output.push(currentNode.data);

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      queue.shift();
    }
    return output;
  }

  inOrder(callback, node = this.root, output = []) {
    if (!node) {
      return null;
    } else {
      this.inOrder(callback, node.left, output);
      if (callback) callback(node);
      output.push(node.data);
      this.inOrder(callback, node.right, output);
    }
    return output;
  }

  preOrder(callback, node = this.root, output = []) {
    if (!node) {
      return null;
    } else {
      if (callback) callback(node);
      output.push(node.data);
      this.preOrder(callback, node.left, output);
      this.preOrder(callback, node.right, output);
    }
    return output;
  }

  postOrder(callback, node = this.root, output = []) {
    if (!node) {
      return null;
    } else {
      this.postOrder(callback, node.left, output);
      this.postOrder(callback, node.right, output);
      if (callback) callback(node);
      output.push(node.data);
    }
    return output;
  }

  height(node = this.root) {
    if (!node) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (leftHeight > rightHeight) return leftHeight + 1;
    else return rightHeight + 1;
  }

  depth(node = this.root, currentNode = this.root) {
    if (node === currentNode) return 0;

    if (node.data < currentNode.data)
      return 1 + this.depth(node, currentNode.left);
    else if (node.data > currentNode.data)
      return 1 + this.depth(node, currentNode.right);
  }

  isBalanced(node = this.root) {
    const heightDifference = Math.abs(
      this.height(node.left) - this.height(node.right)
    );
    return heightDifference <= 1;
  }

  rebalance() {
    const nodes = this.inOrder();
    this.root = this.buildTree(nodes, 0, nodes.length - 1);
  }
}

module.exports = { Tree };
