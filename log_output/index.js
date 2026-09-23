const { randomUUID } = require('node:crypto')

// Generated once on startup and kept in memory
const randomString = randomUUID()

const printLine = () => {
  console.log(`${new Date().toISOString()}: ${randomString}`)
}

printLine()
setInterval(printLine, 5000)
