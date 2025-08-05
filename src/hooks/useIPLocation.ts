"use client";

import { useState, useEffect } from "react";
import getLocation from "../apis/apiGeolocation";
import getTime from "../apis/apiWorldTime";

function useTimeAndLocation() {
  const [location, setLocation] = useState({ city: "", country: "" });
  const [time, setTime] = useState({
    abbr: "",
    weekDay: "",
    yearDay: "",
    timezone: "",
    weekNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function bringLocation() {
    try {
      const { city, country } = await getLocation();
      setLocation({ city, country });
    } catch (err) {
      console.error("Location fetch failed:", err);
      setError("Failed to fetch location");
    }
  }

  async function bringTime() {
    try {
      const { abbreviation, day_of_week, day_of_year, timezone, week_number } =
        await getTime();
      setTime({
        abbr: abbreviation,
        weekDay: String(day_of_week),
        yearDay: String(day_of_year),
        timezone,
        weekNumber: String(week_number),
      });
    } catch (err) {
      console.error("Time fetch failed:", err);
      setError("Failed to fetch time");
    }
  }

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);
      await Promise.all([bringLocation(), bringTime()]);
      setLoading(false);
    }

    fetchAll();
  }, []);

  let timeAndLocation = null;
  if (time && location) {
    timeAndLocation = {
      time: {
        abbr: time.abbr,
        weekDay: time.weekDay,
        yearDay: time.yearDay,
        timezone: time.timezone,
        weekNumber: time.weekNumber,
      },
      location: {
        city: location.city,
        country: location.country,
      },
    };
  }

  return { timeAndLocation, loading, error };
}

export default useTimeAndLocation;
