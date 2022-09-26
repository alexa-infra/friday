import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Button from '../../components/button';
import {
  nextMonth, prevMonth, showEdit, showNew, selectCalendar,
} from '../../features/events';

const Icon = ({ name, icon, onClick }) => (
  <i className={classNames('fa', icon)} title={name} onClick={onClick} />
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
      'bg-gray-100': themeAnotherMonth,
      'bg-gray-200': themeThisMonth,
      'bg-gray-300': themeWeekend,
      'bg-gray-500': themeToday,
    }, 'relative h-24 hover:bg-gray-400 group')}
    >
      <span className="absolute top-1 left-2">{dayNum}</span>
      <div className="absolute top-1 right-2 hidden group-hover:block">
        <Icon icon="fa-plus" name="Add..." onClick={() => onAddNew({ date: day })} />
      </div>
      <ul className="absolute bottom-1 right-2">
        {events.map(({ event }) => <Icon key={event.id} {...event} onClick={() => onEventClick(event)} />)}
      </ul>
    </li>
  );
};

const DaysOfWeek = ({ dayNames }) => (
  <ul className="grid grid-cols-7 gap-1 grid-flow-row">
    {dayNames.map((day) => <li className="text-center py-2 px-0" key={day}>{day}</li>)}
  </ul>
);

const DaysGrid = ({
  days, events, showEdit, showEditNew,
}) => (
  <ul className="days-grid grid grid-cols-7 gap-1 grid-flow-row">
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
  <header className="text-center">
    <Button
      type="button"
      onClick={() => prevMonth()}
    >
      Prev
    </Button>
    <span className="px-2">{month}</span>
    <Button
      type="button"
      onClick={() => nextMonth()}
    >
      Next
    </Button>
  </header>
);

let Calendar = (props) => (
  <div className="md:w-8/12 md:mx-auto">
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
