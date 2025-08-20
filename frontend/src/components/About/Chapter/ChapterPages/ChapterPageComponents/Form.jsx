import React, { useState } from "react";

const Form = ({ ColorScheme }) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      {ColorScheme && (
        <div className="flex flex-col items-center justify-center text-center mt-12 px-4">
          {/* Heading */}
          <h1
            className="text-3xl md:text-4xl font-bold drop-shadow-lg mb-6"
            style={{ color: ColorScheme.JoinFormBGColor }}
          >
            Be Part of the IEEE-DTU Family
          </h1>

          {/* Join Button */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScdVzhcEbKrc61Y3aUzhK1NTybm7MpRfYNBvNAHSzV1tTpBzA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`
              px-8 py-3 rounded-2xl font-semibold text-lg transition-all duration-300
              shadow-md hover:shadow-xl backdrop-blur-md border border-white/20
              ${hover ? "scale-105" : "scale-100"}
            `}
            style={{
              backgroundColor: hover
                ? ColorScheme.JoinFormButtonHoverBG
                : ColorScheme.JoinFormBGColor,
              color: ColorScheme.PrimaryTextColor,
            }}
          >
            Join Now
          </a>
        </div>
      )}
    </>
  );
};

export default Form;
