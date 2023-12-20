import { useEffect, useState } from "react";

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState<boolean>(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    const audio = new Audio(url);
    audio.addEventListener("ended", () => setPlaying(false));
    setAudio(audio);
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [url]);

  useEffect(() => {
    playing ? audio?.play() : audio?.pause();
  }, [playing]);

  return { playing, toggle };
};
