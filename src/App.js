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
    const rawValues = localStorage.getItem('trackerValues_v1');
    const savedValues = rawValues ? rawValues.split(',') : [];

    // If a start date is in localStorage, use it.
    // Otherwise, use the first day of the current month.
    // Then save the start date to local storage.
    const firstOfMonth = new Date();
    firstOfMonth.setDate(1);
    const savedStartDate = localStorage.getItem('startDate_v1') || firstOfMonth.toISOString().split('T')[0];
    const _year = Number(savedStartDate.split('-')[0]);
    const _month = Number(savedStartDate.split('-')[1]) - 1;
    const _day = Number(savedStartDate.split('-')[2]);
    const currentDate = new Date(_year, _month, _day);
    localStorage.setItem('startDate_v1', currentDate.toISOString().split('T')[0]); 

    // Show 38 days beyond today (chosen arbitrarily)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 38);

    // Initialize the list of days (with their saved values, if any)
    const _days = [];
    let weekCounter = new Counter();
    let monthCounter = new Counter();
    while (currentDate < endDate) {
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
    localStorage.setItem('trackerValues_v1', days.map(d => d.dayCounter.encodedValue).join(','));
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
