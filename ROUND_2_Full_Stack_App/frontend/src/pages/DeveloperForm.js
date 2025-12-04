import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { developerAPI } from '../services/api';
import { Loading } from '../components/Loading';
import { ArrowLeft, X } from 'lucide-react';

export const DeveloperForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Frontend',
    techStack: [],
    experience: 0,
    description: '',
    joiningDate: new Date().toISOString().split('T')[0],
    photo: null
  });
  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      setPageLoading(true);
      developerAPI.getById(id)
        .then(res => {
          setFormData(res.data.data);
        })
        .catch(() => toast.error('Failed to load developer'))
        .finally(() => setPageLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTech = (tech) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter(t => t !== tech)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await developerAPI.update(id, formData);
        toast.success('Developer updated successfully!');
      } else {
        await developerAPI.create(formData);
        toast.success('Developer created successfully!');
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          <ArrowLeft size={20} /> Back to Directory
        </button>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            {isEditMode ? 'Edit Developer' : 'Add New Developer'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full-Stack">Full-Stack</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Experience (Years) *</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                max="70"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tech Stack *</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  placeholder="e.g., React, Node.js"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech, idx) => (
                  <div key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Joining Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate?.split('T')[0]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">About / Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about this developer..."
                required
                rows="5"
                minLength="10"
                maxLength="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">{formData.description.length}/1000</p>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Photo URL (Optional)</label>
              <input
                type="url"
                name="photo"
                value={formData.photo || ''}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : isEditMode ? 'Update Developer' : 'Create Developer'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeveloperForm;
