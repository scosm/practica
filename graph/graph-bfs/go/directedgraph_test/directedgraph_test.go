package directedgraph_test

import (
	"fmt"
	"reflect"
	"testing"

	dg "../directedgraph"
	"github.com/stretchr/testify/assert"
)

func TestDirectedGraph_Dump(t *testing.T) {
	//[0, 1], [1, 2], [2, 3], [0, 0], [2, 0], [3, 1], [1, 4], [3, 4], [4, 0], [1, 5]
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
	assert.Equal(t, true, true)
}

func TestDirectedGraph_BreadthFirstSearch(t *testing.T) {
	//[0, 1], [1, 2], [2, 3], [0, 0], [2, 0], [3, 1], [1, 4], [3, 4], [4, 0], [1, 5]
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
	expected := []int{2, 3, 0, 1, 4, 5}

	g := dg.DirectedGraph{}
	g.Create(edgelist)
	traversal := g.BreadthFirstSearch(2, -1)
	comparison := reflect.DeepEqual(traversal, expected)
	assert.Equal(t, comparison, true)

}
