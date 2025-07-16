// src/pages/Employees.js
import { useEffect, useState, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import EmployeeRow from '../components/EmployeeRow';
import './Employees.css';

const Employees = () => {
  const { role } = useAuth();
  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  useEffect(() => {
    const fetchEmployees = async () => {
      const snap = await getDocs(collection(db, 'employees'));
      setEmployees(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    if (role === 'hr') fetchEmployees();
  }, [role]);

  const filteredEmployees = useMemo(() => {
    let data = [...employees];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (e) => e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q),
      );
    }

    // department filter
    if (departmentFilter) {
      data = data.filter((e) => e.department === departmentFilter);
    }

    // sorting
    switch (sortBy) {
      case 'name-desc':
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'date-asc':
        data.sort((a, b) => new Date(a.joiningDate) - new Date(b.joiningDate));
        break;
      case 'date-desc':
        data.sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate));
        break;
      default:
        data.sort((a, b) => a.name.localeCompare(b.name));
    }

    return data;
  }, [employees, search, departmentFilter, sortBy]);

  if (role !== 'hr') return <p className="access-denied">🚫 Access Denied – HR only.</p>;

  const departments = Array.from(new Set(employees.map((e) => e.department || 'Unknown')));

  return (
    <div className="employees-container">
      <h2 className="employees-title">👥 Employee Directory</h2>

      {/* Filters */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder="🔍 Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name-asc">Name ↑</option>
          <option value="name-desc">Name ↓</option>
          <option value="date-asc">Joining Date ↑</option>
          <option value="date-desc">Joining Date ↓</option>
        </select>
      </div>

      {/* Table */}
      <div className="employee-table">
        <div className="table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Department</span>
          <span>Joining Date</span>
          <span>Actions</span>
        </div>
        {filteredEmployees.map((emp) => (
          <EmployeeRow key={emp.id} emp={emp} />
        ))}
      </div>
    </div>
  );
};

export default Employees;
