import React from 'react';
import Image from 'next/image';
import CouncilData from '@/components/Council/HelperCouncil'

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import { motion } from 'framer-motion';


 function Council({img,Name,Position,insta,linkedin}) {
  return (
      <>
      
      <div 
  className=" w-[300px] relative mt-4 h-[380px] group mx-auto dark:bg-transparent hover:shadow-2xl bg-white rounded-md dark:text-black text-black flex flex-col">
      
        <div className="w-full  rounded-t-md h-[340px] group-hover:h-[400px] overflow-hidden transition-all duration-300">
          <Image
            src={img}
            alt="img"
            width={600}
            height={600}
            className="h-full w-full  scale-105 group-hover:scale-100  object-cover transition-all duration-500"
          />
        </div>

        <article className="relative overflow-hidden  flex-grow">

          <div className="info p-2 translate-y-0 group-hover:-translate-y-20 transition-all duration-300">
            <p className="md:text-2xl text-center p-2 font-subheading tracking-normal font-bold text-neutral-600 border-b-2 border-neutral-300">{Name}</p>
            {/* <p className="sm:text-base text-sm">CEO &amp; Design Engineer</p> */}
          </div>

          <div >
          <button className="absolute h-8 flex flex-row justify-center items-center -bottom-8 font-serif opacity-0 group-hover:opacity-100 group-hover:bottom-3 text-lg font-medium transition-all duration-500 w-full text-center ">

            <div className='mr-2'>{Position}</div>
            <div >
           {   linkedin && (
               <a href={linkedin} className='mr-0.2'>
               {Name == "Khobaib Akmal" ? <LanguageIcon className="text-blue-600 hover:scale-110 transition cursor-pointer" /> : <LinkedInIcon className="text-blue-600 hover:scale-110 transition cursor-pointer" /> }
              
               </a>
                 )
           }

           {insta && (
           <a href={insta} >
           <InstagramIcon className="text-pink-500 hover:scale-110 transition cursor-pointer" />
           </a>
              )
          }
           </div>
          </button>
          </div>
        </article>

      </div>
    </>
  )
}

export default function CouncilComponent() {
  return (
    <motion.div
      className="relative bg-black pb-10 pt-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="m-15">
        <motion.div>
          <motion.p
            className="font-heading text-center text-[#70A6E3] text-lg tracking-[0.2rem] font-semibold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
            duration: 1, // total animation time
            ease: "easeInOut", // easing curve

          }}
          >
            THE TEAM
          </motion.p>
          
        
        <motion.h1
          className="font-heading text-center mt-3 md:tracking-[0.2rem] text-white text-2xl md:text-3xl font-bold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1, // total animation time
            ease: "easeInOut", // easing curve

          }}
        >
          IEEE-DTU COUNCIL
        </motion.h1>

        <motion.div
          className="text-white px-[5%] md:px-[20%] mt-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.7, ease: "easeOut" }}
        >
          <hr />
        </motion.div>

        </motion.div>
      
      </div>
      
      <div className="flex bg-white mx-[10%] mb-20 rounded-md flex-wrap justify-center gap-6 p-6">
        {CouncilData.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Council {...event} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
