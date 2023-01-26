const http = require('http');
const fs = require('fs');
const url = require('url');


const server = new http.Server();

server.on('request', (req, res) => {
    try {
        if (req.method === 'GET') {
            let urlReq = url.parse(req.url, true);
            let selectFile = urlReq.path.slice(1);
            const stream = fs.createReadStream(selectFile);
            stream.pipe(res);
            stream.on('error', (error) => {
                if (error.code === 'ENOENT') {
                    res.statusCode = 404;

                    res.end('file not found');
                } else {
                    res.statusCode = 500;
                    res.end('else mistakes');
                }
            })

            stream.on('aborted', () => {
                stream.destroy()
            })
        } else {
            res.end()
        }
    } catch (error) {
        console.log(error);
    }


})

module.exports = server;