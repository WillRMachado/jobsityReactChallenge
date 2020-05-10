/// <amd-dependency path="lib/errorInfoHandler">
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  setNewReminderData,
  editReminderData,
} from "../store/actions/reminders";

import { getReverseGeocode } from "../services/geolocation";

import { TextField, Button } from "@material-ui/core";
import { GpsFixed } from "@material-ui/icons";
import { SketchPicker } from "react-color";
// import { TimePicker } from "@material-ui/pickers";
import TimePicker from "react-time-picker";
import Modal from "react-modal";
import { find } from "lodash";

function RemindersModal(props: any) {
  const { isModalOpen, setIsModalOpen, date, editMode, reminderId } = props;

  const dispatch = useDispatch();

  const reminderArray = useSelector(
    (state: any) =>
      //   find(
      //     state.reminders[
      //       date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
      //     ],
      //     ["id", reminderId]
      //   )
      state.reminders[
        date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
      ]
  );

  const [color, setColor] = useState("#00f");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (editMode) {
      populateEditMode(reminderId);
    }
    // eslint-disable-next-line
  }, [editMode, reminderId, isModalOpen]);

  const setNewReminder = (reminders: any) =>
    dispatch(setNewReminderData(date, reminders));

  const editReminder = (reminderId: any, newReminderData: any) =>
    dispatch(editReminderData(date, reminderId, newReminderData));

  const populateEditMode = (reminderId: any) => {
    // console.log("jj", editMode, "alm", reminderId, "ou", reminderData);
    // setReminderData(find(reminderArray, ["id", reminderId]));
    const editableData = find(reminderArray, ["id", reminderId]);
    if (editableData !== undefined) {
      if (editableData.color) {
        setColor(editableData.color);
      }
      if (editableData.title) {
        setTitle(editableData.title);
      }
      if (editableData.time) {
        setTime(editableData.time);
      }
      if (editableData.city) {
        setCity(editableData.city);
      }
    }
  };

  const handleGetGeoPosition = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        getReverseGeocode(
          position.coords.latitude,
          position.coords.longitude,
          (newCity: any) => setCity(newCity.principalSubdivision)
        );
      },
      () => console.log("err"),
      { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
    );
  };

  const handleReminderConfirmation = () => {
    if (editMode) {
      editReminder(reminderId, { time, title, color, city });
      setTime("");
      setCity("");
      setTitle("");
      setIsModalOpen(false);
    } else {
      setNewReminder({ time, title, color, city });
      setTime("");
      setCity("");
      setTitle("");
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    console.log("clo", color, city, title, time);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} ariaHideApp={false} contentLabel="Reminder">
        <div onClick={() => handleClose()}>aasssaa</div>
        <TimePicker
          onChange={(newTime: any) => setTime(newTime)}
          value={time}
          disableClock={true}
        />
        <TextField
          label="Title"
          value={time}
          type={"time"}
          onChange={(value: any) => {
            setTime(value.target.value);
          }}
        />
        <TextField
          label="Title"
          value={title}
          onChange={(value: any) => {
            setTitle(value.target.value);
          }}
        />
        <TextField
          label="City"
          value={city}
          onChange={(value: any) => {
            setCity(value.target.value);
          }}
        />
        <GpsFixed onClick={() => handleGetGeoPosition()} />

        <SketchPicker
          color={color}
          onChange={(newColor: any) => setColor(newColor)}
          onChangeComplete={(newColor: any) => setColor(newColor.hex)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReminderConfirmation()}
        >
          {editMode ? "Edit" : "Register"}
        </Button>
      </Modal>
    </>
  );
}

export default RemindersModal;
