import React from 'react'
import CASS from '@/components/About/Chapter/ChapterPages/ChapterRoutes'
import Boilerplate from '@/layout/Boilerplate'

//placing JSON data here for simplicity, to be moved later.
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function ChapterCASS() {
  return (
    <div><CASS ChapterInformation={ChapterInfo.CASS}/></div>
  )
}

export default Boilerplate(ChapterCASS)