import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { developerAPI } from '../services/api';
import { Loading, LoadingSpinner } from '../components/Loading';
import { ArrowLeft, Mail, Calendar } from 'lucide-react';

export const DeveloperProfile = () => {
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const res = await developerAPI.getById(id);
        setDeveloper(res.data.data);
      } catch (error) {
        toast.error('Failed to load developer profile');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!developer) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          <ArrowLeft size={20} /> Back to Directory
        </button>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <h1 className="text-4xl font-bold mb-2">{developer.name}</h1>
            <p className="text-xl opacity-90">{developer.role}</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Email</h3>
                <div className="flex items-center gap-2 text-lg text-gray-800">
                  <Mail size={20} />
                  {developer.email}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Experience</h3>
                <p className="text-lg text-gray-800 font-semibold">{developer.experience} years</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Joining Date</h3>
                <div className="flex items-center gap-2 text-lg text-gray-800">
                  <Calendar size={20} />
                  {new Date(developer.joiningDate).toLocaleDateString()}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Role</h3>
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                  {developer.role}
                </span>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {developer.techStack.map((tech, idx) => (
                  <span key={idx} className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">About</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{developer.description}</p>
            </div>

            {/* Photo */}
            {developer.photo && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">Photo</h3>
                <img src={developer.photo} alt={developer.name} className="max-w-md rounded-lg shadow-lg" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                onClick={() => navigate(`/edit-developer/${developer._id}`)}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
