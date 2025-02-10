import { useRef, useEffect } from "react";

export default function useWithSound(source) {
  const soundRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    soundRef.current = new Audio(source);
  });

  function playsound() {
    soundRef.current.play();
  }

  return { playsound };
}
