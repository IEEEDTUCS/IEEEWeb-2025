import React from 'react';
import Image from 'next/image';
import CouncilData from '@/components/Council/HelperCouncil'
import { CardContainer, CardBody, CardItem } from './Card3D';

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import { motion } from 'framer-motion';

function Council({ img, Name, Position, insta, linkedin }) {
  return (
    <CardContainer className="w-full max-w-[280px] mx-auto">
      <CardBody className="relative rounded-xl bg-white border border-neutral-100 shadow-xl shadow-white/30 hover:shadow-2xl hover:shadow-white/40 transition-shadow duration-300 overflow-hidden">
        <CardItem translateZ={80} className="w-full h-[260px] overflow-hidden">
          <Image
            src={img}
            alt={Name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </CardItem>

        <CardItem translateZ={50} className="w-full pt-4 text-center">
          <p className="text-xl md:text-2xl font-subheading font-bold text-neutral-00">{Name}</p>
        </CardItem>

        <CardItem translateZ={90} className="w-full flex justify-center items-center gap-2 py-4">
          <span className="text-sm text-neutral-500">{Position}</span>
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              {Name === "Khobaib Akmal"
                ? <LanguageIcon fontSize="small" className="text-blue-600 hover:scale-110 transition cursor-pointer" />
                : <LinkedInIcon fontSize="small" className="text-blue-600 hover:scale-110 transition cursor-pointer" />}
            </a>
          )}
          {insta && (
            <a href={insta} target="_blank" rel="noopener noreferrer">
              <InstagramIcon fontSize="small" className="text-pink-500 hover:scale-110 transition cursor-pointer" />
            </a>
          )}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
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
            className="font-heading text-center text-[#70A6E3] text-xl tracking-[0.2rem] font-semibold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            THE TEAM
          </motion.p>

          <motion.h1
            className="font-heading text-center mt-3 md:tracking-[0.2rem] text-white text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            IEEE-DTU COUNCIL
          </motion.h1>

          <motion.div
            className="text-white px-[5%] md:px-[20%] mt-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.7, ease: "easeOut" }}
          >
            <hr className="border-white/20" />
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {CouncilData.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Council {...member} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}