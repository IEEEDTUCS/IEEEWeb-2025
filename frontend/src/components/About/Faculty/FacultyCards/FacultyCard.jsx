import React from 'react';

function FacultyCard({ name, designation, details, imageUrl }) {
  return (
    <div className="flex flex-col items-center justify-start text-center gap-3 h-auto w-[18vw] rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md">
      <img
        src={imageUrl}
        alt={`Profile picture of ${name}`}
        className="h-48 w-40 object-cover rounded-md mb-3"
      />
      <h3 className="font-bold text-lg text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600">{designation}</p>
      <p className="text-xs text-gray-500">{details}</p>
    </div>
  );
}

export default FacultyCard;
