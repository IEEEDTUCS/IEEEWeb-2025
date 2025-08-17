import { motion } from "framer-motion";
import { Card, CardContent, Divider, Typography } from "@mui/material";

export default function Form() {
  return (
    <section
      id="join"
      className="min-h-screen w-full flex flex-col items-center 
                 bg-gradient-to-br from-gray-950 via-gray-900 to-black
                 px-6 md:px-16 lg:px-24 py-20
                 shadow-2xl ring-1 ring-gray-800 relative overflow-hidden"
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl text-center relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
          BE PART OF IEEE-DTU FAMILY
        </h1>
        <div className="mx-auto mt-4 h-1 w-40 bg-gradient-to-r from-blue-500 to-indigo-500 blur-sm rounded-full"></div>
        <hr className="mt-6 mb-14 h-1 w-full bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 rounded-full border-0 shadow-md" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl relative z-10">
        {/*Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="px-6 py-8 rounded-3xl ring-1 ring-gray-700/50 shadow-2xl
                     bg-gradient-to-br from-gray-900/70 to-gray-950/50
                     backdrop-blur-xl hover:scale-[1.01] transition-transform duration-300"
        >
          <Typography variant="h5" className="text-blue-300 font-bold mb-6">
            Join Now
          </Typography>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-700/70">
            <iframe
              src="https://forms.gle/GG1daL1wu4fZddZB8"
              width="100%"
              height="900"
              className="w-full bg-gray-950"
            >
              Loading…
            </iframe>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="px-6 py-8 rounded-2xl ring-1 ring-gray-600 shadow-xl 
                             bg-gradient-to-br from-gray-900/70 via-indigo-950/60 to-purple-950/60 
                             backdrop-blur-xl hover:shadow-[0_0_40px_rgba(167,139,250,0.5)] 
                             transition-all"
        >
            <h1 className="font-bold text-indigo-300 text-center text-3xl my-4 ">
              Benefits Of Joining IEEE DTU
            </h1>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed text-justify">
            
            IEEE membership is an identity in itself. This includes invites to
            International conferences, journals, and year-round Seminars and
            Workshops. The members get special discounts on electronic devices
            and workshops. Competitions and contests like IEEE Xtreme are a
            direct opportunity to compete with the stalwarts of their fields.
            leee.org's email ID gives you a sense of belongingness in the
            outside world and opens up a lot of opportunities.
            <br />
            <br />
            IEEE members enjoy reduced rates on many proprietary products and
            services including IEEE books and eBooks, journals and articles,
            conferences and proceedings, standards, society memberships, and
            continuing education courses. In addition, members have access to a
            variety of affinity programs that offer savings. The IEEE Xplore
            Library offers a student member access to the ultimate collection of
            technical periodicals and conference publications at no additional
            cost. The latest research from 37 peer-reviewed magazines and
            journals, covering the whole spectrum of computing and if that
            wasn't enough to captivate your interest 700,000 documents from more
            than 300,000 content experts covering virtually every computing
            topic. Excited enough? Well, these were just the perks of being a
            member of IEEE Let's talk about the additional perks of IEEE DTU.
            Let's just say, it can't be expressed on a tiny page like this. But
            still, am gonna try.
            <br />
            <br />
            Ever wondered to participate in Robo wars and Robo roces. Did it
            ever occur to you, how to build one of those drones? Worry not, we
            have you covered! Becoming a member invites you to be a part of the
            family of great minds, each a master of his own field. who, in the
            due course of time would become your mentors. You will also get the
            chance to unleash your creativity through technology and innovate
            beyond limits through our annual hackathon Vihaan. We work using the
            concept of SIGS (Special Interest Groups) and take classes for you
            after compus hours and help you grow. Be it the field of Al and ML,
            or if you want to learn Arduino, or if you have a knack for
            designing, be it web or 30 Modelling. You can't stop exploring that
            is a guarantee we provide on our behalf.
            <br />
            <br />
            This is the only society of DTU that takes you on a trip after the
            success of its event. The Techfest! In the nascency of your college
            years, you get to manage great events, build trocks for the Robo
            races and wars, and that too on the beautiful OAT with moonlight
            shimmering down your face. Bliss! EXPLORATION, CURIOSITY, AND A
            DESIRE TO GROW, THAT'S ALL WE ASK.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
