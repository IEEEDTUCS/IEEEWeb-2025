import React from 'react'
import WIE from '@/components/About/Chapter/ChapterPages/ChapterRoutes'
import Boilerplate from '@/layout/Boilerplate'

//placing JSON data here for simplicity, to be moved later.
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function ChapterWIE() {
  return (
    <div><WIE ChapterInformation={ChapterInfo.WIE} /></div>
  )
}

export default Boilerplate(ChapterWIE)