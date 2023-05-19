const express = require('express');
const app = express();
const mongoose = require('mongoose');


// schema for personal details
const personalDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});


const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://harinath1314:Hari143%40likki@cluster0.mvobxcn.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

app.use(express.json());

// API endpoint for adding personal details
app.post('/api/personal_details', (req, res) => {
  const personalDetails = new PersonalDetails({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email
  });

  personalDetails.save()
    .then(() => {
      res.status(201).json({ message: 'Personal details added successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to add personal details' });
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
