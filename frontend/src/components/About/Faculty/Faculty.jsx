import React from 'react'
import BranchCounsellor from './FacultyCards/BranchCounsller';
import FacultyWindow from './FacultyCards/FacultyWindow';

export default function Faculty() {
  return (
    <div className='flex flex-col gap-y-8'>
     <div className='Header'>
      <h5 className="text-1xl font-bold text-center mt-4">SUPPORT SYSTEM</h5>
      <h2 className="font-bold text-4xl text-center underline decoration-blue-500 leading-tight">
      Meet our faculty.<br />Advisors
      </h2>

     </div>
     <div className='Branch-Counseller'>
      <BranchCounsellor/>
     </div>
     <div className="flex flex-wrap justify-center items-center gap-4 p-4">
      <FacultyWindow/>
     </div>
    </div>
  );
}