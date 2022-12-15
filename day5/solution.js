const fs = require("fs")

const stacks = [
  ["W", "M", "L", "F"],
  ["B", "Z", "V", "M", "F"],
  ["H", "V", "R", "S", "L", "Q"],
  ["F", "S", "V", "Q", "P", "M", "T", "J"],
  ["L", "S", "W"],
  ["F", "V", "P", "M", "R", "J", "W"],
  ["J", "Q", "C", "P", "N", "R", "F"],
  ["V", "H", "P", "S", "Z", "W", "R", "B"],
  ["B", "M", "J", "C", "G", "H", "Z", "W"],
]

const operations = fs.readFileSync("day5/input.txt", "utf8").split("\n")

for (let operation of operations) {
  const [amount, ...matches] = operation.match(/\d+/g)

  const from = parseInt(matches[0], 10) - 1
  const to = parseInt(matches[1], 10) - 1

  moveCreates2(stacks[from], stacks[to], +amount)
}

stacks.forEach((stack) => {
  console.log(tail(stack))
})

/**
 *  Utility functions
 */

function moveCreates(from, to, amount) {
  for (let i = 0; i < amount; i++) {
    const value = from.pop()
    value && to.push(value)
  }
}

function moveCreates2(from, to, amount) {
  const values = from.splice(-amount, amount)
  to.push(...values)
}

function tail(arr) {
  return arr.slice(-1)[0]
}
