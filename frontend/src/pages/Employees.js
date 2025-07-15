import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const { user, role } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      const snap = await getDocs(collection(db, 'employees'));
      setEmployees(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    if (role === 'hr') fetchEmployees();
  }, [role]);

  if (role !== 'hr') return <p>Access Denied – HR only.</p>;

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            <strong>{emp.name}</strong> — {emp.department} — {emp.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
