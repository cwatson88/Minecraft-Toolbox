import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
// import { equals } from "../utils";
import { Database } from "../db/index";

export interface Coords {
  // world: "over" | "nether";
  world: string;
  name: string;
  id: string;
  x: string;
  y: string;
  z: string;
}

interface CoordsAction {
  type: "create" | "delete" | "update" | "addFromDb";
  index?: number;
  coords: Coords;
  dbCoords?: Array<Coords>;
}

const db = new Database("minecraft2", "mc-world");

export default function useMinecraftCoords() {
  const [coords, dispatchCoords] = useImmerReducer<Coords[], CoordsAction>(
    (draft: Coords[], action: CoordsAction) => {
      let index =
        action.index ??
        draft.findIndex(({ id }: Coords) => id === action.coords.id);

      switch (action.type) {
        case "addFromDb":
          draft.push(action.coords);
          break;

        case "create":
          // check to see if it already exists
          if (index) return;
          draft.push(action.coords);
          db.set(action.coords.id, action.coords);
          break;

        case "delete":
          if (!index) return;
          draft.splice(index, 1);
          db.del(action.coords.id);
          break;

        case "update":
          if (!index) return;
          draft[index] = action.coords;
          db.set(action.coords.id, action.coords);
          break;

        default:
          break;
      }
    },
    [
      /* initial todos */
    ]
  );

  useEffect(() => {
    if (coords.length) return;

    db.getAll().then((dbCoords: Coords[]) => {
      dbCoords.forEach((coords) => {
        dispatchCoords({ type: "addFromDb", coords });
      });
    });
  }, [coords, dispatchCoords]);

  return { coords, dispatchCoords };
}
