// DashboardComponent.js
import React, { useContext, useState } from 'react';
import LogoutComponent from './LogoutComponent'; // Import Logout component
import { AuthContext } from '../context/AuthContext';

function DashboardComponent() {
  const { isAuthenticated, user} = useContext(AuthContext);



  if (!isAuthenticated) {
    return <p>You are not logged in.</p>;
  }


  
  return (
    <div>
      <h1>Welcome to the Dashboard, {user.name}!</h1>
      {/* Add content for the dashboard, potentially fetching data or displaying user-specific information */}
      <LogoutComponent/> {/* Added Logout button */}
    </div>
  );
}

export default DashboardComponent;