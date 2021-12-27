import { useState, useEffect } from "react";

function setTime(time: number, timeLimit: number, timeInSecs: number) {
  const setUnit = ~~((time % timeLimit) / timeInSecs); //Bitwise operation "~~" is used the same way as Math.floor
  const zero = setUnit.toString().length;
  if (zero < 2) {
    return setUnit.toString().padStart(2, "0");
  }
  return setUnit.toString();
}

export function formatSecondsToTime(time: number) {
  const timeUnit = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2628000,
    years: 31556930
  };

  const secs = setTime(time, timeUnit.minutes, timeUnit.seconds);
  const mins = setTime(time, timeUnit.hours, timeUnit.minutes);
  const hrs = setTime(time, timeUnit.days, timeUnit.hours);
  const days = setTime(time, timeUnit.weeks, timeUnit.days);
  const weeks = setTime(time, timeUnit.weeks, timeUnit.days);
  const months = setTime(time, timeUnit.months, timeUnit.weeks);
  const years = setTime(time, Infinity, timeUnit.years);

  return {
    secs,
    mins,
    hrs,
    days,
    weeks,
    months,
    years
  };
}

// Minecraft time multiplier each second = 72 seconds in MC
export const mcTime = (time: number) => Math.floor(Number(time) * 72.2);

export default function useMinecraftTimer() {
  const [start, setStart] = useState(Date.now());
  const [totalTime, setTotalTime] = useState(0);
  const [timer, setTimer] = useState(0); // time in ms
  const [minecraftTimer, setMinecraftTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const setDawn = () => {
    setTotalTime(totalTime + timer);
    setStart(Date.now() - 300000);
  };

  const pause = () => {
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPaused) {
      const timeout = setTimeout(() => {
        setTimer((Date.now() - start) / 1000);
      }, 100);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [timer, isPaused, start]);

  useEffect(() => {
    setMinecraftTimer(mcTime(timer));
  }, [timer]);

  return {
    timer,
    setTimer,
    minecraftTimer,
    isPaused,
    pause,
    resume,
    start,
    setDawn,
    totalTime
  };
}
