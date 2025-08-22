import React from 'react';
import Image from 'next/image';
import CouncilData from '@/components/Council/HelperCouncil'
import {
  ArrowBigDown,
  ArrowRight,
  ChevronRight,
  Heart,
  MoveUpRight,
} from 'lucide-react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


 function Council({img,Name,Position,insta,linkedin}) {
  return (
      <>
      
      <div 
  className="  w-[400px] relative mt-4 h-[430px] group mx-auto dark:bg-transparent   bg-white   border-2 border-black rounded-md dark:text-black text-black flex flex-col">
      
        <div className="w-full  rounded-t-md h-[350px] group-hover:h-[410px] overflow-hidden transition-all duration-300">
          <img
            src={img}
            alt="img"
            width={600}
            height={600}
            className="h-full w-full  scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0 object-cover transition-all duration-300"
          />
        </div>

        <article className="relative overflow-hidden  flex-grow">

          <div className="info p-2 translate-y-0 group-hover:-translate-y-20 transition-all duration-300">
            <p className="md:text-2xl p-2 font-semibold">{Name}</p>
            {/* <p className="sm:text-base text-sm">CEO &amp; Design Engineer</p> */}
          </div>

          <button className="absolute h-10 -bottom-8 opacity-0 group-hover:opacity-100 cursor-pointer group-hover:bottom-3  text-xl font-medium transition-all duration-300 w-full text-center">
            {/* CEO &amp; Design Engineer */}
           {Position}
           {   linkedin && (
               <a href={linkedin}>
               <LinkedInIcon className="text-blue-600 hover:scale-110 transition cursor-pointer" />
               </a>
                 )
           }

           {insta && (
           <a href={insta} >
           <InstagramIcon className="text-pink-500 hover:scale-110 transition cursor-pointer" />
           </a>
              )
          }
           
          </button>

        </article>

      </div>
    </>
  )
}

export default function CouncilComponent(){
    
    return(
<div >
 <div >
          <p className='text-center text-lg font-bold'>THE TEAM</p>
        <p className='text-center text-3xl font-bold'>IEEE-DTU COUNCIL</p>
       </div>
<div className='flex  flex-wrap justify-center gap-6 p-6'>
  
      
    {CouncilData.map((event, index) => {
        return <Council key={index} {...event} />
     })}

</div>
</div>
   
    )
}
