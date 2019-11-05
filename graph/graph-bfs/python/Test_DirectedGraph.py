
import pytest
import DirectedGraph
from DirectedGraph import *

# pytest conventions: See https://pytest.readthedocs.io/en/latest/goodpractices.html#conventions-for-python-test-discovery.
# Test class name must begin with "Test" (no __init__ method).
# Test methods must begin with "test".

class Test_DirectedGraph:

    def test_breadth_first_search__traverse_2(self):
        graph = DirectedGraph()
        data = [(0, 1), (1, 2), (2, 3), (0, 0), (2, 0), (3, 1), (1, 4), (3, 4), (4, 0), (1, 5)]
        graph.create(data)

        traversal = graph.breadth_first_search(2)
        assert traversal == [2, 0, 3, 1, 4, 5]

    def test_breadth_first_search__traverse_2_1(self):
        graph = DirectedGraph()
        data = [(0, 1), (1, 2), (2, 3), (0, 0), (2, 0), (3, 1), (1, 4), (3, 4), (4, 0), (1, 5)]
        graph.create(data)

        traversal = graph.breadth_first_search(2, 1)
        assert traversal == [2, 0, 3, 1]

    def test_breadth_first_search__traverse_0_4(self):
        graph = DirectedGraph()
        data = [(0, 1), (1, 2), (2, 3), (0, 0), (2, 0), (3, 1), (1, 4), (3, 4), (4, 0), (1, 5)]
        graph.create(data)

        traversal = graph.breadth_first_search(0, 4)
        assert traversal == [0, 1, 2, 4]

