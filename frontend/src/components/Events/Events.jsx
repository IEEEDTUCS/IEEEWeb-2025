import React from 'react';
import EventComponent from './EventComponent';
import eventsData from './EventsData'

export default function Events() {
  return (
    
      <div className="min-h-screen bg-[#111827] text-white  mt-24">
        <div className="container mx-auto pt-16 ">
          <header className="text-center mb-8 pb-16">
            <p className=" text-xl font-semibold text-blue-400 tracking-widest mb-2 font-subheading">
              FUN & ACTIVITIES
            </p>
            <h1 className=" font-heading text-4xl md:text-5xl font-heading font-semibold tracking-tight mb-4">
              OUR EVENTS
            </h1>
            <p className="text-xl font-semibold font-subheading text-blue-400 tracking-wider font-subheading">
              SOME OF THE EVENTS CONDUCTED BY IEEE DTU THROUGHOUT THE YEAR
            </p>
            <p className='mt-8 px-[20%] md:px-[20%]'> <hr/> </p>
            
       </header>


          <main>
            <div className="flex bg-white mx-[10%]  rounded-md flex-wrap justify-center gap-6 p-6 pt-12">
              {eventsData.map(event => (
                <EventComponent 
                  key={event.title || event.image} 
                  {...event}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
  
  );
}