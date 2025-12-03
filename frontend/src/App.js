import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import SearchFilter from './components/SearchFilter';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Fetch developers on component mount
  useEffect(() => {
    fetchDevelopers();
  }, []);

  // Apply filters when developers, searchTerm, or roleFilter changes
  useEffect(() => {
    applyFilters();
  }, [developers, searchTerm, roleFilter]);

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/developers`);
      if (response.data.success) {
        setDevelopers(response.data.data);
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

  const deleteDeveloper = async (id) => {
    try {
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
    <div className="min-h-screen py-8 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Developer Directory
          </h1>
          <p className="text-white/90 text-lg">
            Manage and discover talented developers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <DeveloperForm onAddDeveloper={addDeveloper} />
          </div>

          {/* Right Column - List */}
          <div className="lg:col-span-2">
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              totalCount={developers.length}
              filteredCount={filteredDevelopers.length}
            />
            
            <DeveloperList
              developers={filteredDevelopers}
              loading={loading}
              onDelete={deleteDeveloper}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
