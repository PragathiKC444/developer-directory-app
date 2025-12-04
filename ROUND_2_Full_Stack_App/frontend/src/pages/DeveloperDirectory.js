import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { developerAPI } from '../services/api';
import { LoadingSpinner } from './Loading';
import { Search, Filter, Trash2, Edit2 } from 'lucide-react';

export const DeveloperDirectory = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      const res = await developerAPI.getAll({
        search,
        role: role || undefined,
        sortBy: sortBy || undefined,
        page,
        limit: 10
      });
      setDevelopers(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error('Failed to load developers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, role, sortBy]);

  useEffect(() => {
    fetchDevelopers();
  }, [search, role, sortBy, page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this developer?')) {
      try {
        await developerAPI.delete(id);
        toast.success('Developer deleted successfully');
        fetchDevelopers();
      } catch (error) {
        toast.error('Failed to delete developer');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Developer Directory</h1>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or tech stack..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Roles</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full-Stack">Full-Stack</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Sort By</option>
                <option value="experience-asc">Experience (Low to High)</option>
                <option value="experience-desc">Experience (High to Low)</option>
              </select>

              <button
                onClick={() => navigate('/add-developer')}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                + Add Developer
              </button>
            </div>
          </div>

          {/* Developers Grid */}
          {loading ? (
            <LoadingSpinner />
          ) : developers.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">No developers found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {developers.map((dev) => (
                  <div key={dev._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{dev.name}</h3>
                      <p className="text-sm font-semibold text-blue-600 mb-3">{dev.role}</p>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dev.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 font-semibold mb-2">Tech Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {dev.techStack.map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">
                        <strong>Experience:</strong> {dev.experience} years
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/developer/${dev._id}`)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => navigate(`/edit-developer/${dev._id}`)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(dev._id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      page === p
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperDirectory;
