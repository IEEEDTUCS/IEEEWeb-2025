import React from 'react';
import FacultyCard from './FacultyCard';

function FacultyWindow() {
  const facultyData = [
    {
      name: "Prof. Rahul Kataria",
      designation: "Professor, CSE Department DTU",
      details: "IEEE DTU, CS chapter\nFaculty advisor",
      imageUrl: "/Faculty/Prof-Rahul.jpg",
    },
    {
      name: "Prof. Rachna Garg",
      designation: "Chair, IEEE Delhi Section",
      details: "Faculty advisor, IEEE DTU PES-IAS Student Chapter",
      imageUrl: "/Faculty/Prof-Rachna.png",
    },
    {
      name: "Dr. Sonam Rewari",
      designation: "Asst Professor, ECE Department",
      details: "Faculty advisor, IEEE DTU WIE",
      imageUrl: "/Faculty/Dr-Sonam.jpg",
    },
    {
      name: "Dr. Deva Nand",
      designation: "Associate Professor, ECE Department",
      details: "Faculty advisor, IEEE DTU CASS",
      imageUrl: "/Faculty/dr-devanand.jpg",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container with Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 place-items-center">
          {facultyData.map((val, idx) => (
            <div key={idx} className="w-full max-w-[280px] sm:max-w-xs">
              <FacultyCard {...val} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FacultyWindow;