import { Box, Button, TextField } from '@mui/material';
import { PageWrapper, PasswordInput, UploadImage } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import { useFormik } from 'formik';
import { updateUser } from '../redux/user/actions';
import * as yup from 'yup';
import api from '../api';
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Entr a valid e-mail.')
    .required('E-mail is required.'),
  name: yup.string().required('Name is required.'),
  oldPassword: yup.string().required('Old password is required.'),
  newPassword: yup.string().required('New password is required.'),
});

export default function ChangeUserData() {
  const dispatch = useDispatch();
  const { id, email, name } = useSelector((data: RootState) => data.user);

  const initialValues = { id, email, name, oldPassword: '', newPassword: '' };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: data => {
      api
        .put('user', data)
        .then(resp => {
          const data = {
            ...resp.data,
            avatar: `${api.defaults.baseURL}files/${resp.data.avatar}`,
          };
          dispatch({ ...updateUser(), payload: { user: data } });
          toast.dismiss();
          toast.success('Data saved successfully!', {
            position: toast.POSITION.TOP_RIGHT,
          });
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
    <PageWrapper title="Edit user data" useDrawer="true">
      <Box
        sx={theme => ({
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <Box flex={1} />
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
          <UploadImage />
          <TextField
            name="id"
            disabled
            value={formik.values.id}
            label="Secret key"
            sx={{ marginTop: '20px' }}
          />
          <TextField
            name="email"
            label="Email"
            sx={{ margin: '20px 0' }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <PasswordInput
            label="Old password"
            name="oldPassword"
            sx={{ margin: '20px 0' }}
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <PasswordInput
            label="New password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <Button
            variant="contained"
            size="medium"
            type="submit"
            sx={{
              width: '50%',
              margin: '20px auto 0',
              borderRadius: '20px',
            }}
          >
            Save
          </Button>
        </Box>
        <Box flex={1} />
      </Box>
    </PageWrapper>
  );
}
