import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAlert } from '../api';
import { toast } from 'react-toastify';

const notificationTypes = [
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'Push', value: 'push' },
];

const CreateAlertPage = () => {
  const [form, setForm] = useState({
    movie: '',
    theatre: '',
    city: '',
    language: '',
    actor: '',
    notifications: [],
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = type => {
    setForm(form => ({
      ...form,
      notifications: form.notifications.includes(type)
        ? form.notifications.filter(t => t !== type)
        : [...form.notifications, type],
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createAlert(form);
      toast.success('Alert created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create alert');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Movie Alert</h2>
        <input name="movie" type="text" placeholder="Movie Name" value={form.movie} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
        <input name="theatre" type="text" placeholder="Theatre Name" value={form.theatre} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
        <input name="city" type="text" placeholder="City" value={form.city} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
        <input name="language" type="text" placeholder="Language" value={form.language} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="actor" type="text" placeholder="Actor" value={form.actor} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <div className="mb-4">
          <div className="font-semibold mb-2">Notification Types:</div>
          {notificationTypes.map(nt => (
            <label key={nt.value} className="mr-4">
              <input type="checkbox" checked={form.notifications.includes(nt.value)} onChange={() => handleCheckbox(nt.value)} /> {nt.label}
            </label>
          ))}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Alert</button>
      </form>
    </div>
  );
};

export default CreateAlertPage;
