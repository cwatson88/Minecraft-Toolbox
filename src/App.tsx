import "./styles.css";
import useMinecraftTimer, { formatSecondsToTime } from "./useMinecraftTimer";
import MinecraftTime from "./components/MinecraftTime";
import MinecraftCoordinates from "./components/MinecraftCoordinates";

// timer ✅

// increment the number ✅

// format the number to ms / s / m / hr / days / weeks / years ✅

// convert normal time to mc time ✅

// Buttons:
//    - pause ✅
//    - reset / sleep

export default function App() {
  const { timer, minecraftTimer, setDawn } = useMinecraftTimer();

  return (
    <div className="App">
      <h1>Minecraft timer</h1>
      <p>{JSON.stringify(formatSecondsToTime(timer), null, 2)}</p>
      <p>{JSON.stringify(formatSecondsToTime(minecraftTimer), null, 2)}</p>
      <button onClick={setDawn}>sleep</button>
      <MinecraftTime time={formatSecondsToTime(minecraftTimer)} />
      <MinecraftCoordinates />
    </div>
  );
}
