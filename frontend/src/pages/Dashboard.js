import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const { role } = useAuth();
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [deptStats, setDeptStats] = useState({});

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'employees'));
        const employees = querySnapshot.docs.map((doc) => doc.data());

        setTotalEmployees(employees.length);

        const departmentCount = {};
        employees.forEach((emp) => {
          const dept = emp.department || 'Unknown';
          departmentCount[dept] = (departmentCount[dept] || 0) + 1;
        });

        setDeptStats(departmentCount);
      } catch (error) {
        console.error('Error fetching employee stats:', error);
      }
    };

    if (role === 'hr') {
      fetchEmployeeStats();
    }
  }, [role]);

  if (role !== 'hr') {
    return <p>Access Denied: Only HRs can access the dashboard.</p>;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to MiniHR Dashboard!</h1>

        <p>
          <strong>Total Employees:</strong> {totalEmployees}
        </p>

        <h3>Department-wise Employee Count:</h3>
        <ul>
          {Object.entries(deptStats).map(([dept, count]) => (
            <li key={dept}>
              {dept}: {count}
            </li>
          ))}
        </ul>

        <p>
          <Link to="/employees">📋 View Employee Management</Link>
          <br />
          <Link to="/add-employee">➕ Add New Employee</Link>
        </p>

        <LogoutButton />
      </div>
    </div>
  );
};

export default Dashboard;
