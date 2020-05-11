/* eslint-disable no-fallthrough */
import React, { useState } from "react";
import "./Calendar.css";

import { useWindowDimensions } from "../../utils/hooks/windowDimensions";

import WeekColumn from "./fragments/WeekColum";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

function Calendar() {
  const [monthViewerModifier, setMonthViewerModifier] = useState(0);
  const { width } = useWindowDimensions();

  const getCurrentMonthFirstDay = () => {
    const now = new Date();

    const currentVisibleMonth = new Date(
      now.getFullYear(),
      now.getMonth() + monthViewerModifier,
      1
    );
    return currentVisibleMonth;
  };

  const calendar = [
    {
      dayTitle: "Sunday",
      daysColumn: getDaysColumn(0),
    },
    {
      dayTitle: "Monday",
      daysColumn: getDaysColumn(1),
    },
    {
      dayTitle: "Tuesday",
      daysColumn: getDaysColumn(2),
    },
    {
      dayTitle: "Wednesday",
      daysColumn: getDaysColumn(3),
    },
    {
      dayTitle: "Thursday",
      daysColumn: getDaysColumn(4),
    },
    {
      dayTitle: "Friday",
      daysColumn: getDaysColumn(5),
    },
    {
      dayTitle: "Saturday",
      daysColumn: getDaysColumn(6),
    },
  ];

  function getDaysColumn(dayNumber: any) {
    let d = getCurrentMonthFirstDay(),
      month = d.getMonth(),
      weekDays = [];

    d.setDate(1);

    // Get the first week day in the month
    while (d.getDay() !== dayNumber) {
      d.setDate(d.getDate() + 1);
    }

    // adding previous Month Days
    if (d.getDate() > dayNumber + 1) {
      let prevDay = new Date(d.getTime());
      prevDay.setDate(d.getDate() - 7);
      weekDays.push(prevDay);
    }

    // Get all the other week day in the month
    while (d.getMonth() === month) {
      weekDays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }

    //adding next month dates
    if (weekDays.length <= 5) {
      weekDays.push(new Date(d.getTime()));
    }
    if (weekDays.length <= 5) {
      d.setDate(d.getDate() + 7);
      weekDays.push(new Date(d.getTime()));
    }

    return weekDays;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr className={"calendarTableRow"}>
            {width >= 1024 ? (
              <td>
                <NavigateBefore
                  style={{ fontSize: 30 }}
                  onClick={() => {
                    setMonthViewerModifier(monthViewerModifier - 1);
                  }}
                />
              </td>
            ) : null}

            {calendar.map((day, i) => (
              <WeekColumn
                key={i}
                dayTitle={day.dayTitle}
                daysColumn={day.daysColumn}
                currentMonth={getCurrentMonthFirstDay().getMonth()}
              />
            ))}
            {width >= 1024 ? (
              <td>
                <NavigateNext
                  style={{ fontSize: 30 }}
                  onClick={() => {
                    setMonthViewerModifier(monthViewerModifier + 1);
                  }}
                />
              </td>
            ) : null}
          </tr>
          <tr>
            {width < 1024 ? (
              <td>
                <NavigateBefore
                  style={{ fontSize: 30 }}
                  onClick={() => {
                    setMonthViewerModifier(monthViewerModifier - 1);
                  }}
                />
                <NavigateNext
                  style={{ fontSize: 30 }}
                  onClick={() => {
                    setMonthViewerModifier(monthViewerModifier + 1);
                  }}
                />
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default Calendar;
