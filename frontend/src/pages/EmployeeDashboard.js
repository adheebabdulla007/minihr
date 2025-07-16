import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
//import LogoutButton from '../components/LogoutButton';
import '../styles/EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const { user, role } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || role !== 'employee') return;

      try {
        const docRef = doc(db, 'employees', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error('Error fetching employee profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, role]);

  if (loading) return <p className="loading">Loading profile…</p>;
  if (role !== 'employee')
    return <p className="access-denied">🚫 Access Denied – employee only.</p>;
  if (!profile) return <p className="access-denied">Profile not found – please contact HR.</p>;

  const joinDate = profile.joiningDate ? new Date(profile.joiningDate).toLocaleDateString() : '-';

  return (
    <div className="empdash-container">
      <div className="profile-card card">
        <div className="avatar">{profile.name.charAt(0).toUpperCase()}</div>

        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p className="email">{profile.email}</p>

          <div className="meta-row">
            <span className="badge">{profile.department || 'Unknown'}</span>
            <span className="meta">Joined: {joinDate}</span>
          </div>

          <div className="meta-row">
            <span className="meta">📞 {profile.phone || '—'}</span>
          </div>
        </div>
      </div>

      <div className="quick-links">
        <div className="qcard card">🕒 View Attendance (coming soon)</div>
        <div className="qcard card">📝 Request Leave (coming soon)</div>
        <div className="qcard card">📣 Announcements (coming soon)</div>
      </div>

      {/*<div className="logout-wrap">
        <LogoutButton />
      </div>*/}
    </div>
  );
};

export default EmployeeDashboard;
