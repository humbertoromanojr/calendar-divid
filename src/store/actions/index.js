import api from '../../services/api'
export const ADD_DATE_CALENDAR = 'ADD_DATE_CALENDAR';
export const SET_DATES = 'SET_DATES'

export const addCalendar = getDate => {
  return dispatch => { 
    api.get('/pagamentos', { ...getDate })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
}

export const setDates = getDate => {
  return {
    type: SET_DATES,
    payload: getDate
  }
}



