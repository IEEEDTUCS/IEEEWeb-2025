import React, { useState, useEffect } from 'react';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import Loader from '../utils/Loader';
import Chatbot from '@/utils/Chatbot/chatbotHelper';
import { useRouter } from 'next/router';

const boilerPlate = (WrappedComponent) => {
  const CommonComponent = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // start with loader on
      const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
      if (router.pathname === "/") {
        const timer = setTimeout(() => {
          setShowPopup(true);
        }, 1000); // 1 second delay

        return () => clearTimeout(timer);
      } else {
        setShowPopup(false);
      }
    }, [router.pathname]);


    useEffect(() => {
      // 1. Hide loader once DOM fully loads (initial page load)
      const handleDomLoad = () => setLoading(false);
      if (document.readyState === "complete") {
        // If already loaded (fast refresh)
        handleDomLoad();
      } else {
        window.addEventListener("load", handleDomLoad);
      }



      // 2. Show loader during route changes
      const handleStart = () => setLoading(true);
      const handleComplete = () => setLoading(false);

      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);

      return () => {
        window.removeEventListener("load", handleDomLoad);
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleComplete);
      };
    }, [router]);

    return (
      <>
      {showPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setShowPopup(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#f5f6f8]/95 shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
          >
            {/* Close */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-3 text-lg text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* Top Section (FIXED) */}
            <div className="rounded-t-2xl border-b border-black/5 bg-[#000000] px-6 py-4 text-center">
              <h2 className="text-sm font-heading font-semibold tracking-wide text-white">
                IEEE Membership Offer
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Limited-time student benefit
              </p>
            </div>

            {/* Content */}
            <div className="px-6 py-6 text-center text-gray-800">
              {/* Price */}
              <div className="mb-4 flex font-heading justify-center items-baseline gap-2">
                <span className="text-sm text-gray-400 line-through">₹1599</span>
                <span className="text-2xl font-semibold text-gray-900">
                  ₹899
                </span>
              </div>

              <p className="text-sm font-heading leading-relaxed text-gray-700">
                Join IEEE DTU and become part of the world’s largest technical
                community.
              </p>

              <p className="mt-2 font-heading text-xs text-gray-600">
                Events, workshops, industry exposure, and a strong peer network —
                beyond the classroom.
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd7UMXhD9i8VxbGwzQL59h9FMpkvyN3F0a1Cguvx-IxJit-kA/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-900 font-heading py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Join IEEE @ ₹899
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

        <Loader visible={loading} />
        {router.pathname === '/' ? null : <Navbar />}
        <WrappedComponent {...props} setGlobalLoading={setLoading} />
        <Chatbot></Chatbot>
        {router.pathname === '/' ? null : <Footer />}
      </>
    );
  };

  return CommonComponent;
};

export default boilerPlate;
