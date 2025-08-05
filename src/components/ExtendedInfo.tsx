'use client';

import useGreetingIconImage from "../hooks/useGreetingIconImage";
import useTimeAndLocation from "../hooks/useIPLocation";
import ExtendedInfoItem from "./ExtendedInfoItem";

function ExtendedInfo({ className }: { className: string }) {
  const { image } = useGreetingIconImage();

  const { timeAndLocation, loading, error } = useTimeAndLocation();

  const timezone = timeAndLocation?.time?.timezone;
  const yearDay = timeAndLocation?.time?.yearDay;
  const weekDay = timeAndLocation?.time?.weekDay === "0" ? "7" : timeAndLocation?.time?.weekDay;
  const weekNumber = timeAndLocation?.time?.weekNumber;

  const isDay = image === "day";

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  return (
    <div
      className={`relative grid gap-y-[0.5rem] py-[3rem] px-[1rem] ${className} transition-all duration-[0.4s]
        md:grid-cols-2 md:gap-y-[3rem] md:gap-x-[7rem] md:pt-[1rem] md:pb-[1rem] md:pl-[6.4rem]
        lg:gap-y-[2.2rem] lg:gap-x-[20.3rem] lg:py-[2.4rem] lg:pl-[16.5rem]
      `}
      style={{
        backgroundColor: isDay
          ? "rgba(265, 265, 265, 0.35)"
          : "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(2rem)",
        color: isDay ? "#000" : "#fff",
      }}
    >
      <ExtendedInfoItem
        info={timezone ?? ""}
        infoType="Current timezone"
        className="md:order-1"
      />
      <ExtendedInfoItem
        info={yearDay ?? ""}
        infoType="Day of the year"
        className="md:order-3"
      />
      <ExtendedInfoItem
        info={weekDay ?? ""}
        infoType="Day of the week"
        className="md:order-2"
      />
      <ExtendedInfoItem
        info={weekNumber ?? ""}
        infoType="Week number"
        className="md:order-4"
      />
    </div>
  );
}

export default ExtendedInfo;
