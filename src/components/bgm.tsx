"use client";

import { Howl } from "howler";
import { useEffect } from "react";

export const Bgm = () => {
  useEffect(() => {
    const sound = new Howl({
      src: ["/bgm.mp3"],
      loop: true,
      volume: 0.2,
    });
    if (sound.playing()) {
      sound.stop();
    }
    sound.play();
    return () => {
      sound.stop();
    };
  }, []);

  return null;
};
