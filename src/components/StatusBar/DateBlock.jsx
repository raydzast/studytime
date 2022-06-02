import React from "react";

export default function DateBlock(props) {
  const dateString = new Date(
    new Date().valueOf() - new Date().getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .slice(0, 10);

  return <div className="darkgray-bg">{dateString}</div>;
}
