import React from 'react'
import C1 from '@/components/About/Chapter/ChapterPages/C1'
import Boilerplate from '@/layout/Boilerplate'

//placing JSON data here for simplicity, to be moved later.
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function CS() {
  return (
    <div><C1 ChapterInformation={ChapterInfo.CS}/></div>
  )
}

export default Boilerplate(CS)