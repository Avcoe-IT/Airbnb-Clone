// routes/signin.js

const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { registerSchema } = require('../schema');
const register = require('../models/register');

// Sign-in route (POST request)
router.post('/', wrapAsync(async (req, res) => {
  const { username, password, dob } = req.body;
  console.log(req.body, username, password, dob);

  // Validate user input using Joi schema
  const result = registerSchema.validate({ info: { username, password, dob } });

  if (result.error) {
    // Handle validation error
    return res.status(400).json({ error: result.error.details[0].message });
  }

  const dobDate = new Date(dob);
  dobDate.setUTCHours(0, 0, 0, 0);

  // Check if the user with the given credentials exists in the database
  const user = await register.findOne({
    username,
    password,
    dob: dobDate,
  });

  if (!user) {
    // User not found
    return res.status(401).json({ error: 'Invalid username, password, or dob' });
  }

  // User found, you can generate a JWT token here if needed
  // For simplicity, let's just send a success message
  return res.json({ message: 'Sign-in successful', user });
}));

module.exports = router;
