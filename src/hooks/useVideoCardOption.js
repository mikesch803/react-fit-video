import { useState } from "react";

export function useVideoCardOption() {
  const [videoCardOptionState, setVideoCardOptionState] = useState();
  return { videoCardOptionState, setVideoCardOptionState };
}
