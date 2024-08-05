'use client'; // Ensure this is at the top if using client-side hooks

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore'; // Import from 'firebase/firestore'
import { db } from '../firebase'; // Ensure db is imported here
import SearchBar from './SearchBar';

const PantryList = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchItems = () => {
      let q;
      const lowerCaseQuery = searchQuery.toLowerCase();
      if (searchQuery) {
        q = query(
          collection(db, 'pantry'),
          where('nameLowercase', '>=', lowerCaseQuery),
          where('nameLowercase', '<=', lowerCaseQuery + '\uf8ff')
        );
      } else {
        q = query(
          collection(db, 'pantry'),
          orderBy('name')
        );
      }
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const itemsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        console.log('Fetched items:', itemsData);
        setItems(itemsData);
      }, (error) => {
        console.error('Error fetching items:', error);
      });
  
      return () => unsubscribe();
    };
  
    fetchItems();
  }, [searchQuery]);
  

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'pantry', id));
      console.log('Item deleted successfully');
      // Update the local state to remove the deleted item
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  
  const incrementQuantity = async (id) => {
    try {
      const itemRef = doc(db, 'pantry', id);
      await updateDoc(itemRef, {
        quantity: increment(1)
      });
      console.log('Quantity incremented successfully');
    } catch (error) {
      console.error('Error incrementing quantity: ', error);
    }
  };

  const decrementQuantity = async (id) => {
    try {
      const itemRef = doc(db, 'pantry', id);
      await updateDoc(itemRef, {
        quantity: increment(-1)
      });
      console.log('Quantity decremented successfully');
    } catch (error) {
      console.error('Error decrementing quantity: ', error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <ul>
        {items.map((item) => (
          <div className="listContainer" key={item.id}>
            <li className="listItem">{item.name} - {item.quantity}</li>
            <div className="buttonGroup">
              <button className="deleteButton" onClick={() => deleteItem(item.id)}>Delete</button>
              <button className="Decrease" onClick={() => decrementQuantity(item.id)}> - </button>
              <button className="Increase" onClick={() => incrementQuantity(item.id)}> + </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PantryList;
