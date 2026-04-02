import React from 'react'
import CS from '@/components/About/Chapter/ChapterPages/ChapterRoutes'
import Boilerplate from '@/layout/Boilerplate'

//placing JSON data here for simplicity, to be moved later.
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function ChapterCS() {
  return (
    <div><CS ChapterInformation={ChapterInfo.CS}/></div>
  )
}

export default Boilerplate(ChapterCS)