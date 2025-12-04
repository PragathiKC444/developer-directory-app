import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { Loading } from './components/Loading';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DeveloperDirectory from './pages/DeveloperDirectory';
import DeveloperProfile from './pages/DeveloperProfile';
import DeveloperForm from './pages/DeveloperForm';

import './index.css';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <Loading />;
  if (!token) return <Navigate to="/login" />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <Loading />;
  if (token) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          
          <Route path="/" element={<ProtectedRoute><DeveloperDirectory /></ProtectedRoute>} />
          <Route path="/developer/:id" element={<ProtectedRoute><DeveloperProfile /></ProtectedRoute>} />
          <Route path="/add-developer" element={<ProtectedRoute><DeveloperForm /></ProtectedRoute>} />
          <Route path="/edit-developer/:id" element={<ProtectedRoute><DeveloperForm /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
