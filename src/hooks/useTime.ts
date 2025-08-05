"use client";

import { useEffect, useState } from "react";

export default function useTime() {
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
      console.log("Time updated");
    }, 1800000);

    return () => clearInterval(id);
  }, []);

  return time;
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
