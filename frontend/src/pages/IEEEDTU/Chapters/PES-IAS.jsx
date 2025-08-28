import React from 'react'
// import C2 from '@/components/About/Chapter/ChapterPages/C2'
import C1 from '@/components/About/Chapter/ChapterPages/C1'
import Boilerplate from '@/layout/Boilerplate'

//placing JSON data here for simplicity, to be moved later.
import ChapterInfo from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterInfo'

function PES_IAS() {
  return (
    <div><C1 ChapterInformation={ChapterInfo.PES_IAS}/></div>
  )
}

export default Boilerplate(PES_IAS)