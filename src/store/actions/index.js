export const ADD_DATE_CALENDAR = 'ADD_DATE_CALENDAR';

export function addCalendar(date) {
  return {
    type: ADD_DATE_CALENDAR,
    payload: date
  };
}


