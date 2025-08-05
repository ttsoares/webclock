"use cliendt";

import { useEffect, useState } from "react";

type ImageType = "day" | "night";

export default function useGreetingIconImage(): {
  greeting: string;
  icon: string;
  image: ImageType;
} {
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState<ImageType>("day");

  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let newGreeting = "";
    let newIcon = "";
    let newImage = "";
    if (currentHour >= 5 && currentHour < 12) {
      newGreeting = "Good morning";
      newIcon = "sun";
      newImage = "day";
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = "Good afternoon";
      newIcon = "sun";
      newImage = "day";
    } else {
      newGreeting = "Good evening";
      newIcon = "moon";
      newImage = "night";
    }

    setGreeting(newGreeting);
    setIcon(newIcon);
    setImage(newImage as ImageType);
  }, []);

  return { greeting, icon, image };
}
