import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {setError} from '../../reducers/app-reducer';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const ErrorSnackbar = () => {
  // const [open, setOpen] = React.useState(true)
  const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
  const dispatch = useDispatch()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) =>
      dispatch(setError({error: null}))
  // debugger

  // if (reason === 'clickaway') {
  //   setOpen(false)
  //   return
  // }
  // setOpen(false)


  return (
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
  )
}

