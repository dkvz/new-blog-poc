const fs = require('fs')
const readline = require('readline')

const boundaryReg = /@media\s*\(prefers-color-scheme:\s*dark\)/
const boundaryEndReg = /^\}\s*$/
const htmlReg = /html\s*{$/
const startReg = /^\s*(.*)\s*{$/

// QUICK & DIRTY CODE DO NOT ATTEMPT AT HOME

async function processLineByLine() {
  const fileStream = fs.createReadStream('./src/css/style.css')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const lines = []

  let inTheZone = false
  for await (const line of rl) {
    // Look for the beginning of the section:
    if (inTheZone || boundaryReg.test(line)) {
      // Check for various patterns:
      if (htmlReg.test(line)) {
        lines.push("  html[data-theme='dark'] {")
      } else {
        // Is it the start of CSS props?
        const matches = startReg.exec(line)
        if (matches && matches.length >= 2) {
          // I use 2 spaces as tab. Can always use Document->Format
          // in editor.
          lines.push(`  html[data-theme='dark'] ${matches[1]} {`)
        } else {
          // Check if this is the end, I look for a closing bracket
          // starting the line. Adding a space would make this script
          // fail gloriously lol
          if (boundaryEndReg.test(line)) {
            break
          }
          if (inTheZone === true) {
            lines.push(line)
          }
        }
      }
      inTheZone = true
    }
  }
  console.log(lines.join("\n"))
}

processLineByLine()