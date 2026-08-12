"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from '../Council/card3d';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const AnimatedTestimonials = ({ autoplay = false }) => {
  const [active, setActive] = useState(0);
  const handleNext = () => setActive((p) => (p + 1) % testimonials.length);
  const handlePrev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const isActive = (i) => i === active;

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="bg-black py-20 px-6">
      <CardContainer className="max-w-4xl mx-auto">
        <CardBody className="relative w-full rounded-2xl bg-white border border-neutral-200 shadow-xl shadow-black/30 grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-10">

          <CardItem translateZ={50} className="relative h-72 w-full">
            <AnimatePresence>
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.9, rotate: randomRotateY() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0,
                    scale: isActive(index) ? 1 : 0.95,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={t.url}
                    alt={t.title}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-xl object-cover object-center border border-neutral-200"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </CardItem>

          <CardItem translateZ={40} className="flex flex-col justify-between w-full">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="text-2xl font-bold text-neutral-800">{testimonials[active].title}</h3>
              <p className="text-sm text-neutral-500 mb-4">{testimonials[active].designation}</p>
              <p className="text-base text-neutral-600 whitespace-pre-line max-h-56 overflow-y-auto pr-2 leading-relaxed">
                {testimonials[active].description}
              </p>
            </motion.div>

            <CardItem translateZ={80} className="flex gap-4 pt-6">
              <button onClick={handlePrev} className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 transition">
                <ArrowBackIosNewIcon className="!text-sm text-neutral-700" />
              </button>
              <button onClick={handleNext} className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 transition">
                <ArrowForwardIosIcon className="!text-sm text-neutral-700" />
              </button>
            </CardItem>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
};