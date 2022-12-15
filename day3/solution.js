const readFileSync = require("fs").readFileSync;

function prioritySum(elements) {
  const LOWER_CASE_CHAR_CODE = "a".charCodeAt(0);
  const UPPER_CASE_CHAR_CODE = "A".charCodeAt(0);

  let total = 0;

  for (let ele of elements) {
    const charCode = ele.charCodeAt(0);

    const priority =
      ele.toLowerCase() == ele
        ? (charCode % (LOWER_CASE_CHAR_CODE - 1))
        : (charCode % (UPPER_CASE_CHAR_CODE - 1)) + 26;

    total += priority;
  }

  return total
}

const commonElementsBtwnRucksacks = [];

const contents = readFileSync('day3/input.txt', 'utf-8')
const newLocal = contents.split("\n");

for (let rucksack of newLocal) {
  const mid = rucksack.length / 2;

  const first = Array.from(rucksack.slice(0, mid));
  const second = Array.from(rucksack.slice(mid));

  const something = new Set(first)
  const intersection = new Set(second.filter((v) => something.has(v)));

  intersection.forEach((i) => commonElementsBtwnRucksacks.push(i));
}

console.log(commonElementsBtwnRucksacks);
console.log(prioritySum(commonElementsBtwnRucksacks));

const rucksacksGroups = [];

for (let i = 0; i < newLocal.length; i += 3) {
  const first = Array.from(newLocal[i]);
  const second = Array.from(newLocal[i+1]);
  const third = Array.from(newLocal[i+2]);

  const something = new Set(first)
  const something2 = new Set(second)
  const intersection = new Set(third.filter((v) => (something.has(v) && something2.has(v))));

  intersection.forEach((i) => rucksacksGroups.push(i))
}

console.log(rucksacksGroups)
console.log(prioritySum(rucksacksGroups));