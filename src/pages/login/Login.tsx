import React from 'react'
import {Button, Checkbox, FormControlLabel, Grid, makeStyles, TextField} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useFormik} from 'formik';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}


export const Login = () => {
  const classes = useStyles();




  const {handleChange, handleSubmit,handleBlur, values,errors,touched,resetForm} = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if(values.password.length>4){
        // errors.password = 'Required';
      }else {
        errors.password = 'Password must be longer';
      }
      return errors;
    },

    onSubmit: values => {
      resetForm()
      alert(JSON.stringify(values))

    }
  })
  const errorEmail = !!(touched.email && errors.email)
  const errorPassword = !!(touched.password && errors.password)
  console.log(touched,'PASSWORD')
  // console.log(errorEmail,'EMAIL')
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                error={errorEmail && !!errors.email}
                onBlur={handleBlur}
                variant="outlined"
                margin="normal"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                helperText={errorEmail && errors.email}
                value={values.email}
                required
                fullWidth
                autoFocus
            />
            <TextField
                error={errorPassword}
                variant="outlined"
                margin="normal"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errorPassword && errors.password}
                value={values.password}
                required
                fullWidth
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={'https://social-network.samuraijs.com/'} variant="body2">
                  To log in get registered
                </Link>
              </Grid>
              <Grid item>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
}
