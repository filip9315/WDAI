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

const Order = sequelize.define('Order', {
    bookID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
}, {
  tableName: 'orders',
  timestamps: false
});

const Book = sequelize.define('Book', {
    title: DataTypes.TEXT,
    author: DataTypes.TEXT,
    year: DataTypes.INTEGER,
  }, {
    tableName: 'posts',
    timestamps: false
  });


app.get('/api/orders/:userID', async (req, res) => {
    const userID = req.params.userID;
    
    try {
      const orders = await Order.findAll({
        where: { userID }
      });
      
      if (orders.length === 0) {
        return res.status(404).json({ error: 'No orders found for this user' });
      }
      
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'An error occurred while fetching orders' });
    }
  });
  


  app.post('/api/orders', verifyToken, async (req, res) => {
    const { userID, bookID, amount } = req.body;
    
    try {
      const book = await Book.findByPk(bookID);
      
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      
      const newOrder = await Order.create({
        userID,
        bookID,
        amount
      });
      
      res.status(201).json({ orderID: newOrder.id });
    } catch (error) {
      console.error('Error adding order:', error);
      res.status(500).json({ error: 'An error occurred while adding the order' });
    }
  });
  


  app.delete('/api/orders/:orderID', verifyToken, async (req, res) => {
    const orderID = req.params.orderID;
    
    try {
      const deletedOrderCount = await Order.destroy({
        where: { id: orderID }
      });
      
      if (deletedOrderCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'An error occurred while deleting the order' });
    }
  });

  
  app.patch('/api/orders/:orderID', verifyToken, async (req, res) => {
    const orderID = req.params.orderID;
    const { bookID, amount } = req.body;
    
    if (!bookID && !amount) {
      return res.status(400).json({ error: 'At least one field (bookID or quantity) is required to update the order' });
    }
    
    try {
      const order = await Order.findByPk(orderID);
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      if (bookID) {
        const book = await Book.findByPk(bookID);
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
        order.bookID = bookID;
      }
      
      if (amount) {
        order.amount = amount;
      }
      
      await order.save();
      
      res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'An error occurred while updating the order' });
    }
  });
  



app.listen(port, async () => {
  try {
    console.log(`App listening on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
