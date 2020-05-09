import React from "react";

import Day from "./day";

function weekColumn(props: {
  dayTitle: any;
  daysColumn: any;
  currentMonth: any;
}) {
  const { dayTitle, daysColumn, currentMonth } = props;
  return (
    <>
      <td
        style={{
          width: 1,
        }}
      >
        {dayTitle}
        {daysColumn.map((date: any, i: any) => (
          <Day key={i} date={date} currentMonth={currentMonth} />
        ))}
      </td>
    </>
  );
}

export default weekColumn;
