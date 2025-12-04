import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import SearchFilter from './components/SearchFilter';
import AuthForm from './components/AuthForm';
import DeveloperProfile from './components/DeveloperProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [auth, setAuth] = useState({ token: null, user: null });
  const [editDeveloper, setEditDeveloper] = useState(null);

  // initialize auth from localStorage
  useEffect(() => {
    const token = localStorage.getItem('devdir_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuth(prev => ({ ...prev, token }));
    }

    // response interceptor to catch 401
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          handleLogout();
          toast.error('Session expired. Please login again.');
        }
        return Promise.reject(err);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // Fetch developers when authenticated
  useEffect(() => {
    if (auth.token) fetchDevelopers();
  }, [auth.token]);

  // Re-fetch when filters/sort/page/limit change
  useEffect(() => {
    if (auth.token) {
      fetchDevelopers({ q: searchTerm, role: roleFilter, sort, page, limit });
    }
  }, [searchTerm, roleFilter, sort, page, limit]);

  // Update filtered list when server returns developers
  useEffect(() => {
    setFilteredDevelopers(developers);
  }, [developers]);

  const handleAuthSuccess = ({ token, user }) => {
    setAuth({ token, user });
  };

  const handleLogout = () => {
    localStorage.removeItem('devdir_token');
    delete axios.defaults.headers.common['Authorization'];
    setAuth({ token: null, user: null });
    setDevelopers([]);
  };

  const fetchDevelopers = async (opts = {}) => {
    setLoading(true);
    try {
      const { page, limit, q, role, sort } = opts;
      const params = {};
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (q) params.q = q;
      if (role && role !== 'All') params.role = role;
      if (sort) params.sort = sort;

      const response = await axios.get(`${API_URL}/developers`, { params });
      if (response.data.success) {
        setDevelopers(response.data.data);
        // update pagination info if provided
        if (response.data.total) setTotal(response.data.total);
        if (response.data.page) setPage(response.data.page);
        if (response.data.limit) setLimit(response.data.limit);
      }
    } catch (error) {
      toast.error('Failed to fetch developers');
      console.error('Error fetching developers:', error);
    } finally {
      setLoading(false);
    }
  };

  const addDeveloper = async (developerData) => {
    try {
      const response = await axios.post(`${API_URL}/developers`, developerData);
      if (response.data.success) {
        toast.success('Developer added successfully! 🎉');
        await fetchDevelopers();
        return true;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add developer';
      toast.error(errorMessage);
      console.error('Error adding developer:', error);
      return false;
    }
  };

  const updateDeveloper = async (id, developerData) => {
    try {
      const response = await axios.put(`${API_URL}/developers/${id}`, developerData);
      if (response.data.success) {
        toast.success('Developer updated successfully');
        setEditDeveloper(null);
        await fetchDevelopers();
        return true;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update developer';
      toast.error(errorMessage);
      console.error('Error updating developer:', error);
      return false;
    }
  };

  const deleteDeveloper = async (id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this developer?');
      if (!confirmed) return;
      const response = await axios.delete(`${API_URL}/developers/${id}`);
      if (response.data.success) {
        toast.success('Developer removed successfully');
        await fetchDevelopers();
      }
    } catch (error) {
      toast.error('Failed to delete developer');
      console.error('Error deleting developer:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...developers];

    // Role filter
    if (roleFilter !== 'All') {
      filtered = filtered.filter(dev => dev.role === roleFilter);
    }

    // Search filter (name or tech stack)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(dev =>
        dev.name.toLowerCase().includes(term) ||
        dev.techStack.toLowerCase().includes(term)
      );
    }

    setFilteredDevelopers(filtered);
  };

  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      {!auth.token ? (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      ) : (
        <Routes>
          <Route path="/developers/:id" element={
            <DeveloperProfile />
          } />

          <Route path="/" element={
            <div className="min-h-screen py-8 px-4">
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h1 className="text-5xl font-bold text-white mb-3">Developer Directory</h1>
                    <p className="text-white/90 text-lg">Manage and discover talented developers</p>
                  </div>
                  <div>
                    <button onClick={handleLogout} className="px-4 py-2 bg-white text-gray-800 rounded-lg">Logout</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Form */}
                  <div className="lg:col-span-1">
                    <DeveloperForm onAddDeveloper={addDeveloper} editDeveloper={editDeveloper} onUpdate={updateDeveloper} onCancelEdit={() => setEditDeveloper(null)} />
                  </div>

                  {/* Right Column - List */}
                  <div className="lg:col-span-2">
                        <SearchFilter
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          roleFilter={roleFilter}
                          setRoleFilter={setRoleFilter}
                          sort={sort}
                          setSort={setSort}
                          totalCount={developers.length}
                          filteredCount={filteredDevelopers.length}
                        />
                    
                    <DeveloperList
                      developers={filteredDevelopers}
                      loading={loading}
                      onDelete={deleteDeveloper}
                      onEdit={(dev) => setEditDeveloper(dev)}
                    />

                    {/* Pagination controls */}
                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total: {total}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { if (page > 1) setPage(page - 1); }} className="px-3 py-2 bg-white border rounded">Previous</button>
                        <span className="px-3">Page {page}</span>
                        <button onClick={() => { if (page * limit < total) setPage(page + 1); }} className="px-3 py-2 bg-white border rounded">Next</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
