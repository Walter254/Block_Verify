const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the date to the original filename
  },
});
const upload = multer({ storage: storage });

router.post('/upload', authMiddleware, upload.single('file'), [
  body('text').not().isEmpty().withMessage('Text content is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Ensure the uploads directory exists
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads', { recursive: true });
  }

  try {
    const { text } = req.body;
    const file = req.file;

    // Log the received file and text
    console.log('Received file:', file);
    console.log('Received text:', text);

    // Here you would typically process the file and text, e.g., save them to the database
    // For demonstration, we'll just return a success response
    res.status(200).json({ message: 'File and text uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file and text:', error);
    res.status(500).json({ message: 'Failed to upload file and text', error: error.toString() });
  }
});

module.exports = router;