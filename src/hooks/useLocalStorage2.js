import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  console.log(`\x1b[96m useLocalStorage ----->\x1b[0m`, {key, initialValue})

  const [storedValue, setStoredValue] = useState(() => {
    console.log(`\x1b[95m useLocalStorage state **** \x1b[0m`)
    try {
      const item = window.localStorage.getItem(key);
      console.log(`\x1b[95m item **** \x1b[0m`, {item})
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    console.log(`\x1b[95m setValue::::: \x1b[0m`, {value})
    // Handle setting empty string as removal
    if (value === '' || value === null) {
        window.localStorage.removeItem(key);
        setStoredValue(value);
      } else {
        try {
          // Allow value to be a function so we have access to previous state
          //const newValue = value instanceof Function ? value(storedValue) : value;
          window.localStorage.setItem(key, JSON.stringify(value));
          setStoredValue(value);
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newValue = window.localStorage.getItem(key);
      /**
       * @todo fix
       * when set a null value for example in logout,
       * the storage event not fire and if two tabs is open, only tab refresh
       * but when set is a true value, for example in login
       * both tabs refresh correctly
       */
      if (newValue && newValue !== JSON.stringify(storedValue)) {
        setStoredValue(JSON.parse(newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, storedValue]);

  return [storedValue, setValue];
};