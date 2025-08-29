import React, { useEffect, useState } from 'react';
import { getAlertHistory } from '../api';
import { toast } from 'react-toastify';
import AlertCard from '../components/AlertCard';

const AlertHistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await getAlertHistory();
        setHistory(res.data);
      } catch (err) {
        toast.error('Failed to load alert history');
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Alert History</h1>
      <div>
        {history.length === 0 ? (
          <div className="text-gray-500">No alert history found.</div>
        ) : (
          history.map(alert => (
            <AlertCard key={alert.id} {...alert} />
          ))
        )}
      </div>
    </div>
  );
};

export default AlertHistoryPage;
