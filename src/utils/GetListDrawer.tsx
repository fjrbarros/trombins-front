import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/user/actions';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import FactCheckIcon from '@mui/icons-material/FactCheck';

function GetListDrawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch({ ...removeUser() });
    localStorage.removeItem('access_token');
    navigate('/');
  }

  const itemList = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      fn: () => navigate('/dashboard'),
    },
    {
      text: 'My data',
      icon: <PersonIcon />,
      fn: () => navigate('/change-user-data'),
    },
    {
      text: 'Candidate form',
      icon: <FactCheckIcon />,
      fn: () => navigate('/candidate-form'),
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      fn: () => handleLogout(),
    },
  ];

  return itemList;
}

export default GetListDrawer;
