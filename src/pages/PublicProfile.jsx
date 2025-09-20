import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockListings as seed } from '../data/listings.js';

export default function PublicProfile() {
  const { email } = useParams();
  const [profile, setProfile] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (!email) return;
    const raw = localStorage.getItem(`user_${email}`);
    setProfile(raw ? JSON.parse(raw) : null);
    // Show all listings by this user (from seed and their own)
    const sellerListings = [
      ...seed.filter(i => i.seller === email),
      ...(JSON.parse(localStorage.getItem(`seller_listings_${email}`) || '[]'))
    ];
    setListings(sellerListings);
  }, [email]);

  if (!profile) return <div className="container-max py-10">User not found.</div>;

  return (
    <div className="container-max max-w-2xl mx-auto py-10">
      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-2 text-primary">{profile.name || profile.email}</h2>
        <div className="text-gray-700 mb-2">{profile.email}</div>
        <div className="mb-2"><span className="font-medium">Phone:</span> {profile.phone || <span className="text-gray-400">Not set</span>}</div>
        <div className="mb-2"><span className="font-medium">Role:</span> {profile.role}</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Listings by {profile.name || profile.email}</h3>
        {listings.length === 0 ? (
          <div className="text-gray-500">No listings yet.</div>
        ) : (
          <ul className="space-y-4">
            {listings.map(item => (
              <li key={item.id} className="p-4 bg-white rounded shadow">
                <div className="font-bold">{item.title}</div>
                <div className="text-sm text-gray-600">UGX {item.price.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{item.category} · {item.type}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
