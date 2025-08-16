import React from 'react'
import LandingPage from "@/components/LandingPage"
import boilerPlate from '@/layout/Boilerplate'

function Home() {
  return (
    <><div><LandingPage></LandingPage></div><div>checking deployment changes, some more</div></>
  )
}

export default boilerPlate(Home)