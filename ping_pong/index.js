const http = require('node:http')

const PORT = process.env.PORT || 3000

// Kept in memory, so it resets when the pod restarts
let counter = 0

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/pingpong') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`pong ${counter}\n`)
    counter += 1
    return
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('Not found\n')
})

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
