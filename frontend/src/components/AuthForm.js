import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AuthForm = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const switchMode = (m) => {
    setMode(m);
    setForm({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${API_URL}/auth/${mode === 'login' ? 'login' : 'signup'}`;
      const payload = mode === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await axios.post(url, payload);
      if (res.data && res.data.token) {
        const token = res.data.token;
        const user = res.data.data;
        localStorage.setItem('devdir_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        toast.success(res.data.message || (mode === 'login' ? 'Logged in' : 'Signed up'));
        if (onAuthSuccess) onAuthSuccess({ token, user });
      } else {
        toast.error('Unexpected response from server');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Authentication failed';
      toast.error(msg);
      console.error('Auth error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
          <div className="text-sm text-gray-500">
            <button onClick={() => switchMode('login')} className={`px-3 py-1 rounded ${mode === 'login' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>Login</button>
            <button onClick={() => switchMode('signup')} className={`ml-2 px-3 py-1 rounded ${mode === 'signup' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>Sign Up</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md" placeholder="Jane Doe" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md" placeholder="you@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md" placeholder="••••••" />
          </div>

          <div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold">
              {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">Your data is stored locally for this demo.</p>
      </div>
    </div>
  );
};

export default AuthForm;
