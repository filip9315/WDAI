const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { generateToken } = require('./jwt');
const app = express();
const port = 5000;
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
});

const User = sequelize.define('User', {
    email: DataTypes.TEXT,
    password: DataTypes.TEXT
}, {
  tableName: 'users',
  timestamps: false
});


app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      const newUser = await User.create({ email, password});
  
      const token = generateToken(newUser.id);
      res.status(201).json({ userID: newUser.id, token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'An error occurred while registering the user' });
    }
  });
  

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (password != user.password) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      res.status(200).json({ message: 'Login successful' });

    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  });
  

app.listen(port, async () => {
  try {
    console.log(`App listening on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
