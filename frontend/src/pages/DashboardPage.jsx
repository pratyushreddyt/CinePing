import React, { useEffect, useState } from 'react';
import { getAlerts } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AlertCard from '../components/AlertCard';

const DashboardPage = () => {
  const [alerts, setAlerts] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await getAlerts();
        setAlerts(res.data);
      } catch (err) {
        toast.error('Failed to load alerts');
      }
    }
    fetchAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Movie Alerts</h1>
        <div>
          <button onClick={() => navigate('/alerts/new')} className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">Create Alert</button>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
        </div>
      </div>
      <div>
        {alerts.length === 0 ? (
          <div className="text-gray-500">No alerts yet.</div>
        ) : (
          alerts.map(alert => (
            <AlertCard key={alert.id} {...alert} />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
