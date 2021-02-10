import React, {ChangeEvent, useState} from 'react';
import s from '../todo-list/todoList.module.css';

type AddItemFormType = {
  addItem: (value: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {
  const [valueTodo, setValueTodo] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValueTodo(event.target.value)
    setError(null)
  }
  const onClickButtonAdd = () => {
    if (valueTodo.trim()) {
      props.addItem(valueTodo)
      setValueTodo('')
    } else {
      setError('Error write name!')
    }
  }

  const onKeyPressHandler = (event: any): void => {//нужно исправить!!!!!
    setError(null);
    const value = valueTodo.trim();
    if (event.charCode === 13 && value !== '') {
      props.addItem(value)
      setValueTodo('')
    }else{
      setError('Error write name!')
    }
  }

  return (
      <div>
        <input value={valueTodo}
               onChange={onChangeHandler}
               className={error ? s.error : ''}
               onKeyPress={onKeyPressHandler}
               onBlur={() => {
                 setError(null)
               }}
        />
        <button onClick={onClickButtonAdd}>+</button>
        {error && <div className={s.message_error}>{error}</div>}
      </div>
  )
}
