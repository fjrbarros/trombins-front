import { styled } from '@mui/material/styles';
import { Drawer as MuiDrawer, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { closeDrawer, openDrawer } from '../../redux/drawer/actions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import GetListDrawer from '../../utils/GetListDrawer';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const TextEllipsis = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '100%',
}));

export default function Drawer() {
  const dispatch = useDispatch();
  const user = useSelector((data: RootState) => data.user);
  const drawerOpen = useSelector((data: RootState) => data.drawer);
  const list = GetListDrawer();

  const isDrawerOpen = localStorage.getItem('drawer') === '1';
  const itemDispatch = isDrawerOpen ? openDrawer() : closeDrawer();

  dispatch(itemDispatch);

  return (
    <MuiDrawer
      sx={theme => ({
        width: theme.drawer.width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: theme.drawer.width,
        },
        [theme.breakpoints.down(450)]: {
          width: drawerOpen ? 0 : theme.drawer.width,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? '100%' : theme.drawer.width,
          },
        },
      })}
      variant="persistent"
      anchor="right"
      open={drawerOpen}
    >
      <DrawerHeader>
        <IconButton
          onClick={() => {
            dispatch(closeDrawer());
            localStorage.setItem('drawer', '0');
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '10px',
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{ width: 56, height: 56, marginBottom: '5px' }}
        />
        <TextEllipsis>{user.name}</TextEllipsis>
      </Paper>
      <Divider />
      <List>
        {list.map(item => {
          return (
            <ListItem
              key={item.text}
              button
              onClick={() => (item.fn ? item.fn() : null)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>
                <TextEllipsis>{item.text}</TextEllipsis>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </MuiDrawer>
  );
}
