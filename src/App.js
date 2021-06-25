import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [showBtn, setShowBtn] = useState(true);

  async function handleClick() {
    setShowBtn((prevState) => !prevState);
    const res = await axios.get(
      'https://api.nasa.gov/planetary/apod?api_key=DruLxHbvJkkDPByowWLtfsT6FB2GBLnaIkQ5KUkb&start_date=2021-04-01&end_date=2021-04-30'
    );
    const data = res.data;
    setData(data);
    console.log(data);
  }

  return (
    <div className='App'>
      <button
        className={showBtn ? 'launch-btn ' : 'hidden-btn'}
        onClick={() => handleClick()}
      >
        🚀
      </button>
      {!data.length && !showBtn && <div className='lds-hourglass'></div>}
      <div className='wrapper'>
        {data.map((day) => {
          return (
            <div key={day.date} className='card'>
              <p>
                Title: <span>{day.title}</span>
              </p>
              <p>
                Explanation: <span>{day.explanation}</span>
              </p>
              <p>
                Copyright: <span>{day.copyright || 'Free copyright'}</span>
              </p>
              <p>
                URL:{' '}
                <a href={day.url} target='_blank' rel='noreferrer'>
                  {day.url}
                </a>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
