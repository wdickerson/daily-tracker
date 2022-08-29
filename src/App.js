import './App.css';
import AppHeader from './AppHeader.js';
import DayRow from './DayRow.js';
import React, { useState, useEffect } from 'react';

class DayCounter {
  constructor(savedValue) {
    this._value = !!savedValue ? parseInt(savedValue) : 0;
    this._recorded = savedValue || savedValue === 0;
  }

  get value() {
    return this._value;
  }

  get encodedValue() {
    return this._recorded ? this._value : '';
  }
  
  get recorded() {
    return this._recorded;
  }

  increment() {
    if (this._recorded) this._value++;
    this._recorded = true;
  }

  decrement() {
    if (this._value === 0) this._recorded = false;
    this._value = Math.max(0, this._value - 1);
  }
}

class Counter {
  constructor() {
    this._value = 0;
  }

  get value() {
    return this._value;
  }

  increment(amount = 1) {
    this._value = this._value + amount;
  }

  decrement() {
    this._value = Math.max(0, this._value - 1);
  }
}

function App() {
  const [days, setDays] = useState([]);
  const [weekValues, setWeekValues] = useState([]);
  const [monthValues, setMonthValues] = useState([]);

  useEffect(() => {
    const rawValues = localStorage.getItem('trackerValues');
    const savedValues = rawValues ? rawValues.split(',') : [];
    const _days = [];
    const oneMonthFromNow = new Date();
    const currentDate = new Date(2022, 4, 1);
    oneMonthFromNow.setDate(oneMonthFromNow.getDate() + 30);
    let weekCounter = new Counter();
    let monthCounter = new Counter();
    while (currentDate < oneMonthFromNow) {
      const dayCounter = new DayCounter(savedValues.shift())
      weekCounter.increment(dayCounter.value);
      monthCounter.increment(dayCounter.value);
      _days.push({ 
        date: new Date(currentDate), 
        dayCounter: dayCounter,
        weekCounter: weekCounter,
        monthCounter: monthCounter,
      })
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate.getDay() === 1) weekCounter = new Counter();
      if (currentDate.getDate() === 1) monthCounter = new Counter();
    }
    setDays(_days);
    setWeekValues(_days.map(day => day.weekCounter.value));
    setMonthValues(_days.map(day => day.monthCounter.value));
  }, [])

  const updateValue = () => {
    setWeekValues(days.map(day => day.weekCounter.value));
    setMonthValues(days.map(day => day.monthCounter.value));
    localStorage.setItem('trackerValues', days.map(d => d.dayCounter.encodedValue).join(','));
  }

  return (
    <div className="App">
      <AppHeader />
      <div className="DayRows">
        {
          days.map(
            (day, i) => (
              <DayRow 
                day={day}
                tomorrow={days[i + 1]}
                updateValue={updateValue}
                weekValue={weekValues[i]}
                monthValue={monthValues[i]}
                key={day.date.valueOf()} 
              />
            )
          )
        }
      </div>
    </div>
  );
}

export default App;
