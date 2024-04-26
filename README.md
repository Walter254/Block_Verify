# Block_Verify

Block_Verify harnesses blockchain technology to ensure the authenticity and integrity of digital content. It differentiates between AI-generated and human-created content and evaluates text for bias, providing a comprehensive solution for content verification in the digital age.

## Overview

Block_Verify uses a combination of ReactJS for the frontend and Node.js with Express for the backend, ensuring a responsive user interface and efficient server-side logic. The Ethereum blockchain, simulated with Ganache for development, along with Solidity smart contracts, underpins the system's core. MongoDB stores non-blockchain data, while Python, with libraries such as NLTK, TextBlob, and OpenCV, handles text and image processing. The project employs Web3.js for blockchain interactions and various development tools like Truffle Suite for deployment and testing.

## Features

- **Content Verification**: Ensures content authenticity by tracing back to its origin using blockchain technology.
- **AI Detection**: Differentiates between AI-generated and human-created content using AI detection algorithms.
- **Polarization Analysis**: Evaluates text for bias, helping to understand the neutrality of the content.
- **Edit History**: Tracks changes and edits to content, maintaining a transparent history of modifications.

## Getting Started

### Requirements

- Node.js and npm
- Ganache (for local blockchain simulation)
- Truffle Suite (for smart contract deployment)
- MongoDB account
- Python (for text and image processing)

### Quickstart

1. Install Node.js, npm, and Python.
2. Set up Ganache for a local Ethereum blockchain simulation.
3. Install Truffle with `npm install -g truffle` for smart contract management.
4. Configure MongoDB for data storage.
5. Initialize the project, setting up the frontend and backend structures as described.
6. Deploy the smart contracts using Truffle and interact with them using the frontend.

### License

Copyright (c) 2024.