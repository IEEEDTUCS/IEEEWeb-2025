import React from 'react';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import { useRouter } from 'next/router';
// This is a higher-order component (HOC) that can be used to wrap other components
// It can be used to add common functionality or layout to multiple components


const boilerPlate = (WrappedComponent) => {//passed as entire component here
    
    const CommonComponent = (props) => {
        const router = useRouter();
        return (
            <>
                {/* <Navbar /> */}
                <WrappedComponent {...props} />
                {/* {router.pathname === '/' ? null : <Footer />} */}
            </>
        );
    };

    return CommonComponent;
};

export default boilerPlate;
