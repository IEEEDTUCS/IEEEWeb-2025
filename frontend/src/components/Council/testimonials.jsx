
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Example data (replace with your real testimonials)
const testimonials = [
  {
    id: "1",
    url: "/images/Harsh_Kumar.jpg", // put your image path in public folder
    title: "Harsh Kumar",
    designation: "Batch of 2024 (Treasurer)",
    description:
      "IEEE DTU has been one of the most transformative journeys of my college life. From starting as a Core Member to taking on the role of Treasurer, every step has been a learning curve. Handling sponsorships, financial planning, and corporate relations gave me real-world exposure beyond textbooks. You get to know more about real-world panorama. Kehte hain na, seekhna band toh jeetna band—and IEEE ensured I kept learning and growing. \n Invictus DTU was another exciting chapter where I got to lead corporate partnerships and sponsorships, working with an incredible team.Whether it was late- night Yapp meetings or pulling off large - scale events, every moment was worth it. More than anything, it gave me a strong network of mentors, friends, and juniors who made this journey unforgettable.Yahan sirf society nahi, ek solid family milti hai! To all juniors: grab every opportunity, make a Yaadgaar college journey for you",
  },
  {
    id: "2",
    url: "/images/Ansh_Anurag.jpg",
    title: "Ansh Anurag",
    designation: "Batch of 2024 (Chairperson)",
    description: "Taking on the role of Chairperson at IEEE DTU has been nothing short of a rollercoaster ride—one filled with brainstorms, crazy deadlines, and, of course, some unforgettable wins! From doubling our student membership to executing North India's largest hackathon (with 1300+ brilliant minds coming together!), every step has been about pushing boundaries and making things bigger, better, and bolder. Vihaan007 was more than just an event; it was proof of what passionate collaboration can achieve.Initiatives like WIEvek, Bootstrap, and Tinkercase weren't just ideas on paper—they turned into platforms that brought people together, created impact, and, most importantly, gave students the confidence to dream bigger.Shoutout to the incredible team that made it all happen! Without them, this journey wouldn’t have been that amazing.And to all the future IEEE leaders—bhaiyo aur behno, keep the fire alive because the best is yet to come!",
  },
  {
    id: "3",
    url: "/images/Sidakpreet_Singh.jpg",
    title: "Sidakpreet Singh",
    designation: "Batch of 2024 (Chairperson PES IEEE DTU)",
    description: "For me IEEE has always been more than just an organisation—it’s a movement, a community of passionate individuals who believe in pushing the boundaries of technology and innovation. Being a part of this incredible network has shown me the power of collective effort, where every small initiative counts. As the Chairperson of PES- IEEE DTU, I had the privilege of witnessing this firsthand.It wasn’t just about leading; it was about creating opportunities, fostering a culture of learning, and ensuring that every student who walked through our doors found a space to grow.It was a step - by - step growth from conducting SIG’s to bringing industry experts to our platform, every initiative was driven by the goal of empowering the next generation of engineers.But beyond the projects and events, what truly made this journey special were the people—the ones who stood by each other during any kind of situation, who celebrated small victories together, and who reminded me every day why IEEE was a cherishable part of my journey in DTU.",
  },
  {
    id: "4",
    url: "/images/Shreya.jpg", // put your image path in public folder
    title: "Shreya",
    designation: "Unversity of Southern California",
    description:
      "My journey with IEEE started in 2013 and I have been a part of IEEE for four years up until I graduated. I dabbled with a lot of things in IEEE such as programming, website designing, LFRs, Mac- Bots, publications, corporate affairs and so on.That's where I found my calling and built a career around it. Through IEEE I learnt a lot of things such as how to talk to people. I met the best set of people including seniors who inspired and guided me, my batchmates who stood with me, and juniors who looked up to me. I gained a lot of technical experience from working on IEEE projects such asTroika and other fests.But more than that, I gained friends. I gained a way to talk to people, give interviews, ask questions and make contacts, which that is something that takes you a long way in life, and IEEE was a major contributing factor in everything. I am where I am because of all my experiences as an IEEE member, being with my friends and coworkers.I really hope that a few years down the line, you all will be the ones encouraging more juniors with your journey as an IEEE member.",
  },
  
];

function Gallery({ items, setIndex, setOpen, index }) {
  return (
    
    <div className="flex flex-col sm:flex-row md:flex-row  overflow-x-auto snap-x snap-mandatory  scrollbar-hide scroll-smooth lg:justify-center md:justify-start sm:justify-start items-center gap-2 py-1"> 
      {items.map((item, i) => (
        <motion.div
          whileTap={{ scale: 0.98 }}
          key={item.id}
          onMouseEnter={() => setIndex(i)}
          onClick={() => {
            setIndex(i);
            setOpen(true);
          }}
          className={`snap-center flex-shrink-0 w-82 mx-4 bg-white rounded-2xl shadow-lg p-0 text-center" 
    ${index === i
            ? "w-full max-w-xs sm:max-w-md md:max-w-2xl lg:w-4xl  p-6 bg-white rounded-2xl shadow-2xl shadow-black/30 flex flex-col justify-center items-center"
            : "w-10 sm:w-16 md:w-34 h-100 sm:h-116 md:h-[600px] lg:h-160 rounded-xl overflow-hidden shadow-2xl shadow-black/30"
              
            }`}
        >
          {/* Always show photo thumbnail */}
          <motion.img
            src={item.url}
            alt={item.title}
            className={`object-cover rounded-xl 
      ${ index === i ? "hidden" : "w-full h-full"}`}
          />

          {/* Collapsed state (when not expanded) */}
          {index !== i && (
            <div className="flex flex-col items-center justify-center p-2">
              <motion.img
                src={item.url}
                alt={item.title}
                className="w-28 h-32 sm:w-32 sm:h-36 object-cover rounded-xl"
              />
              <h3 className="text-sm sm:text-base font-semibold mt-2 text-center">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                {item.designation}
              </p>
            </div>
          )}

          {/* Expanded content */}
          {index === i && (
            <div className="flex flex-col md:flex-row items-center md:items-start mt-4 gap-6 w-full ">
              {/* Left side: Bio */}
              <div className=" text-left px-2 order-2 md:order-1">
                <p className="text-lg text-gray-700 font-[lora-regular] font-serif leading-relaxed overflow-hidden line-clamp-18" style={{ color: "#555555" }}>
                  {item.description}
                </p>
              </div>

              {/* Right side: Photo + Details */}


              <div className="flex flex-col items-center order-1 md:order-2 md:ml-6 ">
                {/* <div className="md:w-48 md:h-48 lg:w-56 lg:h-56"> */}
                <div
                  className="w-38 h-42 
               sm:w-56 sm:h-60 
               md:w-80 md:h-86 
               lg:w-84 lg:h-110 
              

               rounded-xl shadow-md bg-white flex items-center justify-center"
                >
                  
                  <img
                    src={item.url}
                    alt={item.title}
                    className="max-w-full h-full object-cover rounded-xl"
                  />
                </div>

                <h3 className="text-xl font-[montserrat-semibold] font-sans font-semibold mt-3" style={{ color: "#000000" }}>{item.title}</h3>
                  <p className="text-sm text-gray-500 md:w-46 md:h-6 ml-8">{item.designation}</p>
                
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
 
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="relative">
      <h3 className="text-center font-bold text-lg uppercase mb-0" style={{
    fontweight: 600,
    fontSize: "1rem",    
    letterSpacing: "0.25rem",
        color: "#70a6e3",
        margin: 0,
        padding: 0,
  }}>PROUD TO PRESENT</h3>
      <h1
        className="text-center text-5xl leading-[1.255]  font-[montserrat-medium] font-sans font-bold my-6 mt-0"
        style={{ color: "#000000" }}
      >
        Testimonials
      </h1>
      {/* <h2 className="text-center text-3xl font-bold my-6">Testimonials</h2> */}

      <Gallery items={testimonials} index={index} setIndex={setIndex} setOpen={setOpen} />

      <AnimatePresence>
        {open && (
        
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="overlay"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm px-2"
            onClick={() => setOpen(false)}
          >
         <motion.div 
              layoutId={testimonials[index].id}
              className="bg-white rounded-xl shadow-lg p-4 w-auto /12 max-w-xl max-h-[80vh] overflow-y-auto relative" //"w-full sm:w-[80%] md:w-[600px] h-auto rounded-2xl cursor-default bg-white p-4 shadow-lg"

              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
              >
                ✕
              </motion.button>
             <Image 
                src={testimonials[index].url}
                width={150}
                height={150}
                alt={testimonials[index].title}
                className="rounded-full  object-cover mx-auto md:w-40 md:h-40 w-24 h-24" //w-full h-60 sm:h-72 md:h-80
              />
              <article className="p-2 mt-4 text-center"> 
                <motion.h1 
                  initial={{ scaleY: 0.2 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-xl font-semibold font-[montserrat-semibold] font-sans"
                >
                   {testimonials[index].title}
                 </motion.h1>
                 <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-xl md:text-base leading-relaxed py-2 font-[lora-regular] font-serif "
                  style={{ color: "#555555" }}
                >
                  {testimonials[index].description}
                 </motion.p>
             </article>
             </motion.div>
          </motion.div>
         )} 
      </AnimatePresence>
    </div>
  );
}
