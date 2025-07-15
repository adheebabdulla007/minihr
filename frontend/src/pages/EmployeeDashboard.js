import React from 'react';
import LogoutButton from '../components/LogoutButton';

const EmployeeDashboard = () => (
  <div className="container">
    <div className="card">
      <h2>Welcome Employee 👋</h2>
      <p>This is your dashboard view.</p>
      <LogoutButton />
    </div>
  </div>
);

export default EmployeeDashboard;
