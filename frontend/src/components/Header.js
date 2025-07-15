import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { role } = useAuth();

  return (
    <header className="card flex-between" style={{ marginBottom: '2rem' }}>
      <h2>MiniHR</h2>
      {role === 'hr' && (
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/add-employee">Add</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
