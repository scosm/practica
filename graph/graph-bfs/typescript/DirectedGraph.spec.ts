// Unit tests for DirectedGraph.
// To run test, from the code's folder: npm run test

import DirectedGraph from "./DirectedGraph";
import { expect } from "chai";
import "mocha";

describe("DirectedGraph", () => {

    describe("graph1: numeric NodeId: 2 0 3 1 4 5", () => {
        let graph1 = new DirectedGraph();
        let data1: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [0, 0], [2, 0], [3, 1], [1, 4], [3, 4], [4, 0], [1, 5]];
        graph1.create(data1);
    
        describe("breadth_first_search traverse 2...", () => {
            it("", () => {
                let traversal = graph1.breadth_first_search(2, null);
                let result: string = traversal.join(" ");
                expect(result).to.equal("2 0 3 1 4 5")
            })
        })

        describe("breadth_first_search traverse 2 to 1", () => {
            it("", () => {
                let traversal = graph1.breadth_first_search(2, 1);
                let result: string = traversal.join(" ");
                expect(result).to.equal("2 0 3 1")
            })
        })

        describe("breadth_first_search traverse 0 to 4", () => {
            it("", () => {
                let traversal = graph1.breadth_first_search(0, 4);
                let result: string = traversal.join(" ");
                expect(result).to.equal("0 1 2 4")
            })
        })
    })

    describe("graph1: string or number NodeId: c a d b e f", () => {
        let graph1 = new DirectedGraph();
        let data1: Array<[string, string]> = [["a", "b"], ["b", "c"], ["c", "d"], ["a", "a"], ["c", "a"], ["d", "b"], ["b", "e"], ["d", "e"], ["e", "a"], ["b", "f"]];
        graph1.create(data1);
    
        describe("breadth_first_search traverse c...", () => {
            it("", () => {
                let traversal = graph1.breadth_first_search("c", null);
                let result: string = traversal.join(" ");
                expect(result).to.equal("c a d b e f")
            })
        })

        describe("breadth_first_search traverse c to b", () => {
            it("", () => {
                let traversal = graph1.breadth_first_search("c", "b");
                let result: string = traversal.join(" ");
                expect(result).to.equal("c a d b")
            })
        })

        describe("breadth_first_search traverse a to e", () => {
            it("", () => {
                let traversal = graph1.breadth_first_search("a", "e");
                let result: string = traversal.join(" ");
                expect(result).to.equal("a b c e")
            })
        })

    })

});
