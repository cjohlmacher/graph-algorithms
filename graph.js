class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    };
  };

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  };

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let adj of vertex.adjacent) {
      this.removeEdge(adj,vertex);
    };
    this.nodes.delete(vertex);
  };

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let visitedValues = [];
    let visited = new Set();
    let stack = [start];
    while (stack.length > 0) {
      let node = stack.shift();
      visited.add(node);
      visitedValues.push(node.value);
      for (let adj of node.adjacent) {
        if (!visited.has(adj)) {
          visited.add(adj);
          stack.unshift(adj);
        }
      }
    }
    return visitedValues;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let visited = new Set();
    let visitedValues = [];
    let queue = [start];
    while (queue.length > 0) {
      visited.add(queue[0]);
      visitedValues.push(queue[0].value)
      for (let node of queue[0].adjacent) {
        if (!visited.has(node)) {
          queue.push(node);
          visited.add(node);
        } 
      };
      queue.shift();
    };
    return visitedValues
  }
}

module.exports = {Graph, Node}