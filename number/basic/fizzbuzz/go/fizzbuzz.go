
// fizzbuzz.go
// For the integers within a given range,
// if the number is a multiple of three, it returns "Fizz",
// if the number is a multiple of five, it returns "Buzz",
// if the number is a multiple of three and of five, it returns "FizzBuzz".
package fizzbuzz

import (
	"fmt"
	"strconv"
)

func main() {
	var s string = FizzBuzzRange(0, 30)
	fmt.Printf(s)
}

// Collects the FizzBuzz result for the integers in a range.
func FizzBuzzRange(a, b int) (s string) {
	for i := a; i <= b; i++ {
		s += FizzBuzz(i) + "\n"
	}
	return s
}

// Obtains the FizzBuzz string result for an integer.
// Uses switch instead of if else.
func FizzBuzz(n int) (s string) {
	var three bool = n % 3 == 0
	var five bool = n % 5 == 0
	var threefive bool = three && five

	//s = ""
	switch {
	case threefive:
		s = "FizzBuzz"
	case three:
		s = "Fizz"
	case five:
		s = "Buzz"
	default:
		s = strconv.Itoa(n)
	}

	return s
}

// Obtains the FizzBuzz string result for an integer.
// Uses if else.
func FizzBuzz1(n int) (s string) {
	var three bool = n % 3 == 0
	var five bool = n % 5 == 0
	var threefive bool = three && five

	s = ""
	if threefive {
		s = "FizzBuzz"
	} else if three {
		s = "Fizz"
	} else if five {
		s = "Buzz"
	} else {
		s = strconv.Itoa(n)
	}

	return s
}
