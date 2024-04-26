const express = require('express');
const router = express.Router();
const web3 = require('../config/blockchainConfig');
const Content = require('../models/contentModel');
const ContentContract = require('../../build/contracts/ContentContract.json'); // Corrected path to the ABI
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');

// Setup contract interaction
let contentContractAddress = process.env.CONTENT_CONTRACT_ADDRESS;
if (!contentContractAddress) {
  console.error("CONTENT_CONTRACT_ADDRESS environment variable is not set.");
  process.exit(1);
}
const contentContract = new web3.eth.Contract(ContentContract.abi, contentContractAddress);

router.post('/upload', auth, [
  body('contentHash').not().isEmpty(),
  body('originalUploader').not().isEmpty(),
  body('polarizationScore').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { contentHash, originalUploader, polarizationScore } = req.body;

  try {
    // Save content metadata in MongoDB
    const newContent = new Content({
      contentHash,
      originalUploader,
      polarizationScore
    });

    await newContent.save();

    // Interact with the blockchain to register the content
    // Assuming you have one account to interact with the contract
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) throw new Error("No accounts available to perform transactions.");

    await contentContract.methods.registerContent(web3.utils.asciiToHex(contentHash))
      .send({ from: accounts[0], gas: 500000 }) // Specifying gas limit
      .then((transaction) => {
        console.log(`Content uploaded and registered successfully: ${contentHash}`, transaction);
      });

    res.status(201).json({
      message: 'Content uploaded and registered successfully',
      contentId: newContent._id
    });
  } catch (error) {
    console.error('Error uploading content:', error);
    res.status(500).json({ message: 'Failed to upload content', error: JSON.stringify(error, Object.getOwnPropertyNames(error)) });
  }
});

router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;

  try {
    const content = await Content.findById(id);

    if (!content) {
      console.log(`Content not found for id: ${id}`);
      return res.status(404).json({ message: 'Content not found' });
    }

    console.log(`Content retrieved successfully for id: ${id}`);
    res.status(200).json(content);
  } catch (error) {
    console.error('Error retrieving content:', error);
    res.status(500).json({ message: 'Failed to retrieve content', error: JSON.stringify(error, Object.getOwnPropertyNames(error)) });
    console.log(`Error details: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);
  }
});

module.exports = router;