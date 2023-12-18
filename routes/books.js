const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/book");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books); // Changed status code to 200 for a successful response
  } catch (err) {
    // Handle errors if any occurred during the fetch
    res.status(500).send({ error: err.message }); // Sending an error response with a 500 status code
  }
});

router.get("/:id", async (req, res) => {
        try {
            const bookId  = req.params.id;
            const books = await Book.findById(bookId);
            res.status(200).send(books)
            console.log(books);
        } catch (error) {
            res.status(500).send({ error: error.message }); // Handle errors if any
        }
})

router.post("/create", async (req, res) => {
    try {
        const { name, genre, isAdmin,Author } = req.body; // Assuming the request body contains these fields
    
        // Check if a book with the same name already exists
        const existingBook = await Book.findOne({ name });

        if (existingBook) {
            return res.status(400).json({ error: 'Book with this name already exists' });
        }


        // Create a new book using the Book model
        const newBook = new Book({ name, genre, isAdmin, Author });
    
        // Save the new book to the database
        const savedBook = await newBook.save();
    
        res.status(201).send(savedBook); // Respond with the created book details
      } catch (error) {
        res.status(500).send({ error: error.message }); // Handle errors if any
      }
})

router.put("/update/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
      const updatedData = req.body; // Assuming the updated book data is sent in the request body
  
      const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
  
      if (!updatedBook) {
        return res.status(404).send({ error: "Book not found" });
      }
  
      res.status(200).send(updatedBook);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  

router.delete("/delete/:id",async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).send({ error: "Book not found" });
          }
      
          const remainingBooks = await Book.find(); // Fetch the updated list of books
          
          res.status(200).send(remainingBooks);
      } catch (err) {
        // Handle errors if any occurred during the fetch
        res.status(500).send({ error: err.message }); // Sending an error response with a 500 status code
      }
})

module.exports = router;