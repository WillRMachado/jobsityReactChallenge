import React from "react";

import Day from "./Day";

function weekColumn(props: {
  dayTitle: any;
  daysColumn: any;
  currentMonth: any;
}) {
  const { dayTitle, daysColumn, currentMonth } = props;
  return (
    <>
      <td>
        <div className={"weekDayTitle"}>{dayTitle}</div>
        {daysColumn.map((date: any, i: any) => (
          <Day key={i} date={date} currentMonth={currentMonth} />
        ))}
      </td>
    </>
  );
}


export default weekColumn;
