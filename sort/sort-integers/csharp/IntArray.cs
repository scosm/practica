
// Given an array of integers with values of the elements in the range [1:500], sort the array.
// You can test also at: https://dotnetfiddle.net/

using System;

namespace IntArray {

    public class IntArray {

        public static void Main(string[] args) {
            int[] input = new int[10]
            {
                1, 499, 101, 52, 81, 237, 202, 311, 195, 16
            };
            
            int[] sorted = IntArray.Sort(input);

            string s = "";
            foreach (int x in sorted)
            {
                s += x.ToString() + " ";
            }

            System.Console.WriteLine("Sorted: " + s);
        }
        
        // Sorts an array of integers falling within a range (low to high).
        // Returns a new array with the values sorted.
        // Runs in O(n), where n is the size of the input array.
        public static int[] Sort(int[] input)
        {
            // Find the range of values.
            int low = 1;
            int high = 500;

            int[] buckets = new int[high - low + 1];

            // Collect the count of each value in an array indexed by the value.
            foreach (int i in input)
            {
                // Value i is shifted by an offset of low, to fit in the array.
 				//Console.WriteLine("{0}, {1}, {2}", i, i-low, buckets.Length);
                buckets[i - low]++;
            }
            
            int[] result = new int[input.Length];
            int index = 0;
            for (int n=0; n < buckets.Length; n++)
            {
                // The inner loop includes values only if their count > 0.
                for (int j=0; j < buckets[n]; j++)
                {
                    // The value is the offset index k plus the shift amount, which is low.
					//Console.WriteLine("{0}, {1}, {2}", n + low, index, result.Length);                    
                    result[index] = n + low;
                    index++;
                }
            }
            
            return result;
        }
    }
}

