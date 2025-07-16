import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Dashboard.css'; // ← new CSS file

const Dashboard = () => {
  const { role } = useAuth();
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [deptStats, setDeptStats] = useState({});

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      const snap = await getDocs(collection(db, 'employees'));
      const employees = snap.docs.map((d) => d.data());

      setTotalEmployees(employees.length);

      const deptCount = {};
      employees.forEach((emp) => {
        const dept = emp.department || 'Unknown';
        deptCount[dept] = (deptCount[dept] || 0) + 1;
      });
      setDeptStats(deptCount);
    };

    if (role === 'hr') fetchEmployeeStats();
  }, [role]);

  if (role !== 'hr') return <p className="access-denied">Access denied – HR only.</p>;

  return (
    <div className="dash-wrapper">
      {/* TOP HERO */}
      <section className="hero card">
        <h1>👋 Welcome to MiniHR</h1>
        <p className="subtitle">Manage employees, view stats, and streamline HR processes.</p>
      </section>

      {/* QUICK ACTIONS */}
      <section className="quick-actions">
        <Link to="/employees" className="action-card card">
          📋 <span>Employee Records</span>
        </Link>
        <Link to="/add-employee" className="action-card card">
          ➕ <span>Add Employee</span>
        </Link>
      </section>

      {/* STATS */}
      <section className="stats-grid">
        <div className="stat-card card">
          <p className="stat-number">{totalEmployees}</p>
          <p className="stat-label">Total Employees</p>
        </div>

        {Object.entries(deptStats).map(([dept, count]) => (
          <div key={dept} className="stat-card card">
            <p className="stat-number">{count}</p>
            <p className="stat-label">{dept}</p>
          </div>
        ))}
      </section>

      <div className="logout-wrap">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Dashboard;
