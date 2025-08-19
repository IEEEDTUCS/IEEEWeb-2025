import React, { useState } from 'react';

export default function Events() {
  {/*This is placeholder data for integrating with the card component in features/events*/}
{/*const eventsData = [
    {
      id: 1,
      title: 'MIST',
      subheader: 'October 14, 2024',
      description: 'The Cryptic Hunt',
      imageUrl: 'https://placehold.co/400x300/1a202c/ffffff?text=MIST'
    },
    {
      id: 2,
      title: 'IEEE Day',
      subheader: 'October 3, 2024',
      description: 'Celebrating the Oldest Student Society of DTU!',
      imageUrl: 'https://placehold.co/400x300/4a5568/ffffff?text=IEEE+Day'
    },
    {
      id: 3,
      title: 'IEEEXtreme',
      subheader: 'October 26, 2024',
      description: '24-hour global competition',
      imageUrl: 'https://placehold.co/400x300/2d3748/ffffff?text=IEEEXtreme'
    },
    {
      id: 4,
      title: 'Project WIEVEK',
      subheader: 'July 11-14, 2024',
      description: 'Empowering Young Minds in Engineering',
      imageUrl: 'https://placehold.co/400x300/1a202c/ffffff?text=Project+WIEVEK'
    },
     {
      id: 5,
      title: 'Another Event',
      subheader: 'Date TBD',
      description: 'Description for another event',
      imageUrl: 'https://placehold.co/400x300/4a5568/ffffff?text=Event+5'
    },
    {
      id: 6,
      title: 'Tech Talk',
      subheader: 'Date TBD',
      description: 'A talk on new technologies',
      imageUrl: 'https://placehold.co/400x300/2d3748/ffffff?text=Event+6'
    },
    {
      id: 7,
      title: 'Workshop',
      subheader: 'Date TBD',
      description: 'Hands-on workshop session',
      imageUrl: 'https://placehold.co/400x300/1a202c/ffffff?text=Event+7'
    },
    {
      id: 8,
      title: 'Hackathon',
      subheader: 'Date TBD',
      description: 'Code for a cause',
      imageUrl: 'https://placehold.co/400x300/4a5568/ffffff?text=Event+8'
    },
  ];
*/}
  return (
    <>
                <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
          `}</style>


    <div className="min-h-screen bg-[#111827] text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="container mx-auto px-4 py-16">
 
        <header className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-400 tracking-widest mb-2">
            FUN & ACTIVITIES
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            OUR EVENTS
          </h1>
          <p className="text-sm font-semibold text-blue-400 tracking-wider">
            SOME OF THE EVENTS CONDUCTED BY IEEE DTU THROUGHOUT THE YEAR
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/*This is syntax for integrating with the card component in features/events*/}

                         {/*} {eventsData.map(event => (
                <EventComponent
                  key={event.id}
                  title={event.title}
                  subheader={event.subheader}
                  image={event.imageUrl}
                  typography={event.description}
                />
              ))}*/}
          </div>
        </main>
        
      </div>
    </div>
    </>
  );
}
