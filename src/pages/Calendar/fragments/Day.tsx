import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { deleteAllDayRemindersData } from "../../../store/actions/reminders";

import { DeleteForever } from "@material-ui/icons";

import ReminderModal from "../../../components/RemindersModal";
import ReminderItem from "../../../components/ReminderItem";

function Day(props: { date: any; currentMonth: any }) {
  const { date, currentMonth } = props;

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  //getting from Redux
  const reminders = useSelector(
    (state: any) =>
      state.reminders[
        date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
      ]
  );

  //dispatch to redux
  const deleteAllDayReminders = () => dispatch(deleteAllDayRemindersData(date));

  const handleDayPress = () => {
    setIsModalOpen(true);
  };

  const handleDeleteAll = (e: any) => {
    deleteAllDayReminders();
    e.stopPropagation();
  };

  return (
    <>
      <ReminderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        date={date}
      />

      <button
        className={`weekDayBox ${
          date.getMonth() === currentMonth ? "weekDayCurrentVisibleMonth" : ""
        } ${
          date.getMonth() === new Date().getMonth() ? "weekDayCurrentMonth" : ""
        }`}
        onClick={() => handleDayPress()}
      >
        <div className={"dayTitle"}>
          {date.getDate() + "/" + (date.getMonth() + 1)}
        </div>
        {reminders && reminders.map
          ? reminders.map((e: any, i: any) => (
              <ReminderItem date={date} data={e} key={i} />
            ))
          : null}
        {reminders && reminders.length > 0 ? (
          <DeleteForever
            style={{ position: "absolute" }}
            onClick={(e: any) => handleDeleteAll(e)}
          />
        ) : null}
      </button>
    </>
  );
}

export default Day;
