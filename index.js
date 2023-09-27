const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = process.env.PORT || 3030;


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use the cors middleware with the appropriate options
app.use(
  cors({
    origin: 'http://127.0.0.1:5500', // Replace with the origin of your frontend application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Set to true if you are using cookies or sessions
  })
);


// Define a POST route for your handler
app.post('/validate', (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Validate the phone number
    if (!isValidPhoneNumber(phoneNumber)) {
      return res.status(400).json({ success: false, msg: "Phone number should be exactly 10 digits." });
    }

    return res.status(200).json({ success: true, msg: "Congrats! Account has been created." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// Helper function to validate phone number
const isValidPhoneNumber = (phoneNumber) => {
  return /^\d{10}$/.test(phoneNumber);
};



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
