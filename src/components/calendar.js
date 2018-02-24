import React from 'react'
import * as moment from 'moment'
import classNames from 'classnames'
import './calendar.css'


function *iterDays(start, end) {
  let it = start.clone()
  while (it.isSameOrBefore(end)) {
    yield it.clone()
    it.add(1, 'days')
  }
}

const genCalendar = (date) => {
  const today = moment().startOf('day')
  const firstDay = date.clone().startOf('month')
  const lastDay = date.clone().endOf('month')
  const start = firstDay.clone().startOf('isoWeek')
  const end = lastDay.clone().endOf('isoWeek')

  const days = [...iterDays(start, end)]
  return days.map(it => ({
    day: it.clone(),
    dayNum: it.date(),
    today: it.isSame(today, 'day'),
    weekend: it.isoWeekday() === 6 || it.isoWeekday() === 7,
    prevMonth: it.isBefore(firstDay, 'day'),
    thisMonth: it.isBetween(firstDay, lastDay, 'day', '[]'),
    nextMonth: it.isAfter(lastDay, 'day'),
  }))
}

const CalendarDay = ({dayNum, weekend, prevMonth, nextMonth, today}) => (
  <li className={classNames({weekend, prevMonth, nextMonth, today})}>
    <span className="day">{dayNum}</span>
  </li>
)

const getDaysOfWeek = () => {
  const today = moment()
  const firstDay = today.clone().startOf('isoWeek')
  const lastDay = today.clone().endOf('isoWeek')
  const days = [...iterDays(firstDay, lastDay)]
  return days.map(day => day.format('ddd'))
}

const dayNames = getDaysOfWeek()

const DaysOfWeek = () => (
  <ul className="days-of-week">
    {dayNames.map(day => <li key={day}>{day}</li>)}
  </ul>
)

const DaysGrid = ({date}) => (
  <ul className="days-grid">
    {genCalendar(date).map(it => (
      <CalendarDay key={it.day} {...it} />
    ))}
  </ul>
)

const Caption = ({date}) => (
  <header>
    {date.format('YYYY-MM')}
  </header>
)

const Calendar = () => {
  const today = moment()
  return (
    <div className="calendar">
      <Caption date={today} />
      <DaysOfWeek />
      <DaysGrid date={today} />
    </div>
  )
}

export default Calendar