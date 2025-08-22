import React from 'react'
import styles from '@/styles/ChapterInfos.module.css'
import Form from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/Form'
import { CarouselComp } from '@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterEventCarousel'

const ChapterCommonComponent = ({ ComponentInformation, ColorScheme }) => {
  return (
    <>
      { ComponentInformation && ComponentInformation.isAbout &&
        <div className={styles.infoContainer} style={{ background: ColorScheme.CommonComponentBG }}>
            { ComponentInformation.heading && <h1 className={`font-subheading ${styles.infoHeading}`}
              style={{ color: ColorScheme.PrimaryTextColor }}>{ComponentInformation.heading}</h1>}
            { ComponentInformation.content && <p className={`font-body ${styles.infoContent}`}
              style={{ color: ColorScheme.SecondaryTextColor }}> {ComponentInformation.content}
              </p> }
        </div>
      }

      { ComponentInformation && ComponentInformation.isEvents &&
        <div className={styles.infoContainer} style={{ background: ColorScheme.CommonComponentBG }}>
             { ComponentInformation.heading && <h1 className={`font-subheading ${styles.infoHeading}`}
              style={{ color: ColorScheme.PrimaryTextColor }}>{ComponentInformation.heading}</h1> }

            { ComponentInformation.images && <CarouselComp images={ComponentInformation.images} SelectedDot={ColorScheme.SelectedDot} /> }

        </div>
      }

      { ComponentInformation && ComponentInformation.isMembership &&
        <div className={styles.infoContainer} style={{ background: ColorScheme.CommonComponentBG }}>
            { ComponentInformation.heading && <h1 className={`font-subheading ${styles.infoHeading}`}
              style={{ color: ColorScheme.PrimaryTextColor }}>{ComponentInformation.heading}</h1> }
            { ComponentInformation.content1 && <p className={`font-body ${styles.infoContentBenefits}`}
              style={{ color: ColorScheme.SecondaryTextColor }}>{ComponentInformation.content1}</p> }
            <br /><br />
            { ComponentInformation.content2 && <p className={`font-body ${styles.infoContentBenefits}`}
              style={{ color: ColorScheme.SecondaryTextColor }}>{ComponentInformation.content2}</p> }

            <Form ColorScheme={ColorScheme} /> 
        </div>
      }
    </>
  )
}

export default ChapterCommonComponent
