import React from 'react';
import { Link } from 'react-router-dom';

const DeveloperList = ({ developers, loading, onDelete, onEdit }) => {
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Frontend':
        return 'bg-blue-100 text-blue-800';
      case 'Backend':
        return 'bg-green-100 text-green-800';
      case 'Full-Stack':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getExperienceColor = (experience) => {
    if (experience < 2) return 'text-orange-600';
    if (experience < 5) return 'text-blue-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading developers...</p>
        </div>
      </div>
    );
  }

  if (developers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👨‍💻</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No developers found
          </h3>
          <p className="text-gray-500">
            Add your first developer or adjust your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Developers ({developers.length})
      </h2>

      <div className="space-y-4">
        {developers.map((developer) => (
          <div
            key={developer.id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    <Link to={`/developers/${developer.id}`} className="hover:underline">
                      {developer.name}
                    </Link>
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(
                      developer.role
                    )}`}
                  >
                    {developer.role}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">Tech Stack:</span>
                    <div className="flex flex-wrap gap-2">
                      {developer.techStack.split(',').map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">Experience:</span>
                    <span className={`font-bold ${getExperienceColor(developer.experience)}`}>
                      {developer.experience} {developer.experience === 1 ? 'year' : 'years'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-4 flex items-center gap-2">
                <button
                  onClick={() => onEdit && onEdit(developer)}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition-all"
                  title="Edit developer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
                  </svg>
                </button>

                <button
                  onClick={() => onDelete(developer.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                  title="Delete developer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperList;
