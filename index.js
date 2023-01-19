const http = require('http');
const fs = require('fs');
const url = require('url');


const server = new http.Server();

server.on('request', (req, res) => {
    let urlReq = url.parse(req.url, true);
    let selectFile = urlReq.path.slice(1);
    const stream = fs.createReadStream(selectFile);
    stream.pipe(res);
    stream.on('error', (error) => {
        if (error.code === 'ENOENT') {
            res.statusCode = 404;
            res.end();
        } else {
            res.statusCode = 400;
            res.end();
        }
    })

    stream.on('aborted', () => {
        stream.destroy()
    })

})


server.listen(3000)

