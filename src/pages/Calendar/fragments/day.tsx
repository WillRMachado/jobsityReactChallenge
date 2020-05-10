import React, { useState } from "react";

import { useSelector } from "react-redux";

import ReminderModal from "../../../components/RemindersModal";

function Day(props: { date: any; currentMonth: any }) {
  const { date, currentMonth } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  //getting from Redux
  const reminders = useSelector(
    (state: any) =>
      state.reminders[
        date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
      ]
    // state.reminders
  );

  const handleDayPress = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ReminderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        date={date}
      />

      <button
        style={{
          width: "100%",
          minHeight: "1000",
          backgroundColor: date.getMonth() === currentMonth ? "green" : "grey",
          padding: 30,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "red",
        }}
        onClick={() => handleDayPress()}
      >
        {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
        {reminders && reminders.map ? reminders.map((e: any) => "s") : null}
      </button>
    </>
  );
}

export default Day;
