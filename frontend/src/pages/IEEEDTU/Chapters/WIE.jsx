import React from 'react'
import C1 from '@/components/About/Chapter/ChapterPages/C1'
import Boilerplate from '@/layout/Boilerplate'

//placing JSON data here for simplicity, to be moved later.
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function WIE() {
  return (
    <div><C1 ChapterInformation={ChapterInfo.WIE} /></div>
  )
}

export default Boilerplate(WIE)