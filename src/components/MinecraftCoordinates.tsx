import React, { ReactElement } from "react";
import useMinecraftCoords from "../useMinecraftCoords";

function MinecraftCoordinates(): ReactElement {
  const { coords, dispatchCoords } = useMinecraftCoords();
  return (
    <div>
      {coords.map((coord) => (
        <p key={coord.id}>{JSON.stringify(coord)}</p>
      ))}
    </div>
  );
}

export default MinecraftCoordinates;
