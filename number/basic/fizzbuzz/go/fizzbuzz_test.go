package fizzbuzz_test

import (
	"./fizzbuzz" // The source code under test (package "fizzbuzz").
	"fmt"
	"testing"
)

// Tests result for case of integer 15.
func TestFizzBuzz_15(t *testing.T) {
	n := 15
	s := fizzbuzz.FizzBuzz(n)
	fmt.Printf("FizzBuzz(%d) == \"%s\"", n, s)
	if s != "FizzBuzz" {
		msg := fmt.Sprintf("Expect: FizzBuzz(%d) == \"FizzBuzz\"", n)
		t.Error(msg)
	}
}

// Example of unit testing with test table. This enables test all cases for the function in one test function.
func TestFizzBuzz(t *testing.T) {
	// Test case (fact) is: range [a, b] and resulting string text.
	type fact struct {
		a, b int
		text string
	}
	facts := []fact{
		{a: 0, b: 15, text: "FizzBuzz\n1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n"},
		{a: 20, b: 30, text: "Buzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz\n"},
	}

	for _, fact := range facts {
		result := fizzbuzz.FizzBuzzRange(fact.a, fact.b)
		if result != fact.text {
			msg := fmt.Sprintf("\nFizzBuzzRange(%d, %d):\n\nExpect:\n\"%s\"\n\nGot:\n\"%s\"", fact.a, fact.b, fact.text, result)
			t.Error(msg)
		}
	}
}
