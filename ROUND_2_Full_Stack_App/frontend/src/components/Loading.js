import React from 'react';
import { Loader } from 'lucide-react';

export const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <Loader className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center py-8">
    <Loader className="w-6 h-6 text-blue-500 mr-3 animate-spin" />
    <p className="text-gray-600">{text}</p>
  </div>
);
