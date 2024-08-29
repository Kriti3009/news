import React, { useState, useEffect } from 'react';

// API key and URL for news API
const API_KEY = '10df637c23024465ace2902e7162e097';
const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;

const NewsAPI = () => {
  // Initialize state variables
  const [headlines, setHeadlines] = useState([]); // array to store headlines
  const [error, setError] = useState(null); // error message
  const [loading, setLoading] = useState(false); // loading indicator

  useEffect(() => {
    // Function to fetch headlines from API
    const fetchHeadlines = async () => {
      try {
        // Set loading indicator to true
        setLoading(true);

        // Fetch data from API
        const response = await fetch(API_URL);

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();

        // Update headlines state with fetched data
        setHeadlines(data.articles);
      } catch (error) {
        // Handle error
        if (error instanceof Error) {
          setError(`Error: ${error.message}`);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        // Set loading indicator to false
        setLoading(false);
      }
    };

    // Call fetchHeadlines function
    fetchHeadlines();
  }, []); // Run effect only once, on mount

  return (
    <div>
      {loading ? (
        // Display loading message
        <p>Loading...</p>
      ) : (
        headlines.length > 0 ? (
          // Display headlines list
          <ul>
            {headlines.slice(0, 5).map(headline => (
              <li key={headline.title}>
                <h2>{headline.title}</h2>
                <p>Source: {headline.source.name}</p>
                <p>Published: {headline.publishedAt}</p>
              </li>
            ))}
          </ul>
        ) : (
          // Display no headlines message
          <p>No headlines available.</p>
        )
      )}
      {error && (
        // Display error message
        <p style={{ color: 'red' }}>{error}</p>
      )}
    </div>
  );
};

export default NewsAPI;