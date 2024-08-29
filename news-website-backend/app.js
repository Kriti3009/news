// app.js

// Import required modules
const express = require('express');
const axios = require('axios');

// Create an instance of the Express app
const app = express();

// Define API key for News API
const API_KEY = '10df637c23024465ace2902e7162e097';

// Create a cache object to store headlines
const CACHE = {};

/**
 * Handle GET request to /api/headlines
 * Fetch top headlines from News API and cache the response
 */
app.get('/api/headlines', async (req, res) => {
  try {
    // Make a GET request to News API to fetch top headlines
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    
    // Extract the top 5 headlines from the response
    const headlines = response.data.articles.slice(0, 5);
    
    // Cache the headlines
    CACHE.headlines = headlines;
    
    // Return the headlines as JSON response
    res.json(headlines);
  } catch (error) {
    // Handle error and return a 500 error response
    res.status(500).json({ error: error.message });
  }
});

/**
 * Handle GET request to /api/headlines/cache
 * Return cached headlines if available, otherwise return a 404 error
 */
app.get('/api/headlines/cache', (req, res) => {
  if (CACHE.headlines) {
    // Return cached headlines as JSON response
    res.json(CACHE.headlines);
  } else {
    // Return a 404 error response if cache is not available
    res.status(404).json({ error: 'Cache not available' });
  }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});