import StyledButton from "./StyledButton";

export default function ChapContent({ image, desc }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
      
      {/* Image */}
      <div className="w-[350px] shrink-0 p-4 rounded-2xl bg-gray-300 shadow-lg hover:shadow-indigo-900/40 transition-all duration-500">
        <img
          className="object-cover w-full h-full rounded-2xl ring-1 ring-indigo-900/50 hover:scale-105 transition-transform duration-500 ease-out"
          src={image}
          alt="chapter"
        />
      </div>

      {/* Description */}
      <div className="flex-1 text-center md:text-left">
        <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed tracking-wide">
          {desc}
        </p>

        {/* Divider line */}
        <div className="mx-auto md:mx-0 mt-3 h-1 w-28 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md"></div>

        {/* Button */}
        <div className="mt-8">
          <StyledButton href="/more-details" variant="primary">
            Learn More
          </StyledButton>
        </div>
      </div>
    </div>
  );
}


