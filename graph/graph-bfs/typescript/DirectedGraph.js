"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Represents a directed graph, using a node adjacency list.
// K: The type of the object identifying a node (e.g., number, string), which also is the key into the dictionary.
var DirectedGraph = /** @class */ (function () {
    function DirectedGraph() {
    }
    // Creates the graph from a list of edges (node pairs).
    DirectedGraph.prototype.create = function (edgeList) {
        this.graph = {};
        for (var _i = 0, edgeList_1 = edgeList; _i < edgeList_1.length; _i++) {
            var edge = edgeList_1[_i];
            // Append the child to the node's growing list of children.
            if (this.graph[edge[0]]) {
                this.graph[edge[0]].push(edge[1]);
            }
            else {
                this.graph[edge[0]] = [edge[1]];
            }
            // A node that is reachable, but has no children, will never appear as node1, so will never be key in self.graph, unless we make sure to include it, as here.
            // Add the child as a key, with no destination yet, in case this child never has edges/children from it.
            if (this.graph[edge[1]] == null) {
                this.graph[edge[1]] = [];
            }
            //console.log(`${edge[0]}: ${this.graph[edge[0]]}`);
        }
        // Sort the children of each node, just for standardization.
        for (var node in this.graph) {
            this.graph[node].sort();
        }
    };
    // Create a string representation of the graph, for diagnostic display.
    DirectedGraph.prototype.dump = function () {
        var s = "";
        for (var node in this.graph) {
            s += node + ": " + this.graph[node].join(" ") + "\n";
        }
        return s;
    };
    DirectedGraph.prototype.breadth_first_search = function (start, end) {
        var traversal = [];
        // Remember if we reached a node, using a dictionary, which is more flexible.
        var visited = {};
        var to_visit = [];
        to_visit.push(start);
        visited[start] = true;
        traversal.push(start);
        while (to_visit.length > 0) {
            var node = to_visit.shift();
            for (var _i = 0, _a = this.graph[node]; _i < _a.length; _i++) { // Note: of, not in.
                var child = _a[_i];
                // console.log(`${node} - ${child} - ${this.graph[node]} - ${to_visit}`);
                if (visited[child] == null) {
                    to_visit.push(child);
                    visited[child] = true;
                    traversal.push(child);
                    // Check if we reached the target and return if so.
                    if (end != null && child == end) {
                        return traversal;
                    }
                }
            }
        }
        return traversal;
    };
    return DirectedGraph;
}());
exports.default = DirectedGraph;
// let g = new DirectedGraph();
// let data: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [0, 0], [2, 0], [3, 1], [1, 4], [3, 4], [4, 0], [1, 5]];
// g.create(data);
// console.log(g.dump());
// let traversal = g.breadth_first_search(2, null);
// let s = `${traversal.join(" ")}`;
// console.log(s);
