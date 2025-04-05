
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
// const Tesseract = require('tesseract.js');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'uploads'))); 

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/image-text-extractor', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('MongoDB connection error:', err));

// const userSchema = new mongoose.Schema({
//   uid: { type: String, required: true, unique: true }, // Google user ID
//   email: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   picture: { type: String },
// });

// const User = mongoose.model('User', userSchema);

// const fileSchema = new mongoose.Schema({
//   batchId: String,
//   originalName: String,
//   filePath: String,
//   size: Number,
//   uploadedAt: { type: Date, default: Date.now },
//   extractedText: String,
// });

// const File = mongoose.model('File', fileSchema);

// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
//   console.log('Uploads directory created');
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function extractTextFromImage(filePath) {
//   try {
//     const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
//     return text || 'No text found';
//   } catch (error) {
//     console.error('Tesseract.js Error:', error);
//     throw new Error('Failed to extract text from image');
//   }
// }

// app.get('/api/get-user/:uid', async (req, res) => {
//   const { uid } = req.params;

//   try {
//     const user = await User.findOne({ uid });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ user });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Failed to fetch user', error: error.message });
//   }
// });

// app.post('/api/save-user', async (req, res) => {
//   const { uid, email, name, picture } = req.body;

//   try {
  
//     const existingUser = await User.findOne({ uid });
//     if (existingUser) {
//       return res.status(200).json({ message: 'User already exists', user: existingUser });
//     }


//     const newUser = new User({ uid, email, name, picture });
//     await newUser.save();

//     res.status(201).json({ message: 'User saved successfully', user: newUser });
//   } catch (error) {
//     console.error('Error saving user:', error);
//     res.status(500).json({ message: 'Failed to save user', error: error.message });
//   }
// });

// app.post('/api/ask', async (req, res) => {
//   const { text, question, purpose, answerType, projectDetails } = req.body;

//   if (!text || !question) {
//     return res.status(400).json({ error: 'Text and question are required' });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
//     let prompt = `Purpose: ${purpose}\n\n`;
//     if (purpose === 'education') {
//       prompt += `Answer Type: ${answerType}\n\n`;
//       if (answerType === 'project') {
//         prompt += `Project Details: ${projectDetails.paragraphs} paragraphs, ${projectDetails.words} words\n\n`;
//       } else if (answerType === 'long') {
//         prompt += `Provide a detailed answer in 3-5 paragraphs with 100-150 words.\n\n`;
//       } else if (answerType === 'short') {
//         prompt += `Provide a concise answer in 2-3 paragraphs with 50-80 words.\n\n`;
//       } else if (answerType === 'one-word') {
//         prompt += `provide me anwer in about 5-6 lines for only a very sort answer.\n\n`;
//       }
//     }
//     prompt += `Given the following text: ${text}\n\nAnswer the following question: ${question}`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const answer = response.text();

//     res.status(200).json({ answer });
//   } catch (error) {
//     console.error('Error asking question:', error);
//     res.status(500).json({ error: 'Failed to get answer from Gemini AI' });
//   }
// });

// app.post('/upload', upload.array('files'), async (req, res) => {
//   try {
//     const files = req.files;

//     if (!files || files.length === 0) {
//       return res.status(400).json({ message: 'No files uploaded' });
//     }

//     const batchId = uuidv4();

//     const savedFiles = await Promise.all(
//       files.map(async (file) => {
//         try {
//           const extractedText = await extractTextFromImage(file.path);
//           const savedFile = await File.create({
//             batchId,
//             originalName: file.originalname,
//             filePath: file.path,
//             size: file.size,
//             extractedText,
//           });
//           return savedFile;
//         } catch (error) {
//           console.error('Error processing file:', file.originalname, error);
//           throw error;
//         }
//       })
//     );

//     res.status(200).json({ message: 'Files uploaded successfully', batchId, savedFiles });
//   } catch (error) {
//     console.error('Error in /upload endpoint:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
// app.use('/uploads', express.static(uploadsDir));

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Tesseract = require('tesseract.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/image-text-extractor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Schemas
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String },
});

const fileSchema = new mongoose.Schema({
  batchId: String,
  originalName: String,
  filePath: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
  extractedText: String,
  analysis: {
    purpose: String,
    answerType: String,
    projectDetails: Object,
    generatedAnswer: String
  }
});

const User = mongoose.model('User', userSchema);
const File = mongoose.model('File', fileSchema);

// File Upload Configuration
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads directory created');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractTextFromImage(filePath) {
  try {
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
    return text || 'No text found';
  } catch (error) {
    console.error('Tesseract.js Error:', error);
    throw new Error('Failed to extract text from image');
  }
}

async function generateAIAnswer(text, purpose, answerType, projectDetails) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    let prompt = `Purpose: ${purpose}\n\n`;
    
    if (purpose === 'education') {
      if (answerType === 'project') {
        prompt += `Create a detailed and interactive  project report with ${projectDetails.paragraphs} paragraphs and approximately ${projectDetails.words} words based on the following content:\n\n${text} `;
      } else if (answerType === 'long') {
        prompt += `Provide a detailed explanation (3-5 paragraphs) of the following educational content:\n\n${text}`;
      } else if (answerType === 'short') {
        prompt += `Provide a concise summary (2-3 paragraph) of the following educational content basically ngive a sort discreption of this question about 2-3 paragraph:\n\n${text}`;
      } else if (answerType === 'one-word') {
        textPrompt = `Summarize this in 2-3 lines maximum: \n\n${text}`;
      }
    } else if (purpose === 'finance') {
      prompt += `Analyze this financial document and provide key insights:\n\n${text}`;
    } else if (purpose === 'health') {
      prompt += `Explain this medical information in clear terms:\n\n${text}`;
    } else {
      prompt += `Summarize the key points from this document:\n\n${text}`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI answer:', error);
    throw new Error('Failed to generate AI answer');
  }
}

// API Endpoints
app.get('/api/get-user/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
});

app.post('/api/save-user', async (req, res) => {
  try {
    const { uid, email, name, picture } = req.body;
    const existingUser = await User.findOne({ uid });
    
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    const newUser = new User({ uid, email, name, picture });
    await newUser.save();
    res.status(201).json({ message: 'User saved successfully', user: newUser });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Failed to save user', error: error.message });
  }
});

app.post('/api/ask', async (req, res) => {
  try {
    const { text, question, purpose, answerType, projectDetails } = req.body;
    if (!text || !question) {
      return res.status(400).json({ error: 'Text and question are required' });
    }

    const answer = await generateAIAnswer(text, purpose, answerType, projectDetails);
    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error asking question:', error);
    res.status(500).json({ error: 'Failed to get answer from Gemini AI' });
  }
});

app.post('/upload', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const { purpose, answerType, projectDetails } = req.body;
    const batchId = uuidv4();

    const savedFiles = await Promise.all(
      req.files.map(async (file) => {
        const extractedText = await extractTextFromImage(file.path);
        const generatedAnswer = await generateAIAnswer(extractedText, purpose, answerType, projectDetails);
        
        return await File.create({
          batchId,
          originalName: file.originalname,
          filePath: file.path,
          size: file.size,
          extractedText,
          analysis: {
            purpose,
            answerType,
            projectDetails,
            generatedAnswer
          }
        });
      })
    );

    res.status(200).json({ 
      message: 'Files uploaded and analyzed successfully', 
      batchId, 
      savedFiles: savedFiles.map(file => ({
        originalName: file.originalName,
        extractedText: file.extractedText,
        generatedAnswer: file.analysis.generatedAnswer
      }))
    });
  } catch (error) {
    console.error('Error in /upload endpoint:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/files/:batchId', async (req, res) => {
  try {
    const files = await File.find({ batchId: req.params.batchId });
    if (!files.length) return res.status(404).json({ message: 'No files found for this batch' });
    
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Failed to fetch files', error: error.message });
  }
});

app.use('/uploads', express.static(uploadsDir));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});