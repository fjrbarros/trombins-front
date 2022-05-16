import { Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import api from '../../api';
import { toast } from 'react-toastify';
import { updateUserAvatar } from '../../redux/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';

function UploadImage() {
  const dispatch = useDispatch();
  const { avatar } = useSelector((data: RootState) => data.user);

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>): void {
    const avatar = event.target.files?.[0] ?? '';

    const formData = new FormData();

    formData.append('avatar', avatar);

    api
      .patch('user/avatar', formData, {})
      .then(resp => {
        dispatch({
          ...updateUserAvatar(),
          payload: {
            user: { avatar: `${api.defaults.baseURL}files/${resp.data}` },
          },
        });
      })
      .catch(error => {
        toast.error(error.response?.data?.message || 'Error updating image.', {
          hideProgressBar: true,
          autoClose: false,
        });
      });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar
        src={avatar}
        sx={{ width: 100, height: 100, marginBottom: '10px' }}
      />
      <input
        style={{ display: 'none' }}
        accept="image/*"
        id="contained-button-file"
        type="file"
        onChange={handleChangeImage}
      />
      <Button
        startIcon={<PhotoCameraIcon />}
        component="label"
        htmlFor="contained-button-file"
        size="small"
      >
        Upload
      </Button>
    </Box>
  );
}

export default UploadImage;
