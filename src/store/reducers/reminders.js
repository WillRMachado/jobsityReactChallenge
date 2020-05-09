const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_REMINDERS":
      const identifier =
        action.date.getDate() +
        "-" +
        action.date.getMonth() +
        "-" +
        action.date.getFullYear();
      return { ...state, [identifier]: action.reminders };

    case "CLEAR_DATA":
      return INITIAL_STATE;

    default:
      return state;
  }
};
