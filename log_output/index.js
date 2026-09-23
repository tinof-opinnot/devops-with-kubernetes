const http = require('node:http')
const { randomUUID } = require('node:crypto')

const PORT = process.env.PORT || 3000

// Generated once on startup and kept in memory
const randomString = randomUUID()

const status = () => `${new Date().toISOString()}: ${randomString}`

const printLine = () => {
  console.log(status())
}

printLine()
setInterval(printLine, 5000)

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`${status()}\n`)
    return
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('Not found\n')
})

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
