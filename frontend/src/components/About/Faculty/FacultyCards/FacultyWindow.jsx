import React from 'react';
import FacultyCard from './FacultyCard';


function FacultyWindow(){
    const facultyData = [
    {
      name: "Prof. Rahul Kataria",
      designation: "Professor, Computer Engineering",
      details: "Department DTU, IEEE DTU, CS chapter\nFaculty advisor",
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
  ];

 return (
  <div className='flex flex-row gap-x-6'>
    {facultyData.map((val, idx) => (
      <FacultyCard key={idx} {...val} />
    ))}
  </div>
);

}

export default FacultyWindow;