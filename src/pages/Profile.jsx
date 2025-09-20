import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(() => {
    if (!user) return {};
    const raw = localStorage.getItem(`user_${user}`);
    return raw ? JSON.parse(raw) : {};
  });
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setProfile(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!profile.name || !profile.phone) {
      setError('Name and phone are required.');
      setSuccess('');
      return;
    }
    localStorage.setItem(`user_${profile.email}`, JSON.stringify(profile));
    setEdit(false);
    setSuccess('Profile updated!');
    setError('');
  };

  if (!user) return <div className="container-max py-10">Please log in to view your profile.</div>;

  return (
    <div className="container-max max-w-lg mx-auto py-10">
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-4 text-primary">My Profile</h2>
        {success && <div className="text-green-600 mb-2">{success}</div>}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            {edit ? (
              <input className="input w-full" name="name" value={profile.name || ''} onChange={handleChange} />
            ) : (
              <div className="py-1">{profile.name || <span className="text-gray-400">Not set</span>}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            {edit ? (
              <input className="input w-full" name="phone" value={profile.phone || ''} onChange={handleChange} />
            ) : (
              <div className="py-1">{profile.phone || <span className="text-gray-400">Not set</span>}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <div className="py-1">{profile.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <div className="py-1">{profile.role}</div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          {edit ? (
            <>
              <button className="btn-primary" onClick={handleSave}>Save</button>
              <button className="btn-secondary" onClick={() => setEdit(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => setEdit(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}
