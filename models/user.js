const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: {
     type: String, 
     required: true, 
     unique: true
     },
  password: { 
    type: String,
     required: true
     },
  dob: {
     type: Date, 
     required: true
     },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Custom'],
     required: true
     },
  phoneNumber: { 
    type: String, 
    required: true
   },
  profilePicture: { 
    type: String 
  }, // filename string
  coverPicture: { 
    type: String 
  },   // filename string
});

module.exports = mongoose.model('User', userSchema);
