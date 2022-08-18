import { ReactComponent as Minus } from './Minus.svg';
import { ReactComponent as Plus } from './Plus.svg';

import React, { useState } from 'react';

const DayRow = ({day, value, valueIndex, updateValue}) => {
  const [myValue, setMyValue] = useState(value);

  const date = day;
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
    if (myValue < 0) return;
    updateValue(valueIndex, myValue - 1);
    setMyValue(myValue - 1);
  }

  const increment = () => {
    updateValue(valueIndex, myValue + 1);
    setMyValue(myValue + 1);
  }

  return (
      <div className='DayRow'>
        <div className='DayLabel'>
          <div className="DayLabelMonth">{monthText}</div>
          <div className="DayLabelNumber">{date.getDate()}</div>
          <div className="DayLabelDay">{days[date.getDay()]}</div>
        </div>
        <div className='DayCounter'>
          <div className="CounterButton" onClick={() => decrement(day)}>
            <Minus />
          </div>
          {myValue === 0 && <div className="CounterEmptyText">No entry</div>}
          {myValue < 0 && <div className="CounterText">0</div>}
          {myValue > 0 && <div className="CounterText">{myValue}</div>}
          <div className="CounterButton" onClick={() => increment(day)}>
            <Plus />
          </div>
        </div>
      </div>
  );
};

export default DayRow;
