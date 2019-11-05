package directedgraph

import (
	"container/list"
	"strconv"
	"strings"
)

// An edge in a directed graph, from Node1 to Node2.
type Edge struct {
	Node1 int
	Node2 int
}

// A directed graph, represented by adjacency lists.
type DirectedGraph struct {
	// The graph is a dictionary mapping node id (int) to a list (slice) of node id integers.
	Graph map[int][]int
}

// Create the directed graph from a list (slice) of edges (node pairs, from node1 to node2).
func (this *DirectedGraph) Create(edgelist []Edge) {
	this.Graph = make(map[int][]int, len(edgelist))
	// We'll collect the child/destination nodes in a set (children), as a map from int to "nothing".
	var nothing struct{}
	children := make(map[int]struct{})
	for k := 0; k < len(edgelist); k++ {
		edge := edgelist[k]
		this.Graph[edge.Node1] = append(this.Graph[edge.Node1], edge.Node2)
		children[edge.Node2] = nothing // Remember what all the children are.
	}

	// A node that is reachable, but has no children, will never appear as Node1,
	// so will never be key in Graph, unless we make sure to include it, as here.
	// So, add a key in the graph map for all the nodes that do not have children.
	// children has all nodes found as destinations, which also might NOT be origins.
	// For each destination node, if it is not also an origin, then add it to our graph map.
	for node, _ := range children {
		_, exists := this.Graph[node]
		if !exists {
			this.Graph[node] = make([]int, 0)
		}
	}
}

// Dump a string representation of the graph, for diagnostic display.
func (this *DirectedGraph) Dump() string {
	s := ""
	for i := 0; i < len(this.Graph); i++ {
		s += strconv.Itoa(i) + ": "
		for _, n := range this.Graph[i] {
			s += strconv.Itoa(n) + " "
		}
		s = strings.TrimRight(s, " ") + "\n"
	}
	return s
}

// Searches for the shortest path from node start to node end in breadth-first order.
// If no end is specified, then the return value is the full traversal of the graph.
// end: -1 indicates no end; traverse the whole graph.
// Returns list of the nodes traversed in the path found.
func (this *DirectedGraph) BreadthFirstSearch(start, end int) []int {
	traversal := []int{} // Resulting list of nodes visited, in order reached.

	// Remember which nodes we have visited, using a separate data structure.
	visited := make(map[int]bool)

	// The queue of the upcoming nodes to explore (just visited).
	search_from_queue := list.New()
	search_from_queue.PushBack(start)
	visited[start] = true
	traversal = append(traversal, start)

	for search_from_queue.Len() > 0 {
		e := search_from_queue.Front()
		search_from_queue.Remove(e)
		node := e.Value.(int) // Type assertion to cast the element to int.

		for _, child := range this.Graph[node] {
			if visited[child] == false {
				search_from_queue.PushBack(child)
				visited[child] = true
				traversal = append(traversal, child)
				if end != -1 && child == end {
					return traversal
				}
			}
		}
	}

	return traversal
}
