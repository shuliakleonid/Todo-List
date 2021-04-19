import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

export type AddItemFormType = {
  addItem: (value: string) => void
  disabled?: boolean
}
export const AddItemForm = React.memo((props: AddItemFormType) => {
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

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (error !== null) {
      setError(null);
    }
    const value = valueTodo.trim();
    if (event.charCode === 13 && value !== '') {
      props.addItem(value)
      setValueTodo('')
    } else {
      setError('Error write name!')
    }
  }

  return (
      <div>
        <TextField value={valueTodo}
                   disabled={props.disabled}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   helperText={error && 'Write title'}
                   label={'Title'}
                   error={Boolean(error)}
                   onBlur={() => {
                     setError(null)
                   }}
        />
        <IconButton onClick={onClickButtonAdd} disabled={props.disabled}>
          <AddBox/>
        </IconButton>
      </div>
  )
})
