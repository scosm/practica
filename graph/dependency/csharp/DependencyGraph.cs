
public class DependencyGraph
{
    Stack<string> Traverse(Dictionary<string, List<string>> graph)
    {
        Stack<string> order = new Stack<string>(); // Result.
        Dictionary<string, bool> visited = new Dictionary<string, bool>();
        
        // Find starting points.
        Dictionary<string, bool> children = new Dictionary<string, bool>();
        foreach (string id in graph.Keys)
        {
            foreach (string child in graph[id])
            {
                children[child] = true;
            }
        }
        
        foreach (string id in graph.Keys)
        {
            if (children.Contains(id) == false) {
                Recurse(id, graph, visited, ref order);
            }
        }
        
        return order;
    }

    void Recurse(string id, Dictionary<string, List<string>> graph, Dictionary<string, bool> visited, ref Stack<string> order)
    {
        visited[id] = true;
        order.Push(id);
        
        foreach (string child in graph[id])
        {
            if (visited.Contains(child) == false)
            {
                Recurse(child, graph, visited);
            }
        }
    }

}
