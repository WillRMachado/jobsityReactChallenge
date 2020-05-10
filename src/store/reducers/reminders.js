import { orderBy, remove } from "lodash";

import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {};

const getIdentifier = (date) => {
  return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
};

export default (state = INITIAL_STATE, action) => {
  let identifier = null;
  let remindersArray = [];

  switch (action.type) {
    // case "SET_REMINDERS":
    //   identifier =
    //     action.date.getDate() +
    //     "-" +
    //     action.date.getMonth() +
    //     "-" +
    //     action.date.getFullYear();
    //   return { ...state, [identifier]: action.reminders };

    case "SET_NEW_REMINDER":
      identifier = getIdentifier(action.date);

      const reminderWithId = { ...action.reminder, id: uuidv4() };

      state[identifier] !== undefined
        ? (remindersArray = state[identifier].concat(reminderWithId))
        : (remindersArray = [reminderWithId]);
      remindersArray = orderBy(remindersArray, ["time"], ["asc"]);

      return {
        ...state,
        [identifier]: remindersArray,
      };

    case "DELETE_REMINDER":
      identifier = getIdentifier(action.date);

      remindersArray = state[identifier];
      remove(remindersArray, { id: action.reminderId });

      return {
        ...state,
        [identifier]: remindersArray.slice(),
      };

    case "CLEAR_DATA":
      return INITIAL_STATE;

    default:
      return state;
  }
};
