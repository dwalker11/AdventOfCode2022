const fs = require("fs")

const WINDOW_LENGTH = 14
const datastream = fs.readFileSync("day6/input.txt", "utf8")

let start, end, processedCharacters

for (start = 0, end = start + (WINDOW_LENGTH - 1); end < datastream.length; start++, end++) {
  if (isDistinct(datastream, start, end)) {
    processedCharacters = end
    break
  }
}

console.log(processedCharacters + 1) // nth character

/**
 * Utility Functions
 */

function isDistinct(stream, start, end) {
  const window = stream.slice(start, end + 1)
  const s = new Set(Array.from(window))
  return s.size === WINDOW_LENGTH
}
