import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const echoes = [
  {
    title: "Echo 1.O",
    link: "https://drive.google.com/file/d/1FXXYn6BYUEXEwRdoakvRNpoODFWLWz29/preview",
    image: "/echoes/echoes1.jpg",
  },
  {
    title: "Echo 2.O",
    link: "https://drive.google.com/file/d/1dKqNR00hXFaOFR62Zxm40tx7U53MsHb8/preview",
    image: "/echoes/echoes2.jpg",
  },
  {
    title: "Echo 3.O",
    link: "https://drive.google.com/file/d/1j5NUIw4WbflgP3znGsNri8gF3RDPNtOj/preview",
    image: "/echoes/echoes3.jpg",
  },
  {
    title: "Echo 4.O",
    link: "https://drive.google.com/file/d/1Ihxx9r-3F841MfW7KAC8pI6UhNzUd4-_/preview",
    image: "/echoes/echoes4.jpg",
  },
  {
    title: "Echo 5.O",
    link: "https://drive.google.com/file/d/1hT9ceYOAZfqYOgnMZTNJYpW-H8JX0fKb/preview",
    image: "/echoes/echoes5.jpg",
  },
  {
    title: "Echo 6.O",
    link: "https://drive.google.com/file/d/14ksyQxVNlmvn-Dlejx3UxAlmt6Ph8dB1/preview",
    image: "/echoes/echoes6.jpg",
  },
];

const Echoes = () => {
  const [selectedPdf, setSelectedPdf] = React.useState(null);

  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-md py-16 px-6">
      <div className="text-center mb-16">
        <p className="text-blue-600 font-bold text-sm sm:text-base lg:text-lg uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6">
          Publications
        </p>

        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-tight tracking-tight">
          ECHO – IEEE DTU Newsletter
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover ECHO, the official newsletter of IEEE DTU, featuring student achievements, technical insights, and highlights from our events and initiatives.
        </p>
      </div>

      <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {echoes.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => setSelectedPdf(item.link)}
              className="cursor-pointer bg-[#0f172a] border border-gray-700 rounded-2xl overflow-hidden hover:scale-105 transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        <div className="flex justify-center gap-4 mt-8">
          <button className="prev-btn group bg-white/90 backdrop-blur-md border border-gray-200 hover:bg-white text-gray-800 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            ◀
          </button>
          <button className="next-btn group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            ▶
          </button>
        </div>
      </div>
      </div>
      {selectedPdf && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] h-[85%] rounded-xl shadow-xl relative overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
            >
              ✕
            </button>

            {/* PDF Viewer */}
            <iframe
              src={selectedPdf}
              title="PDF Viewer"
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Echoes;