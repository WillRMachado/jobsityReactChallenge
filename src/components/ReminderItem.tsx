import React, { useState } from "react";

import { Delete, Edit } from "@material-ui/icons";

import { useDispatch } from "react-redux";

import { deleteReminderData } from "../store/actions/reminders";

import ReminderModal from "./RemindersModal";

function ReminderItem(props: any) {
  const { time, title, color, id } = props.data;
  const { date } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const deleteReminder = (id: any) => dispatch(deleteReminderData(date, id));

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("edit");
    console.log(id);
    setIsModalOpen(true);
    e.stopPropagation();
  };

  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    deleteReminder(id);
    e.stopPropagation();
  };

  return (
    <>
      <ReminderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        date={date}
        editMode
      />
      <div style={{ backgroundColor: color }} onClick={(e) => handleEdit(e)}>
        <div>{time}</div>
        <div>{title}</div>
        <Edit />
        <Delete onClick={(e) => handleDelete(e)} />
      </div>
    </>
  );
}

export default ReminderItem;
