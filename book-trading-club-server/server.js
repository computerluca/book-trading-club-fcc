"use strict";
var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser');
var Book = require('./Book');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/traderequests/unapproved/:id',function(req,res){
    const id=req.params.id;
    console.log(id);
    Book.find({id_user:id,requested_by: { $ne: "null" } },function(err,data){
        if(err) throw err;
        console.log(data.length);
        if(data.length >0){
            res.send(data);
        
         
        }
        else{
            res.send([]);
        }

    })


})
app.get('/api/traderequests/outstanding/:id',function(req,res){
    Book.find({
        requested_by:req.params.id},function(err,data){
            if(err) throw(err);
            res.send(data);
        })
})
app.patch('/api/traderequests/request/:id',function(req,res){
    var id_book = req.params.id;

console.log(id_book);
    Book.findById(id_book,function(err,data){
        if(err) throw err;
        console.log(data);
        if(data){
            if(data.requested_by!=="null"){
                res.send("Error! The book has already been requested by you or another user");
            }
            else{
                console.log(req.body.id_user);
            data.requested_by = req.body.id_user;
            data.markModified('requested_by');
            data.save(function(err){
                if(err) throw err
                res.send("The trade requeste has been created successfully");
            })
            }
        }


})
})
app.patch('/api/traderequests/approve/:id',function(req,res){
    var id_book = req.params.id;
    Book.findById(id_book, function (err, tank) {
  if (err) throw(err);
  if(tank.requested_by==="null"){
      res.send("The Trade Request has already been approved");
  }
  else{
    tank.id_user = tank.requested_by;
    tank.requested_by="null";
    tank.markModified('requested_by');
    tank.markModified('id_user');
    tank.save(function(err){
        if(err)throw (err);
        res.send("Trade Request approved successfully");
    })
  }
});
});
app.get('/api/books',function(req,res){
    Book.find(function (err, data) {
  if (err) return console.error(err);
  res.send(data);
})
})
app.post("/api/books/new",function(req,res){
    var title = req.body.title;
    var image = req.body.image;
    var id_user = req.body.id_user;
    var nuovo = new Book({
        title:title,
        image:image,
        id_user:id_user
    });
    nuovo.save(function(err){
        if(err) throw err;
        res.send("Book saved successfully");
    })
})
app.get("/api/books/:id",function(req,res){
    Book.findById(req.params.id, function (err, tank) {
  if (err) throw(err);
  res.send(tank);
})
});
app.get("/api/books/id_user/:id",function(req,res){
    console.log(req.params.id);
    Book.find({id_user:req.params.id}, function (err, tank) {
  if (err) throw(err);
  res.send(tank);
})
});
app.listen(8082,function(){
    mongoose.connect(process.env.db);

    console.log('starting server');
})