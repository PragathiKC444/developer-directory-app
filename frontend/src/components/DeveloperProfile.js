import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DeveloperProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeveloper();
  }, [id]);

  const fetchDeveloper = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/developers/${id}`);
      if (res.data && res.data.success) {
        setDeveloper(res.data.data);
      } else {
        toast.error('Developer not found');
        navigate('/');
      }
    } catch (err) {
      toast.error('Failed to load profile');
      console.error(err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !developer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const photoUrl = developer.photo ? (developer.photo.startsWith('http') ? developer.photo : `${API_URL}${developer.photo}`) : null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-start gap-6">
          <div className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {photoUrl ? (
              <img src={photoUrl} alt={developer.name} className="object-cover w-full h-full" />
            ) : (
              <div className="text-6xl">👤</div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{developer.name}</h1>
            <p className="mt-1 text-sm text-gray-600">{developer.role} • Joined {new Date(developer.createdAt).toLocaleDateString()}</p>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {developer.techStack.split(',').map((t, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">{t.trim()}</span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Experience</h3>
              <p className="text-gray-700 font-bold">{developer.experience} {developer.experience === 1 ? 'year' : 'years'}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">About</h3>
              <p className="text-gray-700 whitespace-pre-line">{developer.description || 'No description provided.'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const form = new FormData();
                form.append('photo', file);
                try {
                  toast.loading('Uploading photo...', { id: 'upload' });
                  const res = await axios.post(`${API_URL}/developers/${id}/photo`, form, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  });
                  if (res.data && res.data.success) {
                    toast.dismiss('upload');
                    toast.success('Photo uploaded');
                    // refresh developer
                    setDeveloper(prev => ({ ...prev, photo: res.data.data.photo }));
                  } else {
                    toast.dismiss('upload');
                    toast.error('Upload failed');
                  }
                } catch (err) {
                  toast.dismiss('upload');
                  toast.error('Upload failed');
                  console.error(err);
                }
              }}
              className=""
            />
          </div>

          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Back</button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
