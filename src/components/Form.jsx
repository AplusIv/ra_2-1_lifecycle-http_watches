import React from 'react'

const Form = ({state: {name, timezone}, onChange, onSubmit}) => {
  return (
    <form id='watches-form' className='form' onSubmit={onSubmit}>
        <label>Название
          <input 
          className='name-input input' 
          name='name' 
          placeholder='Введите название часового пояса'
          value={name}
          onChange={onChange}
          required
          />
        </label>
        <label>Временная зона
          <input 
          className='timezone-input input' 
          name='timezone'  
          placeholder='Укажите смещение в часах относительно Гринвича' 
          value={timezone}
          onChange={onChange} 
          required
          />
        </label>
        <button className='btn' type='submit'>Добавить</button>
      </form>
  )
}

export default Form