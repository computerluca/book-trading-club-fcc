var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.end('ciao');
})
app.get("/api/cibo",function(req,res){
    res.end("ecco il cibo");
})
app.listen(8082,function(){
    console.log('starting server');
})
