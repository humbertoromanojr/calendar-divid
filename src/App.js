import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import api from './services/api'
import Header from './components/Header'

import './App.css';

class Calendar extends React.Component {
  static propTypes = {
    pagamentos: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          nome: PropTypes.string,
          sigla: PropTypes.string,
          tipo: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      pagamentos: [],
      days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      months: [
        'Janeiro', 'fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
         'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
       ],
      weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      lastMonth: 11,
      month: 0,
      nextMonth: 1,
      year: 0,
      currentMonth: 0,
      currentYear: 0,
      calendar: [
        { id: 'week-1', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-2', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-3', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-4', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-5', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-6', data: [0, 0, 0, 0, 0, 0, 0] },
      ],
      holidays: [],
      holiday: '',
    };
  }

   componentDidMount() {
    api.get('/pagamentos').then((res) => {
      this.setState({
        pagamentos: res.data
      });

      console.log('APi: ', res.data)
    });
  }

  componentWillMount() {
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    this.setState({
      currentMonth,
      currentYear,
      month: currentMonth,
      year: currentYear,
    });

    this.setCalendar(new Date(currentYear, currentMonth, 1));
  }

  setMonth(date) {
    const month = date.getMonth();
    const lastMonth = month === 0 ? 11 : month - 1;
    const nextMonth = month === 11 ? 0 : month + 1;

    this.setState({
      lastMonth,
      month,
      nextMonth,
    });

    return { lastMonth, month, nextMonth };
  }

  setCalendar(date) {
    const { lastMonth, month, nextMonth } = this.setMonth(date);
    const year = date.getFullYear();
    const weekday = date.getDay();
    const days = this.checkLeapYear(year); 
    let nextMonthDay = 0;

    const firstWeek = this.state.calendar[0].data.map((day, index) => {
      let holiday = '';
      if (index < weekday) {
        const value = (days[lastMonth] - (weekday - index)) + 1;
        return {
          value,
          class: 'day--soft',
          month: lastMonth,
        };
      }
      const value = (index - weekday) + 1;
      return {
        value: (index - weekday) + 1,
        class: '',
        month,
      };
    });
    const secondWeek = this.state.calendar[0].data.map((day, index) => {
      const value = firstWeek[6].value + index + 1;
      return {
        value,
        class: '',
        month,
      };
    });
    const thirdWeek = this.state.calendar[0].data.map((day, index) => {
      const value = secondWeek[6].value + index + 1;
      return {
        value,
        class: '',
        month,
      };
    });
    const forthWeek = this.state.calendar[0].data.map((day, index) => {
      const value = thirdWeek[6].value + index + 1;
      return {
        value,
        class: '',
        month,
      };
    });
    const fifthWeek = this.state.calendar[0].data.map((day, index) => {
      if (forthWeek[6].value + index + 1 > days[month]) {
        nextMonthDay += 1;
        return {
          value: nextMonthDay,
          class: 'day--soft',
          month: nextMonth,
        };
      }
      const value = forthWeek[6].value + index + 1;
      return {
        value,
        class: '',
        month,
      };
    });
    const sixthWeek = this.state.calendar[0].data.map((day, index) => {
      if (fifthWeek[6].value + index + 1 > days[month] || fifthWeek[6].value < 10) {
        nextMonthDay += 1;
        return {
          value: nextMonthDay,
          class: 'day--soft',
          month: nextMonth,
        };
      }

      const value = fifthWeek[6].value + index + 1;
      return {
        value,
        class: '',
        month,
      };
    });

    this.setState({
      month,
      year,
      calendar: [
        { id: 'week-1', data: firstWeek },
        { id: 'week-2', data: secondWeek },
        { id: 'week-3', data: thirdWeek },
        { id: 'week-4', data: forthWeek },
        { id: 'week-5', data: fifthWeek },
        { id: 'week-6', data: sixthWeek },
      ],
    });
  }

  checkLeapYear(year) {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    this.setState({
      days,
    });
    return days;
  }

  previousCalendar = () => {
    const month = this.state.month !== 0 ? this.state.month - 1 : 11;
    const year = this.state.month !== 0 ? this.state.year : this.state.year - 1;
    this.setCalendar(new Date(year, month, 1));
  }

  nextCalendar = () => {
    const month = this.state.month !== 11 ? this.state.month + 1 : 0;
    const year = this.state.month !== 11 ? this.state.year : this.state.year + 1;
    this.setCalendar(new Date(year, month, 1));
  }

  render() {
    let data = new Date();
    let currentDay  = data.getDate();
   
    return (
      <div>
        <Header/>
        <div className="calendar">
          <div className="calendar-header">
            <span className="button-container button-container--left">
              <button onClick={this.previousCalendar} className="button-content button-content--left" />
            </span>
            <span className="calendar-header-date">{`${this.state.year} ${this.state.months[this.state.month]}`}</span>
            <span className="button-container button-container--right">
              <button onClick={this.nextCalendar} className="button-content button-content--right" />
            </span>
          </div>
          <div className="week">
            {this.state.weekDays.map(weekDay => <div key={weekDay} className="weekday">{weekDay}</div>)}
          </div>
          {this.state.calendar.map(week =>
            <div key={week.id} className="week">
              {week.data.map(day =>
                <div
                  key={`${day.month}${day.value}`}
                  className={`day ${day.class}`}
                >
                {
                  day.value === currentDay ? <span className="currentDay">{day.value}</span> : day.value
                }
                </div>,
              )}
            </div>,
          )}
        </div>
       
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCalendar: (date) => {
    dispatch(actions.addCalendar(date));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Calendar);
