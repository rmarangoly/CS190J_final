'use client';  // Add this line at the top

import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';

const List = () => {
  // State hooks to manage form inputs and confirmation message
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new item object
    const newItem = { name, price, description };
    
    // Retrieve existing items from localStorage or initialize an empty array
    const items = JSON.parse(localStorage.getItem('items')) || [];
    
    // Add the new item to the list
    items.push(newItem);
    
    // Store the updated list back in localStorage
    localStorage.setItem('items', JSON.stringify(items));
    
    // Set a confirmation message
    setMessage('Item listed successfully!');
    
    // Clear form fields
    setName('');
    setPrice('');
    setDescription('');
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // Clear message after 3 seconds

      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [message]);

  return (
    <div>
      <nav>
        <ul style={navStyle}>
          <li><a href="/">Home</a></li>
          <li><a href="/sellpage">List an Item</a></li>
          <li><a href="/ownedpage">My Listings</a></li>
        </ul>
      </nav>
      <h1>List an Item</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={fieldStyle}>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div style={fieldStyle}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>List Item</button>
      </form>
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

// Inline styles for simplicity
const navStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  padding: 0,
  marginBottom: '20px',
  backgroundColor: '#333',
  color: 'white',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: '0 auto',
};

const fieldStyle = {
  marginBottom: '15px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const messageStyle = {
  marginTop: '20px',
  color: 'green',
  fontWeight: 'bold',
  textAlign: 'center',
};

export default List;
