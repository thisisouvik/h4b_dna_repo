const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
app.post('/api/encode', upload.single('file'), async (req, res) => {
  try {
    const { text, encodingMethod, compression, optimizationLevel } = req.body;
    const file = req.file;

    // Validate input
    if (!text && !file) {
      return res.status(400).json({ error: 'Either text or file must be provided' });
    }

    // Process the input
    let inputData;
    if (text) {
      inputData = text;
    } else if (file) {
      // Read file content
      const fs = require('fs');
      inputData = fs.readFileSync(file.path, 'utf8');
    }

    // TODO: Implement actual DNA encoding logic here
    const encodedSequence = `ATCG${inputData.length}`; // Placeholder

    res.json({
      success: true,
      dna_sequence: encodedSequence,
      original_size: inputData.length,
      encoded_size: encodedSequence.length
    });
  } catch (error) {
    console.error('Encoding error:', error);
    res.status(500).json({ error: 'An error occurred during encoding' });
  }
});

app.post('/api/decode', upload.single('file'), async (req, res) => {
  try {
    const { text, encodingMethod, compression, optimizationLevel } = req.body;
    const file = req.file;

    // Validate input
    if (!text && !file) {
      return res.status(400).json({ error: 'Either text or file must be provided' });
    }

    // Process the input
    let inputData;
    if (text) {
      inputData = text;
    } else if (file) {
      // Read file content
      const fs = require('fs');
      inputData = fs.readFileSync(file.path, 'utf8');
    }

    // TODO: Implement actual DNA decoding logic here
    const decodedText = `Decoded: ${inputData}`; // Placeholder

    res.json({
      success: true,
      decoded_text: decodedText,
      original_size: inputData.length,
      decoded_size: decodedText.length
    });
  } catch (error) {
    console.error('Decoding error:', error);
    res.status(500).json({ error: 'An error occurred during decoding' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});