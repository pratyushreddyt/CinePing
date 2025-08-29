import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      setAuth(res.data.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 mb-4 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        <p className="mt-4 text-center">Don't have an account? <a href="/signup" className="text-blue-600">Sign up</a></p>
      </form>
    </div>
  );
};

export default LoginPage;
