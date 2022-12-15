const fs = require("fs")

const grid = parseInput()

const innerTrees = []

for (let i = 1; i < grid.length - 1; i++) {
  const row = grid[i]
  for (let j = 1; j < row.length - 1; j++) {
    innerTrees.push(isVisible(i, j))
  }
}

const totalAmount = grid.length * grid[0].length
const hiddenTrees = innerTrees.filter((v) => !v)
console.log("Total grid size:", totalAmount)
console.log("Non-visible count:", hiddenTrees.length)
console.log("Visible count:", totalAmount - hiddenTrees.length)

const trees = []

for (let i = 0; i < grid.length; i++) {
  const row = grid[i]
  for (let j = 0; j < row.length; j++) {
    trees.push(scenicScore(i, j))
  }
}

console.log("Max scenic tree", Math.max(...trees))

function parseInput() {
  input = fs.readFileSync("day8/input.txt", "utf-8")
  return input
    .trim()
    .split("\n")
    .reduce((result, row) => {
      result.push(row.split(""))
      return result
    }, [])
}

function isVisible(row, column) {
  const current = grid[row][column]
  return (
    topVisible(current, row - 1, column) ||
    bottomVisible(current, row + 1, column) ||
    leftVisible(current, row, column - 1) ||
    rightVisible(current, row, column + 1)
  )
}

function topVisible(initialCell, row, column) {
  if (grid[row][column] >= initialCell) {
    return false
  }

  if (isEdge(row, column)) {
    return true
  }

  return topVisible(initialCell, row - 1, column)
}

function bottomVisible(initialCell, row, column) {
  if (grid[row][column] >= initialCell) {
    return false
  }

  if (isEdge(row, column)) {
    return true
  }

  return bottomVisible(initialCell, row + 1, column)
}

function leftVisible(initialCell, row, column) {
  if (grid[row][column] >= initialCell) {
    return false
  }

  if (isEdge(row, column)) {
    return true
  }

  return leftVisible(initialCell, row, column - 1)
}

function rightVisible(initialCell, row, column) {
  if (grid[row][column] >= initialCell) {
    return false
  }

  if (isEdge(row, column)) {
    return true
  }

  return rightVisible(initialCell, row, column + 1)
}

function scenicScore(row, column) {
  const current = grid[row][column]
  return (
    topViewingDistance(current, row - 1, column, 1) *
    bottomViewingDistance(current, row + 1, column, 1) *
    leftViewingDistance(current, row, column - 1, 1) *
    rightViewingDistance(current, row, column + 1, 1)
  )
}

function topViewingDistance(initialCell, row, column, distance) {
  if (outOfRange(row, column)) {
    return 0
  }

  if (grid[row][column] >= initialCell || isEdge(row, column)) {
    return distance
  }

  return topViewingDistance(initialCell, row - 1, column, distance + 1)
}

function bottomViewingDistance(initialCell, row, column, distance) {
  if (outOfRange(row, column)) {
    return 0
  }

  if (grid[row][column] >= initialCell || isEdge(row, column)) {
    return distance
  }

  return bottomViewingDistance(initialCell, row + 1, column, distance + 1)
}

function leftViewingDistance(initialCell, row, column, distance) {
  if (outOfRange(row, column)) {
    return 0
  }

  if (grid[row][column] >= initialCell || isEdge(row, column)) {
    return distance
  }

  return leftViewingDistance(initialCell, row, column - 1, distance + 1)
}

function rightViewingDistance(initialCell, row, column, distance) {
  if (outOfRange(row, column)) {
    return 0
  }

  if (grid[row][column] >= initialCell || isEdge(row, column)) {
    return distance
  }

  return rightViewingDistance(initialCell, row, column + 1, distance + 1)
}

function outOfRange(row, column) {
  return (
    row < 0 ||
    column < 0 ||
    row > grid.length - 1 ||
    column > grid[0].length - 1
  )
}

function isEdge(row, column) {
  return (
    row === 0 ||
    column === 0 ||
    row === grid.length - 1 ||
    column === grid[0].length - 1
  )
}
