import { ADD_DATE_CALENDAR } from '../actions';

const INITIAL_STATE = [];

export default function Calendar(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_DATE_CALENDAR:
      return [
        ...state,
        {
          date: action.date
        },
      ];
    default:
      return state;
  }
}
