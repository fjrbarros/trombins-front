import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { openDrawer } from '../../redux/drawer/actions';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  usedrawer?: string;
}

type Props = {
  title?: string;
  useDrawer?: string;
};

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open, usedrawer }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width:
      usedrawer === 'true' ? `calc(100% - ${theme.drawer.width}px)` : '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: usedrawer === 'true' ? theme.drawer.width : 0,
  }),
}));

export default function AppBar({ title, useDrawer }: Props) {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((data: RootState) => data.drawer);

  return (
    <StyledAppBar position="fixed" open={drawerOpen} usedrawer={useDrawer}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          {title}
        </Typography>
        {useDrawer === 'true' && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => {
              dispatch(openDrawer());
              localStorage.setItem('drawer', '1');
            }}
            sx={{ ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}
