const fs = require("fs");

const range = (str) => {
  const [f, l] = str.split("-");
  return [+f, +l];
};

const containsOther = (a, b) => {
  const [lowerBound, upperBound] = a;
  const [head, tail] = b;
  return (
    lowerBound <= head &&
    head <= upperBound &&
    lowerBound <= tail &&
    tail <= upperBound
  );
};

const overlapsOther = (a, b) => {
  const [lowerBound, upperBound] = a;
  const [head, tail] = b;
  return (
    (lowerBound <= head && head <= upperBound) ||
    (lowerBound <= tail && tail <= upperBound)
  );
};

const content = fs.readFileSync("day4/input.txt", "utf-8");
const ranges = content.split("\n");

let containsCount = 0;
let overlapCount = 0;

for (let row of ranges) {
  const [first, second] = row.split(",");

  const leftRange = range(first);
  const rightRange = range(second);

  if (
    containsOther(leftRange, rightRange) ||
    containsOther(rightRange, leftRange)
  ) {
    containsCount++;
  }

  if (
    overlapsOther(leftRange, rightRange) ||
    overlapsOther(rightRange, leftRange)
  ) {
    overlapCount++;
  }
}

console.log("Contains Count:", containsCount);

console.log("Overlap Count:", overlapCount);
