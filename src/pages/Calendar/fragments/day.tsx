import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { setRemindersData } from "../../../store/actions/reminders";


function Day(props: { date: any; currentMonth: any }) {
  const { date, currentMonth } = props;

  const dispatch = useDispatch();

  //getting from Redux
  const reminders = useSelector(
    (state: any) =>
      state.reminders[
        date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
      ]
    // state.reminders
  );

  //setting to redux
  const setReminders = (reminders: Array<any>) =>
    dispatch(setRemindersData(date, reminders));

  const handleDayPress = () => {
    console.log(reminders);
    console.log(date.getHours() + ":" + date.getMinutes());
    setReminders([{ time: "18:43", title: "reminder1", color: "blue" }]);
  };

  return (
    <button
      style={{
        width: "100%",
        minHeight: "1000",
        backgroundColor: date.getMonth() === currentMonth ? "green" : "black",
        padding: 30,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
      }}
      onClick={() => handleDayPress()}
    >
      {/* <Modal
        open={true}
        // onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      ></Modal> */}
      {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
      {reminders && reminders.map ? reminders.map((e: any) => "s") : null}
    </button>
  );
}

export default Day;
