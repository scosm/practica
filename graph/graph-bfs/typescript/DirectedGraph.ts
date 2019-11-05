
// We could use Record<number, Array<number>> as the graph, but
// it would nice to allow other types to identify nodes (letters, strings, etc.).
// And we would like the value returned, if the key is not there, to be undefined.
// Cf. https://brainlessdeveloper.com/typescript/2019/01/30/typescript-series-1-record-is-usually-not-the-best-choice/ .
type NodeId = string | number;
type Graph = { [P in NodeId]?: Array<NodeId> }
type Dictionary<K extends keyof any, T> = { [P in K]?: T };

// Represents a directed graph, using a node adjacency list.
// K: The type of the object identifying a node (e.g., number, string), which also is the key into the dictionary.
export default class DirectedGraph {
    // Represents the graph as a map of each node to its list of adjacent nodes (adjacency lists).
    graph: Graph;

    constructor() {
    }

    // Creates the graph from a list of edges (node pairs).
    create(edgeList: Array<[NodeId, NodeId]>) {
        this.graph = {};

        for (let edge of edgeList) {
            // Append the child to the node's growing list of children.
            if (this.graph[edge[0]]) {
                this.graph[edge[0]].push(edge[1]);
            }
            else {
                this.graph[edge[0]] = [ edge[1] ];
            }
            // A node that is reachable, but has no children, will never appear as node1, so will never be key in self.graph, unless we make sure to include it, as here.
            // Add the child as a key, with no destination yet, in case this child never has edges/children from it.
            if (this.graph[edge[1]] == null) {
                this.graph[edge[1]] = [];
            }
            //console.log(`${edge[0]}: ${this.graph[edge[0]]}`);
        }

        // Sort the children of each node, just for standardization.
        for (let node in this.graph) {
            this.graph[node].sort();
        }
    }

    // Create a string representation of the graph, for diagnostic display.
    dump() {
        let s: string = "";
        for (let node in this.graph) {
            s += `${node}: ${this.graph[node].join(" ")}\n`;
        }
        return s;
    }
    
    // Searches for the shortest path from node start to node end in breadth-first order.
    // If no end is specified, then the return value is the full traversal of the graph.
    // Returns list of the nodes traversed in the path found.
    breadth_first_search(start: NodeId, end: NodeId): Array<NodeId> {
        let traversal: Array<NodeId>= [];

        // Remember if we reached a node, using a dictionary, which is more flexible.
        let visited: Dictionary<NodeId, boolean> = {}

        let to_visit: NodeId[] = [];
        to_visit.push(start);
        visited[start] = true;
        traversal.push(start);

        while (to_visit.length > 0) {
            let node = to_visit.shift();

            for (let child of this.graph[node]) {  // Note: of, not in.
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
    }

}


// let g = new DirectedGraph();
// let data: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [0, 0], [2, 0], [3, 1], [1, 4], [3, 4], [4, 0], [1, 5]];
// g.create(data);
// console.log(g.dump());
// let traversal = g.breadth_first_search(2, null);

// let s = `${traversal.join(" ")}`;
// console.log(s);
