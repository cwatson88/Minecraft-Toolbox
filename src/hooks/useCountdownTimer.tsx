import { useRef, useState } from "react";
import { add, Duration } from "date-fns";
import { useInterval } from "../hooks/useInterval";

interface Props {
  countdownTime: Duration;
}

interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeRemaining(endtime: Date, now: number): TimeRemaining {
  const total = Date.parse(endtime.toString()) - now;
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

export default function useCountdownTimer({ countdownTime }: Props) {
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<null | TimeRemaining>(
    null
  );
  // const [] =
  const endDate = useRef(add(Date.now(), countdownTime));

  useInterval(() => {
    // console.log(endDate.current, Date.now());
    const timeLeft = getTimeRemaining(endDate.current, Date.now());
    setTimeRemaining(timeLeft);
    if (!timeRemaining) setTimeIsUp(true);
  }, 1000);

  return { timeIsUp, timeRemaining };
}
