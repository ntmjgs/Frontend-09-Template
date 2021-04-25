const http = require('http')

http.createServer((request,response) => {
    let body = []
    request.on('error',(err)=>{
        console.error(err)
    }).on('data',(chunk)=>{
        body.push(chunk)
    }).on('end',()=>{
        body = Buffer.concat(body).toString()
        //body = (Buffer.concat([ Buffer.from(body.toString()) ])).toString();
        console.log("body:",body)
        response.writeHead(200,{'Content-Type':'text/html'})
        response.end(
`<html maaa=a>
<head>
<style></style>
</head>
<body>
wuaaa
</body>
</html>
`
        )
    })
}).listen(8088)
console.log("server started")