/* eslint-disable no-fallthrough */
import React, { useState, useEffect } from "react";

// import moment from "moment";
// import { Container, Col, Row } from "react-bootstrap";
import WeekColumn from "./fragments/weekColum";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(0);

  useEffect(() => {
    getCurrentMonth();
  }, []);

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

  const getCurrentMonth = () => {
    setCurrentMonth(new Date().getMonth());
  };

  function getDaysColumn(dayNumber: any) {
    var now = new Date();
    let d = new Date(now.getFullYear(), now.getMonth() + 1, 1),
      month = d.getMonth(),
      weekDays = [];

    d.setDate(1);

    console.log("reader", month, d);
    // Get the first week day in the month
    while (d.getDay() !== dayNumber) {
      d.setDate(d.getDate() + 1);
    }

    // adding previous Month Days
    if (d.getDate() > dayNumber + 1) {
      let prevDay = new Date();
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
      weekDays.push(d);
    }
    if (weekDays.length <= 5) {
      d.setDate(d.getDate() + 7);
      console.log("d", d);
      weekDays.push(d);
    }

    return weekDays;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr style={{ backgroundColor: "blue" }}>
            {calendar.map((day, i) => (
              <WeekColumn
                key={i}
                dayTitle={day.dayTitle}
                daysColumn={day.daysColumn}
                currentMonth={currentMonth}
              />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
