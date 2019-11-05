
import sys

class IntArray:
    """Represents an array of integers, which can be sorted, etc."""

    def __int__(self):
        """An array of integers, which can be sorted, etc."""
        None

    @staticmethod
    def sort(input: [int]) -> [int]:
        """Sorts an input array of integers, in O(n) time, where n is the length of the array."""

        # Define the range of values in the array.
        low = sys.maxsize
        high = -1 * (sys.maxsize - 1)
        for value in input:
            if value < low:
                low = value
            if value > high:
                high = value
        #print(f"low: {str(low)}; high: {str(high)}." )

        # Collect the count of each value in an array indexed by the value.
        buckets = (high-low+1) * [0]
        for value in input:
            buckets[value - low] += 1
        #print(buckets)

        result = len(array) * [0] # Allocate result list to match size of input.
        index = 0
        for value_shifted in range(0, len(buckets)):
            for k in range(0, buckets[value_shifted]):
                result[index] = value_shifted + low
                index += 1

        return result


if __name__ == "__main__":
    array = [1, 499, 101, 52, 81, 237, 202, 311, 195, 16]

    result = IntArray.sort(array)

    print ("Input: " + " ".join(str(n) for n in array).rstrip())
    print ("Sorted: " + " ".join(str(n) for n in result).rstrip())

