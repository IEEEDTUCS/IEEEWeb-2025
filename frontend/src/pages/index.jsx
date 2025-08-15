import React from 'react'
import LandingPage from "@/components/LandingPage"
import boilerPlate from '@/layout/Boilerplate'
import C1 from '@/components/About/Chapter/ChapterPages/C1'

function Home() {
  return (
    <div><LandingPage></LandingPage></div>
    // <C1></C1>
  )
}

export default boilerPlate(Home)