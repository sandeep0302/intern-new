const axios = require('axios');
const Transaction = require('../models/Transaction');

const THIRD_PARTY_API = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

const initializeDatabase = async () => {
  try {
    // Check if database is already initialized
    const existingCount = await Transaction.countDocuments();
    if (existingCount > 0) {
      return { message: 'Database already initialized' };
    }

    // Fetch data from third party API
    const response = await axios.get(THIRD_PARTY_API);
    const transactions = response.data;

    // Insert data into database
    await Transaction.insertMany(transactions);
    
    return { message: `Database initialized with ${transactions.length} records` };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw new Error('Failed to initialize database');
  }
};

module.exports = { initializeDatabase };