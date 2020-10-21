import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
  nextMonth, prevMonth, showEdit, showNew, selectCalendar,
} from '../../features/events';

const Event = ({ name, icon, onClick }) => (
  <i className={classNames('fa', icon)} title={name} onClick={onClick} />
);

const EventList = ({ events, onClick }) => (
  <ul className="events">
    {events.map(({ event }) => <Event key={event.id} {...event} onClick={() => onClick(event)} />)}
  </ul>
);

const CalendarDay = ({
  day, dayNum, weekend, prevMonth, nextMonth, today, events, onEventClick, onAddNew, numWeeks,
}) => {
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
      theme: themeToday,
      'hover-theme': true,
      [`weeks-${numWeeks}`]: true,
    })}
    >
      <span className="day">{dayNum}</span>
      <i className={classNames('fa', 'fa-plus', 'add')} title="Add..." onClick={() => onAddNew({ date: day })} />
      <EventList events={events} onClick={onEventClick} />
    </li>
  );
};

const DaysOfWeek = ({ dayNames }) => (
  <ul className="days-of-week theme-d3">
    {dayNames.map((day) => <li key={day}>{day}</li>)}
  </ul>
);

const DaysGrid = ({
  days, events, showEdit, showEditNew,
}) => (
  <ul className="days-grid">
    {days.map((it) => (
      <CalendarDay
        key={it.day}
        {...it}
        events={events.filter((x) => x.date === it.day)}
        onEventClick={showEdit}
        onAddNew={showEditNew}
      />
    ))}
  </ul>
);

const Caption = ({ month, nextMonth, prevMonth }) => (
  <header className="theme-d4">
    <button
      type="button"
      onClick={() => prevMonth()}
    >
      Prev
    </button>
    {month}
    <button
      type="button"
      onClick={() => nextMonth()}
    >
      Next
    </button>
  </header>
);

let Calendar = (props) => (
  <div className="calendar">
    <Caption {...props} />
    <DaysOfWeek {...props} />
    <DaysGrid {...props} />
  </div>
);

Calendar = connect(
  selectCalendar,
  (dispatch) => ({
    showEdit: (item) => dispatch(showEdit(item)),
    showEditNew: (item) => dispatch(showNew(item)),
    nextMonth: () => dispatch(nextMonth()),
    prevMonth: () => dispatch(prevMonth()),
  }),
)(Calendar);

export default Calendar;
