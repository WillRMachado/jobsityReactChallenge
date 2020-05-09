/* eslint-disable no-fallthrough */
import React from "react";

import moment from "moment";

import Day from "./fragments/day";
import Week from "./fragments/weekColum";

import { Container, Col, Row } from "react-bootstrap";
import WeekColumn from "./fragments/weekColum";

function calendar() {
  const monthWeekdayStart = 2;
  const monthDays = 31;
  const previousMonthDaysShowing = 2;
  const nextMonthDaysShowing = 2;

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getDaysColumn(dayNumber: any) {
    let d = new Date(),
      month = d.getMonth(),
      weekDays = [];

    d.setDate(dayNumber);

    // Get the first week day in the month
    while (d.getDay() !== dayNumber) {
      d.setDate(d.getDate() + 1);
    }

    //adding previous Month Days
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
    if (weekDays.length <= 4) {
      weekDays.push(d);
    }

    return weekDays;
  }

  const getDates = () => {
    let sundays = getDaysColumn(0);
    let mondays = getDaysColumn(1);
    let tuesdays = getDaysColumn(2);
    let wednesdays = getDaysColumn(3);
    let thursdays = getDaysColumn(4);
    let fridays = getDaysColumn(5);
    let saturdays = getDaysColumn(6);
    const w = getDaysColumn(6);
    console.log("w", mondays);
  };
  getDates();

  return (
    <div>
      <table>
        <thead />
        <tbody>
          <tr>
            {weekDays.map((day, i) => (
              <WeekColumn key={i} dayTitle={day} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default calendar;
