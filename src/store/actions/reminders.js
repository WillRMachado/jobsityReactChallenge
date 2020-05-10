export const setRemindersData = (date, reminders) => {
  return {
    type: "SET_REMINDERS",
    date,
    reminders,
  };
};

export const setNewReminderData = (date, reminder) => {
  return {
    type: "SET_NEW_REMINDER",
    date,
    reminder,
  };
};

export const clearData = () => {
  return {
    type: "CLEAR_DATA",
  };
};
