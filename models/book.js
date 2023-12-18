const mongoose = require('mongoose');

const bookSchema =  new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minLength:5,
        maxLenght:100
    },
    genre: {
        type: String,
        required: true,
    },
    isAdmin: {
        type:Boolean
    },
    Author: {
        type:String,
        required:true
    }
})

const Book = mongoose.model('Book',bookSchema);
module.exports = Book;
