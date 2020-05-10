import { orderBy } from "lodash";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  let identifier = null;
  switch (action.type) {
    case "SET_REMINDERS":
      identifier =
        action.date.getDate() +
        "-" +
        action.date.getMonth() +
        "-" +
        action.date.getFullYear();
      return { ...state, [identifier]: action.reminders };

    case "SET_NEW_REMINDER":
      identifier =
        action.date.getDate() +
        "-" +
        action.date.getMonth() +
        "-" +
        action.date.getFullYear();

      let remindersArray = [];

      state[identifier] !== undefined
        ? (remindersArray = state[identifier].concat(action.reminder))
        : (remindersArray = [action.reminder]);
      remindersArray = orderBy(remindersArray, ["time"], ["asc"]);

      return {
        ...state,
        [identifier]: remindersArray,
      };

    case "CLEAR_DATA":
      return INITIAL_STATE;

    default:
      return state;
  }
};
