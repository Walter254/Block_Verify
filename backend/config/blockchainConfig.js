const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file into process.env

// Validate that MNEMONIC and BLOCKCHAIN_URL have been set in the environment variables
if (!process.env.MNEMONIC) {
    throw new Error('The MNEMONIC environment variable is not set.');
}

const blockchainURL = process.env.BLOCKCHAIN_URL || 'http://127.0.0.1:8545';

// Set up the provider with the mnemonic and URL. Specify the account index if needed.
const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    blockchainURL,
    0, // Start index of the accounts generated from the mnemonic
    1  // Total number of accounts to generate
);

const web3 = new Web3(provider);

// Function to check the balance of the first account
async function checkBalance() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        console.error("No accounts found. Check the HDWalletProvider setup.");
        return;
    }
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log(`Balance for account ${accounts[0]}: ${web3.utils.fromWei(balance, 'ether')} ETH`);
}

// Perform the balance check and log results
checkBalance().catch(err => {
    console.error("Failed to fetch account balance:", err.message);
});

// Clean up the provider and the Web3 instance when the process exits
process.on('exit', () => {
    provider.engine.stop(); // This ensures that the provider's event listeners are properly cleaned up
});

module.exports = web3;
