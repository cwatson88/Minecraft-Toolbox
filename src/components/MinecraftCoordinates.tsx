import React, { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";

import useMinecraftCoords, { Coords } from "../hooks/useMinecraftCoords";

interface Props {
  setCoords: (coords: Coords) => void;
  activeCoords: null | Coords;
}
function AddCoords(props: Props) {
  const { setCoords, activeCoords } = props;
  const formik = useFormik({
    initialValues: activeCoords || {
      name: "",
      x: "",
      y: "",
      z: "",
      world: "Overworld"
    },
    onSubmit: (values) => {
      const coords = { ...values, id: activeCoords?.id ?? uuidv4() };
      setCoords(coords);
    }
  });

  const { setValues } = formik;

  useEffect(() => {
    if (activeCoords) setValues(activeCoords);
  }, [activeCoords, setValues]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Co-ordinates Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <label htmlFor="world">world</label>
      <select
        id="world"
        name="world"
        onChange={formik.handleChange}
        value={formik.values.world}
      >
        <option>Overworld</option>
        <option>Nether</option>
      </select>
      <label htmlFor="x">x</label>
      <input
        id="x"
        name="x"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.x}
      />
      <label htmlFor="y">y</label>
      <input
        id="y"
        name="y"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.y}
      />
      <label htmlFor="z">z</label>
      <input
        id="z"
        name="z"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.z}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default function MinecraftCoordinates(): ReactElement {
  const { coords, dispatchCoords } = useMinecraftCoords();
  const [activeCoords, setActiveCoords] = useState<null | Coords>(null);
  return (
    <div>
      {coords &&
        coords.map((coord) => (
          <p
            key={coord.id}
            onDoubleClick={() => {
              setActiveCoords(coord);
            }}
          >
            {JSON.stringify(coord)}
          </p>
        ))}
      <AddCoords
        activeCoords={activeCoords}
        setCoords={(coords: Coords): void =>
          dispatchCoords({ type: "create", coords })
        }
      />
      <AddCoords
        activeCoords={activeCoords}
        setCoords={(coords: Coords): void =>
          dispatchCoords({ type: "update", coords })
        }
      />
    </div>
  );
}
