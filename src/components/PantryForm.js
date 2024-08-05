'use client'; // Ensure this is at the top if using client-side hooks

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Import your firebase configuration
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Define custom styles using `styled`
const FormControl = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  width: '100%',
  '& .MuiInputLabel-root': {
    backgroundColor: 'white',
    padding: '0 5px',
  },
  '& .MuiInputBase-root': {
    padding: '10px',
  },
}));

const PantryForm = () => {
  const [item, setItem] = useState({ name: '', quantity: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    if (!item.name || !item.quantity || isNaN(item.quantity)) {
      setError('Please enter a valid item name and quantity.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'pantry'), {
        ...item,
        nameLowercase: item.name.toLowerCase(),
        quantity: parseInt(item.quantity, 10)
      });
      console.log('Item added successfully:', docRef.id);
      setItem({ name: '', quantity: '' });
    } catch (err) {
      console.error('Error adding document:', err);
      setError('Error adding item. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        label="Item Name"
        name="name"
        value={item.name}
        onChange={handleChange}
        required
      />
      <FormControl
        label="Quantity"
        name="quantity"
        type="number"
        value={item.quantity}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained">Add Item</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default PantryForm;
