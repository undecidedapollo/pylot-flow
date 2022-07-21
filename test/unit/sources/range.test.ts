import range from "../../../src/sources/range/index";

describe("range", function () {
    it("should throw if start is not a number", function () {
        expect(() => range(true as any, undefined as any)).toThrow();
    });

    it("should throw if end is not a number", function () {
        expect(() => range(1, true as any)).toThrow();
    });

    it("should throw if step is not a number", function () {
        expect(() => range(1, 5, true as any)).toThrow();
    });

    it("should throw if start is a decimal", function () {
        expect(() => range(1.1, 5, 1)).toThrow();
    });

    it("should throw if end is a decimal", function () {
        expect(() => range(1, 5.1, 1)).toThrow();
    });

    it("should throw if step is a decimal", function () {
        expect(() => range(1, 5, 1.1)).toThrow();
    });

    it("should throw if step is 0", function () {
        expect(() => range(1, 5, 0)).toThrow();
    });

    it("should throw if positive range negative step range is invalid", function () {
        expect(() => range(1, 5, -1)).toThrow();
    });

    it("should throw if positive range negative step range is invalid", function () {
        expect(() => range(-5, 1, -1)).toThrow();
    });

    it("should throw if negative range positive step is invalid", function () {
        expect(() => range(5, 1, 1)).toThrow();
    });

    it("should throw if negative range positive step is invalid", function () {
        expect(() => range(-1, -5, 1)).toThrow();
    });

    function validateSequence(rangeFlow, arr) {
        expect(rangeFlow).toBeDefined();
        const flowRes = rangeFlow.toArray();
        expect(flowRes).toBeInstanceOf(Array);
        expect(flowRes.length).toBe(arr.length);
        expect(flowRes.every((x, i) => x === arr[i])).toBe(true);
    }

    it("should return seq for 1, 5, 1", function () {
        validateSequence(range(1, 5, 1), [1, 2, 3, 4]);
    });

    it("should return seq for -5, 5, 1", function () {
        validateSequence(range(-5, 5, 1), [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]);
    });

    it("should return seq for 5, 1, -1", function () {
        validateSequence(range(5, 1, -1), [5, 4, 3, 2]);
    });

    it("should return seq for 5, -5, -1", function () {
        validateSequence(range(5, -5, -1), [5, 4, 3, 2, 1, 0, -1, -2, -3, -4]);
    });

    it("should return seq for -50, 32, 10", function () {
        validateSequence(range(-50, 32, 10), [-50, -40, -30, -20, -10, 0, 10, 20, 30]);
    });

    it("should return seq for 50, -32, -10", function () {
        validateSequence(range(50, -32, -10), [50, 40, 30, 20, 10, 0, -10, -20, -30]);
    });

    it("should return seq for 0, 0, 1", function () {
        validateSequence(range(0, 0, 1), []);
    });

    it("should return seq for 0, 0, -1", function () {
        validateSequence(range(0, 0, -1), []);
    });

    it("should return seq for 1, 5, default", function () {
        validateSequence(range(1, 5), [1, 2, 3, 4]);
    });

});
