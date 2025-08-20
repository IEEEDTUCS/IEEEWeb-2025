import React from 'react'
import styles from '@/styles/ChapterInfos.module.css'

const ChapterContact = ({ ContactInformation, ColorScheme }) => {
  return (
    <>
      {ContactInformation && (
        <div
          className={`${styles.contactBox} rounded-2xl shadow-md p-6 md:p-10 max-w-3xl mx-auto flex flex-col items-center text-center`}
          style={{ backgroundColor: ColorScheme.ContactBoxBG }}
        >
          {/* Email */}
          {ContactInformation.email && (
            <h2
              className={`font-caption ${styles.contactInfo} text-base sm:text-lg md:text-xl mb-4`}
              style={{ color: ColorScheme.ContactBoxTextColor }}
            >
              Contact us at:{" "}
              <a
                href={`mailto:${ContactInformation.email}`}
                className="hover:underline break-words"
                style={{ color: ColorScheme.MailTextColor }}
              >
                {ContactInformation.email}
              </a>
            </h2>
          )}

          {/* Follow us */}
          <h2
            className={`font-caption ${styles.contactInfo} text-base sm:text-lg md:text-xl mb-4`}
            style={{ color: ColorScheme.ContactBoxTextColor }}
          >
            Follow us on:
          </h2>

          {/* Social Icons */}
          <div
            className={`${styles.socialIconsContainer} flex gap-6 flex-wrap justify-center`}
          >
            <a
              href="https://www.instagram.com/ieee.dtu/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition duration-200"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                alt="Instagram"
                className="h-10 w-10 sm:h-12 sm:w-12"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/ieee-dtu/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition duration-200"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="h-10 w-10 sm:h-12 sm:w-12"
              />
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default ChapterContact
