import { ReactElement, useEffect } from "react";
import useCountdownTimer from "../hooks/useCountdownTimer";

// interface Props {}

export default function MineCraftCropTimer(): ReactElement {
  const { timeRemaining } = useCountdownTimer({
    countdownTime: { minutes: 3 }
  });

  // useEffect(() => {
  //   console.log(timeRemaining);
  // });
  return (
    <div>
      <h2>Crop Timer</h2>
      {timeRemaining?.total}
    </div>
  );
}
