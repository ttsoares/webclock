'use client';
import { useState } from "react";
import Image from 'next/image';
import useGreetingIconImage from "@/hooks/useGreetingIconImage";
import Button from "@/components/Button";
import ExtendedInfo from "@/components/ExtendedInfo";
import Quote from "@/components/Quote";
import TimeAndPlace from "@/components/TimeAndPlace";
import dskDayImage from '../../public/images/desktop/bg-image-daytime.jpg';
import dskNightImage from '../../public/images/desktop/bg-image-nighttime.jpg';
import tblDayImage from '../../public/images/tablet/bg-image-daytime.jpg';
import tblNightImage from '../../public/images/tablet/bg-image-nighttime.jpg';
import mblDayImage from '../../public/images/mobile/bg-image-daytime.jpg';
import mblNightImage from '../../public/images/mobile/bg-image-nighttime.jpg';

const imageMap = {
  desktop: {
    day: dskDayImage,
    night: dskNightImage
  },
  tablet: {
    day: tblDayImage,
    night: tblNightImage
  },
  mobile: {
    day: mblDayImage,
    night: mblNightImage
  }
};

type ImageType = 'day' | 'night';

function Home() {
  const [showExpandedInfo, setShowExpandedInfo] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const { image }: { image: ImageType } = useGreetingIconImage();

  function handleExpandedInfo() {
    if (showExpandedInfo) {
      setAnimateOut(true);
      setTimeout(() => {
        setShowExpandedInfo(false);
        setAnimateOut(false);
      }, 300);
    } else {
      setShowExpandedInfo(true);
    }
  }

  if (!image) return <div>Loading...</div>;

  return (
    <div className="relative min-h-screen">
      {/* Background images */}
      <Image
        src={imageMap.mobile[image]}
        alt="Background image"
        fill
        className="object-cover fixed z-[-10] md:hidden"
        priority
        sizes="(max-width: 768px) 100vw, 0px"
      />
      <Image
        src={imageMap.tablet[image]}
        alt="Background image"
        fill
        className="object-cover fixed z-[-10] hidden md:block lg:hidden"
        priority
        sizes="(max-width: 768px) 100vw, 0px"
      />
      <Image
        src={imageMap.desktop[image]}
        alt="Background image"
        fill
        className="object-cover fixed z-[-10] hidden lg:block"
        priority
        sizes="(max-width: 768px) 100vw, 0px"
      />

      {/* Dark overlay over background */}
      <div className="fixed inset-0 bg-black opacity-40 z-[-1]" />

      {/* Main content container */}
      <div className={`flex flex-col relative z-10 transition-all duration-300 ease-in-out ${showExpandedInfo ? 'h-screen' : 'h-[90vh]'
        }`}>
        {/* Top content */}
        <div className={`flex-1 h-[40%] flex flex-col justify-between `}>
          {/* Quotes */}
          <div
            className={`md:ml-5 lg:ml-40 mt-5 transform transition-all duration-500 ease-in-out
                        ${showExpandedInfo ? "opacity-0 -translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"}`}
          >
            <Quote />
          </div>
          <div className="flex flex-col ml-5 lg:flex-row lg:items-end lg:mb-[5.6rem] lg:justify-between lg:ml-40">
            <TimeAndPlace />
          </div>
        </div>
        <div className="flex md:ml-5 lg:ml-0 lg:justify-end mb-4">
          {!showExpandedInfo && (
            <Button
              onClick={handleExpandedInfo}
              arrowDirection="down"
              btnText="More"
            />
          )}
        </div>
        {/* ExtendedInfo section that pushes content up */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out
                        ${showExpandedInfo && !animateOut ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0'}
                      `}>
          <div className="flex lg:justify-end mb-4">
            <Button
              onClick={handleExpandedInfo}
              arrowDirection="up"
              btnText="Less"
            />
          </div>
          <ExtendedInfo className="mt-5" />
        </div>
      </div>
    </div>
  );
}

export default Home;