export const setRemindersData = ( date, reminders) => {
  return {
    type: "SET_REMINDERS",
    date,
    reminders
  };
};

export const clearData = () => {
  return {
    type: "CLEAR_DATA",
  };
};
