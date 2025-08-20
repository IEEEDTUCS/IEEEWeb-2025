import React from "react";
import Form from "@/components/About/Chapter/ChapterPages/ChapterPageComponents/Form";
import { CarouselComp } from "@/components/About/Chapter/ChapterPages/ChapterPageComponents/ChapterEventCarousel";

const ChapterCommonComponent = ({ ComponentInformation, ColorScheme }) => {
  return (
    <>
      {/* About */}
      {ComponentInformation?.isAbout && (
        <div
          className="w-full px-4 sm:px-6 md:px-12 py-10 rounded-2xl shadow-md my-6 text-center"
          style={{ backgroundColor: ColorScheme.CommonComponentBG }}
        >
          {ComponentInformation.heading && (
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
              style={{ color: ColorScheme.PrimaryTextColor }}
            >
              {ComponentInformation.heading}
            </h1>
          )}
          {ComponentInformation.content && (
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
              style={{ color: ColorScheme.SecondaryTextColor }}
            >
              {ComponentInformation.content}
            </p>
          )}
        </div>
      )}

      {/* Events  */}
      {ComponentInformation?.isEvents && (
        <div
          className="w-full px-4 sm:px-6 md:px-12 py-10 rounded-2xl shadow-md my-6"
          style={{ backgroundColor: ColorScheme.CommonComponentBG }}
        >
          {ComponentInformation.heading && (
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center"
              style={{ color: ColorScheme.PrimaryTextColor }}
            >
              {ComponentInformation.heading}
            </h1>
          )}

          {ComponentInformation.images && (
            <div className="max-w-5xl mx-auto">
              <CarouselComp images={ComponentInformation.images} />
            </div>
          )}
        </div>
      )}

      {/* Membership */}
      {ComponentInformation?.isMembership && (
        <div
          className="w-full px-4 sm:px-6 md:px-12 py-10 rounded-2xl shadow-md my-6"
          style={{ backgroundColor: ColorScheme.CommonComponentBG }}
        >
          {ComponentInformation.heading && (
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center"
              style={{ color: ColorScheme.PrimaryTextColor }}
            >
              {ComponentInformation.heading}
            </h1>
          )}

          {ComponentInformation.content1 && (
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed mb-4"
              style={{ color: ColorScheme.SecondaryTextColor }}
            >
              {ComponentInformation.content1}
            </p>
          )}

          {ComponentInformation.content2 && (
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed mb-8"
              style={{ color: ColorScheme.SecondaryTextColor }}
            >
              {ComponentInformation.content2}
            </p>
          )}

          <div className="max-w-lg mx-auto">
            <Form ColorScheme={ColorScheme} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChapterCommonComponent;
