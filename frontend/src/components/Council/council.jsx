import React from 'react';
import Image from 'next/image';
import CouncilData from '@/components/Council/HelperCouncil';
import { CardContainer, CardBody, CardItem } from './card3d';

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import { motion } from 'framer-motion';

function Council({ img, Name, Position, insta, linkedin }) {
  return (
    <CardContainer className="group w-full border border-zinc-800/80
      rounded-xl
      shadow-[0_4px_20px_rgba(0,0,0,0.6)]
      hover:border-blue-500/50
      hover:shadow-[0_0_25px_rgba(37,99,235,0.2)]
      transition-all duration-300">
      <CardBody className="relative w-full h-auto">

        {/* IMAGE */}
        <CardItem
          translateZ={80}
          className="relative w-full overflow-hidden rounded-t-xl"
        >
          <Image
            src={img}
            alt={Name}
            width={600}
            height={600}
            className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* subtle hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
        </CardItem>

        {/* NAME + POSITION/SOCIALS */}
        <CardItem
          translateZ={50}
          className="relative w-full h-[72px] text-center overflow-hidden bg-zinc-950 border-t border-zinc-800/60 rounded-b-xl"
        >

          {/* NAME */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
            <p className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight">
              {Name}
            </p>
          </div>

          {/* POSITION + SOCIALS */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center items-center pb-4 translate-y-10 opacity-0 transition-all duration-650 group-hover:translate-y-0 group-hover:opacity-100 gap-2">

            <span className="text-xs md:text-sm uppercase tracking-[0.12em] text-zinc-400 font-medium font-nav">
              {Position}
            </span>

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center"
              >
                {Name === "Parth Sharma" ? (
                  <LanguageIcon
                    fontSize="small"
                    className="text-blue-400 cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-blue-300"
                  />
                ) : (
                  <LinkedInIcon
                    fontSize="small"
                    className="text-blue-400 cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-blue-300"
                  />
                )}
              </a>
            )}

            {insta && (
              <a
                href={insta}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center"
              >
                <InstagramIcon
                  fontSize="small"
                  className="text-pink-400 cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-pink-300"
                />
              </a>
            )}

          </div>
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
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="m-15">
        <motion.div>
          <motion.p
            className="font-heading text-center text-blue-400 text-sm md:text-base tracking-[0.2rem] font-semibold uppercase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            THE TEAM
          </motion.p>

          <motion.h1
            className="font-heading text-center mt-3 tracking-wide text-white text-3xl md:text-4xl font-extrabold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            IEEE-DTU <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">COUNCIL</span>
          </motion.h1>

          <motion.div
            className="text-white px-[5%] md:px-[20%] mt-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.7, ease: "easeOut" }}
          >
            <hr className="border-zinc-800/80" />
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
        {CouncilData.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className="transition-all duration-300"
          >
            <Council {...member} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}