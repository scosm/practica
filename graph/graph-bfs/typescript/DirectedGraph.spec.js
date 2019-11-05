"use strict";
// Unit tests for DirectedGraph.
// To run test, from the code's folder: npm run test
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DirectedGraph_1 = __importDefault(require("./DirectedGraph"));
var chai_1 = require("chai");
require("mocha");
describe("DirectedGraph", function () {
    describe("graph1: numeric NodeId: 2 0 3 1 4 5", function () {
        var graph1 = new DirectedGraph_1.default();
        var data1 = [[0, 1], [1, 2], [2, 3], [0, 0], [2, 0], [3, 1], [1, 4], [3, 4], [4, 0], [1, 5]];
        graph1.create(data1);
        describe("breadth_first_search traverse 2...", function () {
            it("", function () {
                var traversal = graph1.breadth_first_search(2, null);
                var result = traversal.join(" ");
                chai_1.expect(result).to.equal("2 0 3 1 4 5");
            });
        });
        describe("breadth_first_search traverse 2 to 1", function () {
            it("", function () {
                var traversal = graph1.breadth_first_search(2, 1);
                var result = traversal.join(" ");
                chai_1.expect(result).to.equal("2 0 3 1");
            });
        });
        describe("breadth_first_search traverse 0 to 4", function () {
            it("", function () {
                var traversal = graph1.breadth_first_search(0, 4);
                var result = traversal.join(" ");
                chai_1.expect(result).to.equal("0 1 2 4");
            });
        });
    });
    describe("graph1: string or number NodeId: c a d b e f", function () {
        var graph1 = new DirectedGraph_1.default();
        var data1 = [["a", "b"], ["b", "c"], ["c", "d"], ["a", "a"], ["c", "a"], ["d", "b"], ["b", "e"], ["d", "e"], ["e", "a"], ["b", "f"]];
        graph1.create(data1);
        describe("breadth_first_search traverse c...", function () {
            it("", function () {
                var traversal = graph1.breadth_first_search("c", null);
                var result = traversal.join(" ");
                chai_1.expect(result).to.equal("c a d b e f");
            });
        });
        describe("breadth_first_search traverse c to b", function () {
            it("", function () {
                var traversal = graph1.breadth_first_search("c", "b");
                var result = traversal.join(" ");
                chai_1.expect(result).to.equal("c a d b");
            });
        });
        describe("breadth_first_search traverse a to e", function () {
            it("", function () {
                var traversal = graph1.breadth_first_search("a", "e");
                var result = traversal.join(" ");
                chai_1.expect(result).to.equal("a b c e");
            });
        });
    });
});
