import React from "react";

import Day from "./fragments/day";
import Week from "./fragments/weekColum";

import { Container, Col, Row } from "react-bootstrap";
import WeekColumn from "./fragments/weekColum";

function calendar() {
  const monthWeekdayStart = 2;
  const monthDays = 31;
  const previousMonthDaysShowing = 2;
  const nestMonthDaysShowing = 2;

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    // <Container>
    //   <Row>
    //     {weekDays.map((day) => (
    //       <Col style={{ backgroundColor: "green" }}>{day}</Col>
    //     ))}
    //   </Row>
    //   {/* {[...Array(5)].map((e, i) => (
    //       <div key={i} style={{}}>
    //       <Week />
    //       </div>
    //     ))} */}
    // </Container>
    <div>
      <table>
        <thead />
        <tbody>
          {/* <tr>
            {weekDays.map((day) => (
              <td>{day}</td>
            ))}
          </tr> */}
          <tr>
            {weekDays.map((day) => (
                <WeekColumn dayTitle={day} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default calendar;
