import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

interface MuiMainProps {
  usedrawer?: string;
  open?: boolean;
}

const MuiMain = styled('main', {
  shouldForwardProp: prop => prop !== 'open',
})<MuiMainProps>(({ theme, open, usedrawer }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: usedrawer === 'true' ? -theme.drawer.width : 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

type Props = {
  children?: ReactNode;
  useDrawer?: string;
};

export default function Main({ children, useDrawer }: Props) {
  const drawerOpen = useSelector((data: RootState) => data.drawer);

  return (
    <MuiMain open={drawerOpen} usedrawer={useDrawer}>
      <Box
        sx={theme => ({
          width: '100%',
          maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
          marginTop: `${theme.mixins.toolbar.minHeight}px`,
          overflow: 'auto',
        })}
      >
        {children}
      </Box>
    </MuiMain>
  );
}
