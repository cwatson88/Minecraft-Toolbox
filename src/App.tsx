import "./styles.css";

import MinecraftCoordinates from "./components/MinecraftCoordinates";
import MineCraftCropTimer from "./components/MineCraftCropTimer";
import MinecraftTimer from "./components/MinecraftTimer";

export default function App() {
  return (
    <div className="App">
      <h1>Minecraft</h1>
      <MinecraftTimer />
      <MineCraftCropTimer />
      <MinecraftCoordinates />
    </div>
  );
}
