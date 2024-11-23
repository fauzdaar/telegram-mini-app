import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState(""); // To store the username or fallback message
  const [error, setError] = useState(""); // To capture errors if any occur

  useEffect(() => {
    try {
      // Check if Telegram WebApp object exists
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp; // Access Telegram WebApp object
        tg.ready(); // Notify Telegram that the Web App is ready

        const user = tg.initDataUnsafe?.user; // Get user information from Telegram
        if (user) {
          setUsername(user.username || user.first_name || "Guest"); // Set username
        } else {
          setUsername("Guest"); // Default fallback
        }
      } else {
        throw new Error("Telegram WebApp is not available. Ensure you are running this in Telegram.");
      }
    } catch (err) {
      console.error(err.message); // Log error for debugging
      setError(err.message); // Display error message to the user
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Telegram Mini App!</h1>
      {error ? (
        <h2 style={{ color: "red" }}>{error}</h2> // Display error if any
      ) : (
        username ? (
          <h2>Hello, {username}! 👋</h2> // Display username
        ) : (
          <h2>Fetching your details...</h2> // Loading state
        )
      )}
    </div>
  );
}

export default App;
