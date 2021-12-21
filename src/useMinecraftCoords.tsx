import { useState, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { equals } from "./utils";
import { v4 as uuidv4 } from "uuid";

interface Coords {
  // world: "over" | "nether";
  world: string;
  name: string;
  id: string;
  x: string;
  y: string;
  z: string;
}

interface CoordsAction {
  type: "create" | "delete" | "update";
  index?: number;
  coords: Coords;
}

export default function useMinecraftCoords() {
  const [coords, dispatchCoords] = useImmerReducer(
    (draft, action: CoordsAction) => {
      switch (action.type) {
        case "create":
          action.coords.id = uuidv4();
          draft.push(action.coords);
          break;

        case "delete":
          let index =
            action.index ??
            draft.findIndex((coord: Coords) => equals(coord, action.coords));
          draft.splice(index, 1);
          break;

        case "update":
          let indexx =
            action.index ??
            draft.findIndex((coord: Coords) => equals(coord, action.coords));
          draft[indexx] = action.coords;
          break;

        default:
          break;
      }
    },
    [
      {
        world: "over",
        name: "my worlds",
        id: uuidv4(),
        x: "123",
        y: "-987",
        z: "001"
      }
      /* initial todos */
    ]
  );

  return { coords, dispatchCoords };
}
