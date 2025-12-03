import React, { useState } from 'react';

const DeveloperForm = ({ onAddDeveloper }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    techStack: '',
    experience: ''
  });

  const [errors, setErrors] = useState({});

  const roles = ['Frontend', 'Backend', 'Full-Stack'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required';
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(formData.experience) || parseFloat(formData.experience) < 0) {
      newErrors.experience = 'Experience must be a positive number';
    } else if (parseFloat(formData.experience) > 50) {
      newErrors.experience = 'Experience must be less than 50 years';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await onAddDeveloper(formData);
    
    if (success) {
      // Reset form
      setFormData({
        name: '',
        role: '',
        techStack: '',
        experience: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
          +
        </span>
        Add Developer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Role Dropdown */}
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.role
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          >
            <option value="">Select a role</option>
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Tech Stack Input */}
        <div>
          <label htmlFor="techStack" className="block text-sm font-semibold text-gray-700 mb-2">
            Tech Stack <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.techStack
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="React, Node.js, MongoDB"
          />
          {errors.techStack && (
            <p className="text-red-500 text-sm mt-1">{errors.techStack}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">Comma-separated values</p>
        </div>

        {/* Experience Input */}
        <div>
          <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
            Experience (years) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.experience
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="3"
            step="0.5"
            min="0"
          />
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Add Developer
        </button>
      </form>
    </div>
  );
};

export default DeveloperForm;
