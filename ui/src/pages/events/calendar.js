import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../components';
import {
  nextMonth, prevMonth, selectCalendar, selectMonth
} from '../../slices';
import { useGetEventsQuery } from '../../api';

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
  days, events, showEdit, showNew,
}) => (
  <ul className="days-grid grid grid-cols-7 gap-1 grid-flow-row">
    {days.map((it) => (
      <CalendarDay
        key={it.day}
        {...it}
        events={events.filter((x) => x.date === it.day)}
        onEventClick={showEdit}
        onAddNew={showNew}
      />
    ))}
  </ul>
);

const Caption = () => {
  const dispatch = useDispatch();
  const { month } = useSelector(selectMonth);
  return (
    <header className="text-center">
      <Button
        type="button"
        onClick={() => dispatch(prevMonth())}
      >
        Prev
      </Button>
      <span className="px-2">{month.format('YYYY-MM')}</span>
      <Button
        type="button"
        onClick={() => dispatch(nextMonth())}
      >
        Next
      </Button>
    </header>
  );
}

export const Calendar = ({ showEdit, showNew }) => {
  const { firstDay, lastDay } = useSelector(selectMonth);
  const { days, dayNames } = useSelector(selectCalendar);
  const { data: events, isLoading } = useGetEventsQuery({
    fromdate: firstDay.format('YYYY-MM-DD'),
    todate: lastDay.format('YYYY-MM-DD'),
  });
  return (
    <div className="md:w-8/12 md:mx-auto">
      <Caption />
      <DaysOfWeek dayNames={dayNames} />
      <DaysGrid
        showEdit={showEdit}
        showNew={showNew}
        days={days}
        events={isLoading ? [] : events}
      />
    </div>
  );
}
