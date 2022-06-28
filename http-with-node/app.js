import http from 'http'
import url from 'url'

const server = http.createServer()

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    if(req.method === 'GET' && parsedUrl.pathname === '/metadata'){
        const { id } = parsedUrl.query
        console.log(id)
        // console.log(req.headers)
    }
    req.on('data', (chunk) => {
        console.log('this is a chunk')
        console.log(chunk.toString())
    })
})

server.listen(4000)