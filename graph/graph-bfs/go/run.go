package main

import (
	"fmt"
	"strconv"
	"strings"

	dg "./directedgraph"
)

func main() {
	edgelist := []dg.Edge{
		dg.Edge{Node1: 0, Node2: 1},
		dg.Edge{Node1: 1, Node2: 2},
		dg.Edge{Node1: 2, Node2: 3},
		dg.Edge{Node1: 0, Node2: 0},
		dg.Edge{Node1: 2, Node2: 0},
		dg.Edge{Node1: 3, Node2: 1},
		dg.Edge{Node1: 1, Node2: 4},
		dg.Edge{Node1: 3, Node2: 4},
		dg.Edge{Node1: 4, Node2: 0},
		dg.Edge{Node1: 1, Node2: 5},
	}
	g := dg.DirectedGraph{}
	g.Create(edgelist)
	s := g.Dump()
	fmt.Printf(s)

	traversal := g.BreadthFirstSearch(2, -1)
	s = ""
	for _, node := range traversal {
		s += strconv.Itoa(node) + " "
	}
	s = strings.TrimRight(s, " ") + "\n"
	fmt.Printf(s)

}
