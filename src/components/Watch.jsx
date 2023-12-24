import {useEffect, useRef} from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


const Watch = ({watch, onClick}) => {
  const refTimezone = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(function() {
      const timeUTC0 = dayjs().utc();
      refTimezone.current.textContent = `${timeUTC0.add(watch.timezone, 'hour').format('HH:mm:ss')}`; // не уверен, что так оптимально работать элементом в React
      console.log('Я выполняюсь каждую секунду ' + intervalId)
    }, 1000)
    return () => clearInterval(intervalId);
  }, [watch]);

  console.log('render ' + watch.name);
  if (!watch) return;
  return (
    <>
      <div className='watch'>
        <h1 className='watch-name'>{watch.name}</h1>
        <div className='watch-data' ref={refTimezone}></div>
        <span className='delete-watch' onClick={onClick}>{'\u2716'}</span>
        {/* <div className='circle'>
          <span className='hour-arrow arrow'>{'\u2191'}</span>
          <div className='minute-arrow arrow'>{'\u2191'}</div>
          <div className='second-arrow arrow'>{'\u250A'}</div>
          <span className='center'>{'\u2027'}</span>
        </div> */}
      </div>    
    </>
  )
}

export default Watch