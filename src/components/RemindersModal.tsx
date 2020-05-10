/// <amd-dependency path="lib/errorInfoHandler">
import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { setNewReminderData } from "../store/actions/reminders";

import { getReverseGeocode } from "../services/geolocation";

import { TextField, Button } from "@material-ui/core";
import { GpsFixed } from "@material-ui/icons";
import { SketchPicker } from "react-color";
// import { TimePicker } from "@material-ui/pickers";
import TimePicker from "react-time-picker";
import Modal from "react-modal";

function RemindersModal(props: any) {
  const { isModalOpen, setIsModalOpen, date, editMode } = props;

  //   console.log(editMode);

  const dispatch = useDispatch();

  const [color, setColor] = useState("#faf");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [closeCount, setCloseCount] = useState([0]);

  useEffect(() => {
    console.log("op", isModalOpen);
    if (!isModalOpen) {
      setCloseCount(closeCount);
    }
  }, [isModalOpen, closeCount]);

  const setNewReminder = (reminders: any) =>
    dispatch(setNewReminderData(date, reminders));

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
    setNewReminder({ time, title, color });
    setTime("");
    setCity("");
    setTitle("");
    setIsModalOpen(false);
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
          Primary
        </Button>
      </Modal>
    </>
  );
}

export default RemindersModal;
