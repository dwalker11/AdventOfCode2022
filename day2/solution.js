const readFileSync = require("fs").readFileSync

const values = new Map([
  ['A', 1], // Rock
  ['B', 2], // Paper
  ['C', 3], // Scissors
  ['X', 1], // Rock
  ['Y', 2], // Paper
  ['Z', 3] // Scissors
])

const winLose = new Map([
  ['A', ['Z', 'Y']],
  ['B', ['X', 'Z']],
  ['C', ['Y', 'X']],
  ['X', ['C', 'B']],
  ['Y', ['A', 'C']],
  ['Z', ['B', 'A']]
])

function calculateRound(draw) {
  const [,,y] = draw

  let outcome = values.get(y)

  switch (draw) {
    case 'A X':
    case 'B Y':
    case 'C Z':
      outcome += 3 // Draw
      break;
    case 'A Y':
    case 'B Z':
    case 'C X':
      outcome += 6 // Win
      break;
  }

  return outcome
}

function calculateRound2(draw) {
  const [theirDraw,,intendedResult] = draw
  
  let outcome

  switch (intendedResult) {
    case 'Y':
      outcome = values.get(theirDraw) + 3 // Draw
      break;
    case 'Z':
      const [,w] = winLose.get(theirDraw)
      outcome = values.get(w) + 6 // Win
      break;
    default:
      const [l] = winLose.get(theirDraw)
      outcome = values.get(l) // Lose
  }

  return outcome
}

let round, totalScore = 0, realScore = 0

const contents = readFileSync('day2/input.txt', 'utf-8')

for (round of contents.split('\n')) {
  totalScore += calculateRound(round)
}

console.log("My score:", totalScore)

for (round of contents.split('\n')) {
  realScore += calculateRound2(round)
}

console.log("My real score:", realScore)
