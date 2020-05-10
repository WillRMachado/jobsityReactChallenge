/// <amd-dependency path="lib/errorInfoHandler">
import React, { useState } from "react";

import { TextField, Button } from "@material-ui/core";
import Modal from "react-modal";
import { ChromePicker } from "react-color";

function RemindersModal(props: any) {
  const { isModalOpen, setIsModalOpen } = props;

  const [color, setColor] = useState("#9aaaa0");

  const handleColorChange = (a: any) => {
    console.log(a);
    setColor(a);
    // setColor(a);
  };

  const handleReminderConfirmation = () => {
    console.log(color);
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div onClick={() => setIsModalOpen(false)}>aasssaa</div>
        <TextField label="Title" />
        <TextField
          //   id="filled-helperText"
          label="Reminder Time"
          type="time"
          helperText="Set an hour for your reminder"
          variant="filled"
        />

        <ChromePicker
          color={color}
          onChange={(newColor: any) => handleColorChange(newColor)}
          onChangeComplete={(newColor: any) => handleColorChange(newColor)}
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
