import { useRef, useEffect } from "react";

export default function useWithSound(source: string | undefined) {
  const soundRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    soundRef.current = new Audio(source);
  });

  function playsound() {
    soundRef.current!.play().catch((error) => {
      console.log(error);
    });
  }

  return { playsound };
}
