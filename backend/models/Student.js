const mongoose = require('mongoose');

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  images: [
    {
     batchId: String,
      url: String, // URL or path to the image
      originalName: String, // Original file name
      size: Number, // File size in bytes
      uploadedAt: { type: Date, default: Date.now }, // Timestamp
    },
  ],
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;