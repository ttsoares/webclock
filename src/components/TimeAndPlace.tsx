'use client';

import useTime from "../hooks/useTime";
import useTimeAndLocation from "../hooks/useIPLocation";
import useGreetingIconImage from "../hooks/useGreetingIconImage";

import Image from "next/image";

function TimeAndPlace() {

  // Local time to determine if it's day or night
  const time = useTime();

  const { timeAndLocation, loading, error } = useTimeAndLocation();

  const { greeting, icon } = useGreetingIconImage();

  if (loading) {
    return <p className="text-white text-xl">Loading...</p>;
  }

  if (error || !timeAndLocation) {
    return <p className="text-red-500 text-xl">Error: {error}</p>;
  }

  const timeAbbr = timeAndLocation?.time?.abbr;
  const city = timeAndLocation?.location?.city;
  const country = timeAndLocation?.location?.country;

  const [hours, minutes] = time.split(":");

  let hourNumber = parseInt(hours, 10);

  if (hourNumber === 24) {
    hourNumber = 0;
  }

  const formattedHour = hourNumber.toString().padStart(2, "0");
  const formattedTime = `${formattedHour}:${minutes}`;

  return (
    <div className="flex flex-col gap-[1.6rem] h-[18.5rem] mb-[4.8rem]
                    md:gap-0 md:h-[15rem] md:mb-[8rem]
                    lg:mb-0 lg:gap-[1.6rem] lg:h-[20.8rem]
                    ">
      <div className="greeting flex gap-[1.6rem] items-center mb-9">
        <Image
          src={`/images/desktop/icon-${icon}.svg`}
          alt={`Icon ${icon}`}
          width={24}
          height={24}
          className="w-auto h-auto"
        />
        <p className="ps-5">
          {greeting}
          <span className="hidden md:inline">, it`s currently</span>
        </p>
      </div>

      <div className="flex items-end">
        <time className="ps-1 lg:ps-1">
          {formattedTime}
        </time>

        <div className="ps-3 lg:ps-3">
          {timeAbbr}
        </div>
      </div>
      <div className="ps-4 lg:ps-4 mt-5">
        In {city}, {country}
      </div>
    </div>
  );
}

export default TimeAndPlace;
