const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { verifyToken } = require('./jwt');
const app = express();
const port = 3000;
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
});

const Book = sequelize.define('Book', {
  title: DataTypes.TEXT,
  author: DataTypes.TEXT,
  year: DataTypes.INTEGER,
}, {
  tableName: 'posts',
  timestamps: false
});

app.get('/api/books/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the books' });
  }
});

app.get('/api/books/:bookID', async (req, res) => {
  const bookID = req.params.bookID;
  console.log(`Looking for book with ID: ${bookID}`);
  try {
    const book = await Book.findByPk(bookID);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'An error occurred while fetching the book' });
  }
});


app.post('/api/books', verifyToken, async (req, res) => {
  const { title, author, year } = req.body;
  try {
    const newBook = await Book.create({title, author, year});
    res.status(201).json({ bookID: newBook.id });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'An error occurred while adding the book' });
  }
});


app.delete('/api/books/:bookID', verifyToken, async (req, res) => {
  const bookID = req.params.bookID;
  
  try {
    await Book.destroy({
      where: { id: bookID }
    });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'An error occurred while deleting the book' });
  }
});



app.listen(port, async () => {
  try {
    console.log(`App listening on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
