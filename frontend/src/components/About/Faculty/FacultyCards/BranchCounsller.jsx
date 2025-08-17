import React from "react";

function BranchCounsellor() {
  return (
    <div className="flex flex-row border-2 border-white w-[70vw] h-[55vh] mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <div className="w-1/3 flex justify-center items-center">
        <img
          src="/Faculty/Prof-J-Panda.png"
          alt="Prof. Jeebananda Panda"
          className="rounded-lg shadow-md object-cover h-full border border-black"
        />
      </div>

      <div className="w-2/3 pl-6 flex flex-col justify-center text-gray-700 space-y-4 text-justify">
        <p>
          IEEE DTU's core purpose is to foster technological innovation and
          excellence for the benefit of humanity.
        </p>
        <p>
          IEEE DTU and its members inspire a global community through its highly
          cited publications, conferences, technology standards, and
          professional and educational activities. We aim to inspire and
          motivate the genius, to blossom into a societal revolution.
        </p>
        <p>
          IEEE DTU will be essential to the global technical community and to
          technical professionals everywhere, and be universally recognized for
          the contributions of technology and of technical professionals in
          improving global conditions.
        </p>
        <p className="font-bold text-blue-800">Prof. Jeebananda Panda</p>
        <p className="italic">Branch Counsellor</p>
      </div>
    </div>
  );
}

export default BranchCounsellor;
