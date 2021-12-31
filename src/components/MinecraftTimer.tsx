import { ReactElement } from "react";
import useMinecraftTimer, {
  formatMillisecondsToTime
} from "../hooks/useMinecraftTimer";
import TimeDisplay from "./TimeDisplay";

interface Props {}

export default function MinecraftTimer({}: Props): ReactElement {
  const { timer, minecraftTimer, setDawn } = useMinecraftTimer();
  return (
    <div>
      <h2>Timer</h2>
      <p>{JSON.stringify(formatMillisecondsToTime(timer), null, 2)}</p>
      <p>{JSON.stringify(formatMillisecondsToTime(minecraftTimer), null, 2)}</p>
      <TimeDisplay time={formatMillisecondsToTime(minecraftTimer)} />
      <button onClick={setDawn}>sleep</button>
    </div>
  );
}
