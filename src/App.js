import './App.css';
import AppHeader from './AppHeader.js';
import DayRow from './DayRow.js';
import React from 'react';

function App() {
  const localStorageValues = localStorage.getItem('trackerValues');
  const savedValues = localStorageValues ? localStorageValues.split(',') : [];
  
  const myDisplayValues = [];
  // {
  //   date: ...,
  //   value: ...
  // }

  const oneYearFromNow = new Date();
  oneYearFromNow.setDate(oneYearFromNow.getDate() + 365);
  const d = new Date(2022, 4, 1);
  let j = 0;
  while (d < oneYearFromNow) {
    myDisplayValues.push({
      date: new Date(d),
      value: savedValues[j] === undefined ? 0 : savedValues[j],
    })
    d.setDate(d.getDate() + 1);
    j++;
  }

  const updateValue = (indexOfNewValue, newValue) => {
    myDisplayValues[indexOfNewValue].value = newValue;
    localStorage.setItem('trackerValues', myDisplayValues.map(d => d.value).join(','));
  }

  return (
    <div className="App">
      <AppHeader />
      <div className="DayRows">
        {
          myDisplayValues.map(
            (day, i) => (
              <DayRow 
                day={day.date}
                value={parseInt(day.value)}
                valueIndex={i}
                updateValue={updateValue}
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
