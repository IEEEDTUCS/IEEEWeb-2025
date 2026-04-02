import React from 'react'
import AboutIEEE from '@/components/About/aboutIntro/AboutIEEE'
import Chapter from '@/components/About/Chapter/Chapter'
import Faculty from '@/components/About/Faculty/Faculty'
import boilerPlate from '@/layout/Boilerplate'

function about() {
  return (
    <>
    <div><AboutIEEE> </AboutIEEE></div>
    <div><Chapter></Chapter></div> {/* Add routes to access individual chapters this component will display basic information about each chapter */}
    <div><Faculty></Faculty></div>
    </>
  )
}

export default boilerPlate(about)