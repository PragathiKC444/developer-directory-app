import React from 'react';

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  sort,
  setSort,
  totalCount,
  filteredCount
}) => {
  const roles = ['All', 'Frontend', 'Backend', 'Full-Stack'];
  const sorts = [
    { value: '', label: 'Relevance' },
    { value: 'exp_asc', label: 'Experience: Low → High' },
    { value: 'exp_desc', label: 'Experience: High → Low' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
            Search by Name or Tech
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Search developers..."
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Role Filter */}
        <div className="md:w-64">
          <label htmlFor="roleFilter" className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by Role
          </label>
          <select
            id="roleFilter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="md:w-64">
          <label htmlFor="sort" className="block text-sm font-semibold text-gray-700 mb-2">Sort</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            {sorts.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      {(searchTerm || roleFilter !== 'All') && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-blue-600">{filteredCount}</span> of{' '}
            <span className="font-bold">{totalCount}</span> developers
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
