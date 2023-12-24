// import logo from './logo.svg';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import Form from './components/Form';
import Watch from './components/Watch';

import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


function App() {
  const refUTC = useRef(null);
  // const refTimezone = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(function() {
      refUTC.current.textContent = `Время по Гринвичу: ${dayjs().utc().format('HH:mm:ss')}`
    }, 1000)
    return () => clearInterval(intervalId);
  }, [])

  const [timeState, setTimeState] = useState({
    name: '',
    timezone: '',
    id: '',
  })

  const [watches, setWatch] = useState([]);

  const handleChange = (event) => {
    const {value, name} = event.target;
    console.log(event.target);
    setTimeState((prevTimeStateValue) => ({...prevTimeStateValue, [name]: value, id: nanoid()}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setWatch((prevWatches) => ([...prevWatches, timeState]));

    // Очистка инпутов
    setTimeState((prevTimeStateValue) => ({...prevTimeStateValue, name: '', timezone: '', id: ''}));
  }

  const handleClick = (id) => {
    setWatch((prevWatches) => [...prevWatches.filter(watch => watch.id !== id)]) // id передается при вызове метода (клике), не хранится в разметке
  }
  
  return (
    <>
      <Form state={timeState} onChange={handleChange} onSubmit={handleSubmit}/>
      <div className='utc-0' ref={refUTC}>Время по Гринвичу: {dayjs().utc().format('HH:mm:ss')}</div>
      <div className='watches'>
        {watches.map(watch => <Watch key={watch.id} watch={watch} onClick={() => handleClick(watch.id)}/>)}
      </div>
    </>
  );
}

export default App;
