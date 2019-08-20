let express = require('express');
let https= require('https')
let fs = require('fs')
let path = require('path')
let http = require('http')
let app = express()



app.use('/', (req, res, next)=>{
    console.log(req.originalUrl.slice(-1));
    
    if(req.originalUrl.slice(-1) !== '/'){
        
        next()
    }else{
        res.redirect('/revantarctica.html')
    }
    
})
app.use(express.static(path.join(__dirname, '/web-content')))
var key1 = fs.readFileSync( '/home/spencer_d_williams123/serverkey.pem' ).toString();
var cert1 = fs.readFileSync( '/home/spencer_d_williams123/servercert.pem' ).toString();
let options = {
    key: key1, //fs.readFileSync(process.env['SERVER_KEY']),
    cert: cert1 ,//fs.readFileSync(process.env['SERVER_CERT']),
    passphrase: process.env['SERVER_PASS'],
}


// app.listen(9090, ()=>{
//     console.log('Started on 9090 no cert');
    
// })

//intended server run
https.createServer(options,app).listen(9090, ()=>{
    console.log('App Started on 9090');
    
})
https.createServer(options,app).listen(443, ()=>{
    console.log('App Started on 443');

})
http.createServer(options,app).listen(80, ()=>{
    console.log('App Started on 80');

})
