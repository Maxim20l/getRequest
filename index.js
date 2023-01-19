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
                if (fs.existsSync(selectFile)) {
                    res.statusCode = 404;
                    res.end();
                } else {
                    res.statusCode = 500;
                    res.end();
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


server.listen(3000)

