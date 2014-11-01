var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Book = require('./models/book');

mongoose.connect('mongodb://localhost/virtual-library');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

app.post('/api/books', function(req, res) {
   var book = new Book({
       title: req.body.title,
       isbn: req.body.isbn,
       author: req.body.author,
       price: req.body.price
   });
    book.save(function(err, book) {
       if (!err) {
           return res.send(book);
       }
       return res.status(400).end();
    });
});

app.put('/api/books/:id', function(req, res) {
    Book.findById(req.param('id'), function(err, book) {
        if (err || !book) {
            return res.status(404).end();
        }
        book.title = req.body.title;
        book.isbn = req.body.isbn;
        book.author = req.body.author;
        book.price = req.body.price;
        book.save(function (err, book) {
            if (!err) {
                return res.status(200).end();
            }
            return res.status(400).end();
        });
    });
});

app.get('/api/books', function(req, res) {
   Book.find({}, function(err, books) {
       return res.json(books);
   })
});

app.delete('/api/books/:id', function(req, res){
    Book.findById(req.param('id')).remove(function(err){
        if(!err) {
            res.status(200).end();
        }else{
            res.status(400).end();
        }
    })
})

app.listen(3000);
