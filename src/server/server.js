const http = require("http")
const fs = require("fs")

const p = fs.readFileSync("client/index.html");
const pcss = fs.readFileSync("client/index.css");
const pjs = fs.readFileSync("client/main.js");
const pm1js = fs.readFileSync("client/elelement.js");

const zav = fs.readFileSync("client/images/zavojnica.png");
const src = fs.readFileSync("client/images/source.png");
const otp = fs.readFileSync("client/images/otpornik.png");
const kon = fs.readFileSync("client/images/kondenzator.png");
const am = fs.readFileSync("client/images/ametar.png");
const vm = fs.readFileSync("client/images/vmetar.png");
const bin = fs.readFileSync("client/images/bin.png");


http.createServer((req, res) => {
    if (req.method == "GET") {
        if (req.url == "/") {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(p);
        } else if (req.url == "/index.css") {
            res.writeHead(200, {
                'Content-Type': 'text/css'
            });
            res.end(pcss);
        } else if (req.url == "/main.js") {
            res.writeHead(200, {
                'Content-Type': 'script/text'
            });
            res.end(pjs);
        } else if (req.url == "/elelements.js") {
            res.writeHead(200, {
                'Content-Type': 'script/text'
            });
            res.end(pm1js);
        } else if (req.url == "/images/zavojnica.png") {
            res.writeHead(200, {
                'Content-Type': 'plain/image'
            });
            res.end(zav);
        } else if (req.url == "/images/source.png") {
            res.writeHead(200, {
                'Content-Type': 'plain/image'
            });
            res.end(src);
        } else if (req.url == "/images/otpornik.png") {
            res.writeHead(200, {
                'Content-Type': 'plain/image'
            });
            res.end(otp);
        } else if (req.url == "/images/kondenzator.png") {
            res.writeHead(200, {
                'Content-Type': 'plain/image'
            });
            res.end(kon);
        } else if (req.url == "/images/ametar.png") {
            res.writeHead(200, {
                'Content-Type': 'plain/image'
            });
            res.end(am);
        } else if (req.url == "/images/vmetar.png") {
            res.writeHead(200, {
                'Content-Type': 'plain/image'
            });
            res.end(vm);
        } else if (req.url == "/images/bin.png") {
            res.writeHead(200, {
                'Content-Type': 'plain/image'
            });
            res.end(bin);
        }
    }
}).listen(8000);



