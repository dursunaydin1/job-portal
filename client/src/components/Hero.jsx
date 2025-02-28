import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white rounded-xl py-16 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 1000+ Jobs to apply
        </h2>
        <p className="mb-8 max-w-xl text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore The Best Jobs
          Opportunities In Your Field And Take Your Career To The Next Level
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center flex-1 mb-2 sm:mb-0">
            <img className="h-5 sm:h-6" src={assets.search_icon} alt="" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>
          <div className="hidden sm:flex items-center mx-2">
            <div>|</div>
          </div>
          <div className="flex items-center flex-1 mb-2 sm:mb-0">
            <img className="h-5 sm:h-6" src={assets.location_icon} alt="" />
            <input
              type="text"
              placeholder="Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-blue-600 px-6 py-2 rounded text-white m-1"
          >
            Search
          </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo} alt="" />
          <img className="h-6" src={assets.walmart_logo} alt="" />
          <img className="h-6" src={assets.accenture_logo} alt="" />
          <img className="h-6" src={assets.samsung_logo} alt="" />
          <img className="h-6" src={assets.amazon_logo} alt="" />
          <img className="h-6" src={assets.adobe_logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
