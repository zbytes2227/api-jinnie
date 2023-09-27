const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3030;


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

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
