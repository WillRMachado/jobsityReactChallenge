import React from "react";

import Day from "./day";

function weekColumn(props: { dayTitle: any; daysColumn: any }) {
  const { dayTitle, daysColumn } = props;
  return (
    <>
      <td
        style={{
          width:1,
        }}
      >
        {dayTitle}
        {daysColumn.map((date: any) => (
          <Day date={date} />
        ))}
      </td>
    </>
  );
}

export default weekColumn;
