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
    <CardContainer className=" group w-full border border-white/80
    rounded-md
    shadow-[0_4px_20px_rgba(255,255,255,0.06)]
    hover:border-[#70A6E3]/60
    hover:shadow-[0_0_25px_rgba(112,166,227,0.18)]
    transition-all duration-300">
      <CardBody className="relative w-full h-auto">

        {/* IMAGE */}
        <CardItem
          translateZ={80}
          className="relative w-full overflow-hidden rounded-t-md"
        >
          <Image
            src={img}
            alt={Name}
            width={600}
            height={600}
            className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* subtle hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
        </CardItem>

        {/* NAME + POSITION/SOCIALS */}
        <CardItem
          translateZ={50}
          className="relative w-full h-[72px] text-center overflow-hidden bg-white rounded-b-md"
        >

          {/* NAME */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
            <p className="text-xl md:text-2xl font-subheading font-bold text-neutral-600">
              {Name}
            </p>
          </div>

          {/* POSITION + SOCIALS */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center items-center pb-4 translate-y-10 opacity-0 transition-all duration-650 group-hover:translate-y-0 group-hover:opacity-100">

            <span className="text-sm uppercase tracking-[0.12em] text-neutral-500">
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
                    className="text-blue-600 cursor-pointer transition-transform duration-200 hover:scale-140"
                  />
                ) : (
                  <LinkedInIcon
                    fontSize="small"
                    className="text-blue-600 cursor-pointer transition-transform duration-200 hover:scale-140"
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
                  className="text-pink-500 cursor-pointer transition-transform duration-200 hover:scale-140"
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
            className="font-heading text-center text-[#70A6E3] text-lg tracking-[0.2rem] font-semibold"
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