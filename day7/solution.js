const fs = require("fs")

const root = createNode("/", null)
buildDirTree(root)
calculateTrueSizes(root)

const dirToDelete = new Set()
const candidates = []
const freeSpace = 70000000 - root.trueSize
const requiredSpace = 30000000 - freeSpace

traverse(root, (n) => {
  if (n.trueSize <= 100000) {
    dirToDelete.add(n)
  }
  if (n.trueSize >= requiredSpace) {
    candidates.push(n)
  }
})

// Part One
const totalSize = Array.from(dirToDelete).reduce(
  (total, dir) => (total += dir.trueSize),
  0
)

console.log(totalSize)

// Part Two
candidates.sort((dir1, dir2) => dir1.trueSize - dir2.trueSize)

console.log(candidates[0])

/**********************/
/*  Utlity functions  */
/**********************/

function buildDirTree(root) {
  const commandHistory = commandHistoryGenerator()

  let current = root
  
  for (let cmd of commandHistory) {
    if (cmd[0] !== "$") {
      continue
    } else if (cmd[1] === "cd") {
      current = navigate(current, cmd[2])
    } else if (cmd[1] === "ls") {
      buildNode(current, commandHistory)
    }
  }
}

function* commandHistoryGenerator() {
  const commands = fs.readFileSync("day7/input.txt", "utf-8").split("\n")

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i]
    const nextCmd = commands[i+1]

    const something = yield cmd.split(" ")
    if (something && nextCmd && nextCmd[0] === "$") yield "DONE"
  }
}

function navigate(node, destination) {
  if (destination === "..") {
    return node.parent
  }
  if (node.children.has(destination)) {
    return node.children.get(destination)
  }
  return node
}

function buildNode(node, historyIterator) {
  let output = historyIterator.next(true)

  while (!output.done && output.value !== "DONE") {
    if (output.value[0] === "dir") {
      node.children.set(output.value[1], createNode(output.value[1], node))
    } else {
      node.size += parseInt(output.value[0])
    }
    output = historyIterator.next(true)
  }
}

function createNode(label, parent) {
  return {
    label,
    size: 0,
    trueSize: 0,
    parent,
    children: new Map(),
  }
}

function calculateTrueSizes(node) {
  let size = node.size

  const children = node.children.values()
  for (let child of children) {
    size += calculateTrueSizes(child)
  }

  node.trueSize = size
  return size
}

function traverse(root, callback) {
  const position = [root]
  while (position.length !== 0) {
    const node = position.pop()
    node.children.forEach((child) => position.push(child))
    callback(node)
  }
}
