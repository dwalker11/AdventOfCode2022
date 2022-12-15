const readFileSync = require("fs").readFileSync

const contents = readFileSync('day1/input.txt', 'utf-8')

let i = 0
const results = []

for (let line of contents.split('\n')) {
  if (line == '') {
    i++
  } else {
    results[i] = parseInt(line, 10) + (results[i] || 0)
  }
}

console.log(results.sort().slice(-3))
