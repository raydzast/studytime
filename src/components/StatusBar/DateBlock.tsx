import * as React from "react";

function DateBlock() {
  const currentDate = new Date();
  const timezoneOffsetSecs = currentDate.getTimezoneOffset() * 60 * 1000;
  const unixTimestamp = currentDate.valueOf();
  const dateString = new Date(unixTimestamp - timezoneOffsetSecs)
    .toISOString()
    .slice(0, 10);

  return <div className="darkgray-bg">{dateString}</div>;
}

export { DateBlock };
