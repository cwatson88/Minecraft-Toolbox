import React, { ReactElement } from "react";

interface Props {
  time: {
    secs: string;
    mins: string;
    hrs: string;
  };
}

function MinecraftTime({ time }: Props): ReactElement {
  return <div>{`${time.hrs}:${time.mins}:${time.secs}`}</div>;
}

export default MinecraftTime;
