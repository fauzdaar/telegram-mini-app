import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp; // Access Telegram WebApp object
      tg.ready(); // Notify Telegram that the Web App is ready
      const user = tg.initDataUnsafe?.user; // Get user information
      if (user) {
        setUsername(user.username || user.first_name || "Guest");
      }
    }
    else {
      console.error("Telegram WebApp is not available.");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Telegram Mini App!</h1>
      {username ? (
        <h2>Hello, {username}! 👋</h2>
      ) : (
        <h2>Fetching your details...</h2>
      )}
    </div>
  );
}

export default App;
