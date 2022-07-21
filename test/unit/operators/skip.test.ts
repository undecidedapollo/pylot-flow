import skip from "../../../src/operators/skip/index";

describe("skip", () => {
  const boolsArr = [true, false, true, false, true, true, false, false];
  const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

  it("should return boolean items unchanged", () => {
    const res = Array.from(skip(4)(boolsArr));
    expect(res.length).toBe(4);
    expect(res.every((x, i) => x === boolsArr[i + 4])).toBe(true);
  });

  it("should return number items unchanged", () => {
    const res = Array.from(skip(4)(numArr));
    expect(res.length).toBe(4);
    expect(res.every((x, i) => x === numArr[i + 4])).toBe(true);
  });
});
