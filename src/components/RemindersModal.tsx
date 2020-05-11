/// <amd-dependency path="lib/errorInfoHandler">
import React, { useState, useEffect } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setNewReminderData,
  editReminderData,
} from "../store/actions/reminders";
//Services
import { getReverseGeocode } from "../services/geolocation";
import { getWeatherIconCity } from "../services/weather";
//Utils & Components
import { TextField, Button } from "@material-ui/core";
import { GpsFixed } from "@material-ui/icons";
import { SketchPicker } from "react-color";
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

  const titleChecker = (text: string) => {
    if (text.length <= 30) {
      setTitle(text);
    } else {
      setTitle(text.slice(0, 30));
    }
  };

  const handleGetGeoPosition = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        getReverseGeocode(
          position.coords.latitude,
          position.coords.longitude,
          (newCity: string) => setCity(newCity)
        );
      },
      () => console.log("error getting geoLocation"),
      { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
    );
  };

  const handleReminderConfirmation = (e: any) => {
    const setIconLink = (icon: any) => {
      if (editMode) {
        editReminder(reminderId, { time, title, color, city, icon });
      } else {
        setNewReminder({ time, title, color, city, icon });
      }
    };
    //close and reset modal
    setIsModalOpen(false);
    setTime("");
    setCity("");
    setTitle("");

    //api call will run w/ closed modal
    if (date.getDate() === new Date().getDate()) {
      getWeatherIconCity(
        city,
        (icon: any) => setIconLink(icon),
        (err: any) => setIconLink(null)
      );
    } else {
      console.log(
        "couldn't finda a free api for every day, currently, this calendar only supports weather for the current day"
      );
      setIconLink(null);
    }
    e.stopPropagation();
  };

  const handleClose = (e: any) => {
    setIsModalOpen(false);
    e.stopPropagation();
  };

  return (
    <>
      <Modal isOpen={isModalOpen} ariaHideApp={false} contentLabel="Reminder">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Set a Time"
            value={time}
            style={{ width: 100 }}
            type={"time"}
            onChange={(value: any) => {
              setTime(value.target.value);
            }}
          />
          <TextField
            label="Title"
            value={title}
            onChange={(value: any) => {
              titleChecker(value.target.value);
            }}
          />
          <div>
            <TextField
              label="City"
              value={city}
              onChange={(value: any) => {
                setCity(value.target.value);
              }}
            />
            <GpsFixed onClick={() => handleGetGeoPosition()} />
          </div>

          <SketchPicker
            color={color}
            onChange={(newColor: any) => setColor(newColor)}
            onChangeComplete={(newColor: any) => setColor(newColor.hex)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={(e: any) => handleReminderConfirmation(e)}
          >
            {editMode ? "Edit" : "Register"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e: any) => handleClose(e)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default RemindersModal;
