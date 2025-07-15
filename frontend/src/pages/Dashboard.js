import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const Dashboard = () => (
  <div>
    <h1>Welcome to MiniHR Dashboard!</h1>

    {/* link to employee management (HR only) */}
    <p>
      <Link to="/employees">Go to Employee Management</Link>
    </p>

    <LogoutButton />
  </div>
);

export default Dashboard;
