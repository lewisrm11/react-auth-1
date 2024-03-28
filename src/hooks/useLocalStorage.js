import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    // Get the initial value from localStorage or use the provided initialValue
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  
    // Create a state variable to hold the current value
    const [value, setValue] = useState(initial);
  
    // Update localStorage whenever the value changes
    useEffect(() => {
      if (value === null || value === '') {
        localStorage.removeItem(key); // Remove the item from localStorage
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      setValue(value); // Set the internal state to null
    }, [key, value]);
  
    return [value, setValue];
};