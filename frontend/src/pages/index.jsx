import React from 'react'
import LandingPage from "@/components/LandingPage"
import boilerPlate from '@/layout/Boilerplate'

function Home() {
  return (
    <div><LandingPage></LandingPage></div>
  )
}

export default boilerPlate(Home)