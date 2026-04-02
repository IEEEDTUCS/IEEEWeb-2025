import React from 'react'
import PES_IAS from '@/components/About/Chapter/ChapterPages/ChapterRoutes'
import Boilerplate from '@/layout/Boilerplate'

import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function ChapterPES_IAS() {
  return (
    <div><PES_IAS ChapterInformation={ChapterInfo.PES_IAS}/></div>
  )
}

export default Boilerplate(ChapterPES_IAS)