// export const setRemindersData = (date, reminders) => {
//   return {
//     type: "SET_REMINDERS",
//     date,
//     reminders,
//   };
// };

export const setNewReminderData = (date, reminder) => {
  return {
    type: "SET_NEW_REMINDER",
    date,
    reminder,
  };
};

export const editReminderData = (date, reminderId, reminderData) => {
  return {
    type: "EDIT_REMINDER",
    date,
    reminderId,
    reminderData,
  };
};

export const deleteReminderData = (date, reminderId) => {
  return {
    type: "DELETE_REMINDER",
    date,
    reminderId,
  };
};

export const clearData = () => {
  return {
    type: "CLEAR_DATA",
  };
};
