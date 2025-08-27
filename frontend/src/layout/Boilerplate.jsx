import React, { useState, useEffect } from 'react';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import Loader from '../utils/Loader';
import { useRouter } from 'next/router';

const boilerPlate = (WrappedComponent) => {
  const CommonComponent = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // start with loader on

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
        <Loader visible={loading} />
        {router.pathname === '/' ? null : <Navbar />}
        <WrappedComponent {...props} setGlobalLoading={setLoading} />
        {router.pathname === '/' ? null : <Footer />}
      </>
    );
  };

  return CommonComponent;
};

export default boilerPlate;
