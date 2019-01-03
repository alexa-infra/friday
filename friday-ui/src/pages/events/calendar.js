import React from 'react';
import * as moment from 'moment';
import classNames from 'classnames';
import './calendar.scss';
import 'font-awesome/css/font-awesome.css';
import { connect } from 'react-redux';
import { events } from '../../actions';


function *iterDays(start, end) {
  let it = start.clone()
  while (it.isSameOrBefore(end, 'day')) {
    yield it.clone()
    it.add(1, 'days')
  }
}

const genCalendar = (date, firstDay, lastDay) => {
  const today = moment().startOf('day');
  const days = [...iterDays(firstDay, lastDay)]
  const numWeeks = Math.floor(days.length / 7);
  return days.map(it => ({
    day: it.clone(),
    dayNum: it.date(),
    today: it.isSame(today, 'day'),
    weekend: it.isoWeekday() === 6 || it.isoWeekday() === 7,
    prevMonth: it.isBefore(date, 'month'),
    thisMonth: it.isSame(date, 'month'),
    nextMonth: it.isAfter(date, 'month'),
    numWeeks: numWeeks,
  }))
}

const Event = ({name, icon, onClick}) => (
  <i className={classNames('fa', icon)} title={name} onClick={onClick} />
)

const EventList = ({events, onClick}) => (
  <ul className='events'>
    {events.map(({event}) => <Event key={event.id} {...event} onClick={() => onClick(event)} />)}
  </ul>
)

const CalendarDay = ({day, dayNum, weekend, prevMonth, nextMonth, today, events, onEventClick, onAddNew, numWeeks}) => {
  
  const thisMonth = !prevMonth && !nextMonth;
  const thisMonthNotToday = thisMonth && !today;
  
  const themeAnotherMonth = !thisMonth;
  const themeToday = thisMonth && today;
  const themeWeekend = thisMonthNotToday && weekend;
  const themeThisMonth = thisMonthNotToday && !weekend;

  return (
    <li className={classNames({
      'theme-l4': themeAnotherMonth,
      'theme-l3': themeThisMonth,
      'theme-l2': themeWeekend,
      'theme': themeToday,
      'hover-theme': true,
      [`weeks-${numWeeks}`]: true,
      })}>
      <span className="day">{dayNum}</span>
      <i className={classNames('fa', 'fa-plus', 'add')} title="Add..." onClick={e => onAddNew(day)} />
      <EventList events={events} onClick={onEventClick} />
    </li>
  )
}

const getDaysOfWeek = () => {
  const today = moment()
  const firstDay = today.clone().startOf('isoWeek')
  const lastDay = today.clone().endOf('isoWeek')
  const days = [...iterDays(firstDay, lastDay)]
  return days.map(day => day.format('ddd'))
}

const dayNames = getDaysOfWeek()

const DaysOfWeek = () => (
  <ul className="days-of-week theme-d3">
    {dayNames.map(day => <li key={day}>{day}</li>)}
  </ul>
)

const DaysGrid = ({month, firstDay, lastDay, events, showEdit, showEditNew}) => (
  <ul className="days-grid">
    {genCalendar(month, firstDay, lastDay).map(it => (
      <CalendarDay key={it.day} {...it}
                   events={events.filter(x => x.date.isSame(it.day, 'day'))}
                   onEventClick={showEdit}
                   onAddNew={showEditNew}/>
    ))}
  </ul>
)

const Caption = ({month, nextMonth, prevMonth}) => (
  <header className="theme-d4">
    <button type="button"
            onClick={() => prevMonth()}>
      Prev
    </button>
    {month.format('MMMM YYYY')}
    <button type="button"
            onClick={() => nextMonth()}>
      Next
    </button>
  </header>
);

let Calendar = props => {
  return (
    <div className="calendar">
      <Caption {...props} />
      <DaysOfWeek />
      <DaysGrid {...props}  />
    </div>
  )
}

Calendar = connect(
  state => ({
    ...state.events,
    events: state.events.items,
  }),
  dispatch => {
    const getEvents = () => dispatch(events.getEvents());
    return {
      showEdit: item => dispatch(events.showEdit(item)),
      showEditNew: item => dispatch(events.showEditNew(item)),
      nextMonth: () => dispatch(events.nextMonth()).then(getEvents),
      prevMonth: () => dispatch(events.prevMonth()).then(getEvents),
    };
  }
)(Calendar);

export default Calendar;
