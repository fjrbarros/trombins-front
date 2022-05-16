import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { PasswordInput } from '../components';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/user/actions';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import api from '../api';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Digite um e-mail válido.')
    .required('E-mail obrigatório.'),
  password: yup.string().required('Senha obrigatória'),
});

const initialValues = {
  email: '',
  password: '',
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      api
        .post('user/auth', values)
        .then(resp => {
          dispatch({
            ...updateUser(),
            payload: {
              user: {
                ...resp.data.user,
                avatar: `${api.defaults.baseURL}files/${resp.data.user.avatar}`,
              },
            },
          });
          localStorage.setItem('access_token', resp.data.token);
          formik.resetForm();
          toast.dismiss();
          navigate('/dashboard');
        })
        .catch(error => {
          toast.dismiss();
          toast.error(error.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
          });
        });
    },
  });

  return (
    <Box
      sx={theme => ({
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down(600)]: {
          flexDirection: 'column',
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          sx={{ display: 'flex', flexDirection: 'column', color: '#262626de' }}
        >
          <Typography
            component="span"
            sx={theme => ({
              fontWeight: '400',
              fontSize: '5vw',
              [theme.breakpoints.down(600)]: {
                fontSize: '8vw',
              },
            })}
          >
            Trombin's
          </Typography>
          <Typography
            component="span"
            sx={theme => ({
              fontWeight: '300',
              fontSize: '4vw',
              marginLeft: '19.5vw',
              [theme.breakpoints.down(600)]: {
                fontSize: '6vw',
                marginLeft: '32vw',
              },
            })}
          >
            System
          </Typography>
        </Typography>
      </Box>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={theme => ({
          margin: 'auto',
          height: '70%',
          [theme.breakpoints.down(600)]: {
            display: 'none',
          },
        })}
      />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={theme => ({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          [theme.breakpoints.down(600)]: {
            width: '100%',
          },
        })}
      >
        <TextField
          label="E-mail"
          name="email"
          sx={{ margin: '0px 20px 20px' }}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <PasswordInput
          label="Password"
          name="password"
          sx={{ margin: '0px 20px 20px' }}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          variant="contained"
          size="medium"
          type="submit"
          sx={{
            width: '50%',
            margin: '0px auto',
            borderRadius: '20px',
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
