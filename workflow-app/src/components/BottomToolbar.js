import React from 'react';

const BottomToolbar = ({ isExpanded }) => {
  return (
    <div className={`border-t p-4 flex justify-between items-center bg-white shadow-lg`}>
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-sky-500 transition-colors">
          <span>Run once</span>
        </button>
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-sm font-medium">OFF</span>
          <span className="text-sm">Every 15 minutes.</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Add toolbar icons here if needed */}
      </div>
    </div>
  );
};

export default BottomToolbar;
