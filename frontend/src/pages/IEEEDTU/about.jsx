import React from 'react'
import AboutIEEE from '@/components/About/aboutIntro/AboutIEEE'
import Chapter from '@/components/About/Chapter/Chapter'
import Faculty from '@/components/About/Faculty/Faculty'
import boilerPlate from '@/layout/Boilerplate'
import Echoes from '@/components/About/Echoes/Echoes'

function about() {
  return (
    <>
    <div><AboutIEEE> </AboutIEEE></div>
    <div><Chapter></Chapter></div> {/* Add routes to access individual chapters this component will display basic information about each chapter */}
    <div><Faculty></Faculty></div>
    <div><Echoes></Echoes></div>
    </>
  )
}

export default boilerPlate(about)