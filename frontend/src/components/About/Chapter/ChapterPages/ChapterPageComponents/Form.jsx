import React, { useState } from 'react'
import styles from '@/styles/ChapterInfos.module.css'

const Form = ({ ColorScheme }) => {
  
  const [hover, setHover] = useState(false);

  return (
    <>
    { ColorScheme &&
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <h1 className={styles.formMessage} style={{ color: ColorScheme.JoinFormBGColor }}>Be Part of the IEEE-DTU Family</h1>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLScdVzhcEbKrc61Y3aUzhK1NTybm7MpRfYNBvNAHSzV1tTpBzA/viewform' target='_blank' className={styles.formButton}
              onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
              style={{ background: hover ? ColorScheme.JoinFormButtonHoverBG : ColorScheme.JoinFormBGColor }}>Join Now</a>
        </div>
    }
    </>
  )
}

export default Form
