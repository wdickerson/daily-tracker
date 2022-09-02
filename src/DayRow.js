import { ReactComponent as Minus } from './Minus.svg';
import { ReactComponent as Plus } from './Plus.svg';

import React, { useState } from 'react';

const DayRow = ({day, updateValue, weekValue, monthValue, tomorrow}) => {

  const { date, dayCounter, weekCounter, monthCounter } = day;

  const [myValue, setMyValue] = useState(dayCounter.encodedValue);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  const monthText = date.getDate() === 1 ? `${months[date.getMonth()]} ${date.getFullYear()}` : '';

  const decrement = () => {
    dayCounter.decrement();
    if (dayCounter.recorded) weekCounter.decrement();
    if (dayCounter.recorded) monthCounter.decrement();
    const newValue = dayCounter.encodedValue;
    setMyValue(newValue);
    updateValue();
  }

  const increment = () => {
    if (dayCounter.recorded) weekCounter.increment();
    if (dayCounter.recorded) monthCounter.increment();
    dayCounter.increment();
    const newValue = dayCounter.encodedValue;
    setMyValue(newValue);
    updateValue();
  }

  const weekTotal = () => (
    <div className="WeekSummary">
      <span className="SummaryLabel">
        Week ending Sun, {date.getDate()} {months[date.getMonth()]}:&nbsp;
      </span> 
      {weekValue}
    </div>
  )

  const monthTotal = () => (
    <div className="MonthSummary">
      <span className="SummaryLabel">
        Month of {months[date.getMonth()]} {date.getFullYear()}:&nbsp;
      </span> 
      {monthValue}
    </div>
  )

  return (
      <>
        <div className='DayRow'>
          <div className='DayLabel'>
            <div className="DayLabelMonth">{monthText}</div>
            <div className="DayLabelNumber">{date.getDate()}</div>
            <div className="DayLabelDay">{days[date.getDay()]}</div>
          </div>
          <div className='DayCounter'>
            <div className="CounterButton" onClick={() => decrement(date)}>
              <Minus />
              </div>
                {myValue === '' && <div className="CounterEmptyText">No entry</div>}
                {myValue !== '' && <div className="CounterText">{myValue}</div>}
              <div className="CounterButton" onClick={increment}>
              <Plus />
            </div>
          </div> 
        </div>
        {date.getDay() === 0 && weekTotal()}
        {tomorrow && tomorrow.date.getDate() === 1 && monthTotal()}
      </>
  );
};

export default DayRow;
