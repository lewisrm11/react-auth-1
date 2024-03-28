// LandingPage.js
import React from 'react';

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to Our App!</h1>
      <p>Click below to login or register.</p>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  );
}

export default LandingPage;