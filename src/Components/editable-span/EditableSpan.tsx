import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanTypeProps = {
  title: string
onChange:(value:string)=>void
}
export const EditableSpan = (props: EditableSpanTypeProps) => {
  const [title, setTitle] = useState('')
  const [editMode, setEditMode] = useState(false)
  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    props.onChange(title)
    setEditMode(false)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return (editMode
          ? <TextField onChange={onChangeTitleHandler} onBlur={activateViewMode} value={title} autoFocus/>
          : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}
