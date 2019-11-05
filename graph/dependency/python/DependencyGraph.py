
# Given a dependency directed graph (acyclic, but with multiple starting points and multiple convergences or overlapping paths),
# generate the list of nodes in order of dependency (i.e., reverse). For example, conceive of the nodes as projects
# and the graph as the build dependencies; generate an acceptable build order.
# This involves (typically) a depth-first traversal of the graph, never visiting the same node more than once.

from collections import defaultdict
from typing import List, Tuple

class DependencyGraph:

    def __init__(self):
        """Uses a dictionary of lists to represent the graph as lists of adjacent nodes."""
        self.graph = defaultdict(list)
    
    # Creates the graph from a list of edges (node pairs).
    def create(self, edge_list: List[Tuple[int, int]]):
        """Creates the graph from a list of edges (node-node pairs).
        Each node is represented by an integer. Example tupleList: [(0, 3), (2, 1), (2, 2), (1, 4)] .
        edge_list: List of key-value pairs, which are the edges from node1 to node2."""

        # Each item in the list is a pair, (node1, node2).
        # Note: A node that is reachable, but has no children, will never appear as node1, so will never be key in self.graph.
        for node1, node2 in edge_list:
            #print(f"{node1}: {node2}")
            self.graph[node1].append(node2)
            # Add the child as a key, with no destination yet, in case this child never has edges/children from it.
            if self.graph[node2] == None:
                self.graph[node2] = []
        
        # Sort the children of each node, just for standardization.
        for node in self.graph.keys():
            self.graph[node].sort()
    
    # Create a string representation of the graph, for diagnostic display.
    def dump(self) -> str:
        """Returns a simple string representation of the graph."""
        result: str = ""
        for node in self.graph.keys():
            result += f"{node}: " + " ".join(str(n) for n in self.graph[node]).rstrip() + "\n"
        return result

    # Searches for the shortest path from node start to node end in breadth-first order.
    # If no end is specified, then the return value is the full traversal of the graph.
    # Returns list of the nodes traversed in the path found.
    def breadth_first_search(self, start: int, end: int = None) -> List[int]:
        """Traverse the graph in breadth-first order starting at node 'start',
        stopping when we reach the target node 'end', and return the list of nodes
        visited in order of visitation. This will find the shortest way to the end/target node.
        start: Initial node.
        end: Final/destination node."""

        traversal: List[int] = []  # Resulting list of nodes visited, in order reached.

        # Remember which nodes we have visited, using a separate data structure.
        visited = defaultdict(bool)  # If key is not there, then default False will be value.

        search_from = []  # The queue of the upcoming nodes to explore (just visited).
        search_from.append(start)
        visited[start] = True
        traversal.append(start)

        while search_from:
            node = search_from.pop(0)  # 0: Pops from front of list.

            # Visit each child node (if not yet visited).
            for child in self.graph[node]:
                if visited[child] == False:
                    search_from.append(child)
                    visited[child] = True
                    traversal.append(child)
                    # Check if we reached the target and return if so.
                    if end is not None and child == end:
                            return traversal

        return traversal
    

if __name__ == "__main__":
    graph1 = DirectedGraph()
    data = [(0, 1), (1, 2), (2, 3), (0, 0), (2, 0), (3, 1), (1, 4), (3, 4), (4, 0), (1, 5)]
    graph1.create(data)
    print(graph1.dump())

    traversal = graph1.breadth_first_search(2)
    print ("Traversal (2 -> ...): " + " ".join(str(n) for n in traversal).rstrip())

    traversal = graph1.breadth_first_search(2, 1)
    print ("Traversal (2 -> 1): " + " ".join(str(n) for n in traversal).rstrip())

    traversal = graph1.breadth_first_search(0, 4)
    print ("Traversal (0 -> 4): " + " ".join(str(n) for n in traversal).rstrip())
