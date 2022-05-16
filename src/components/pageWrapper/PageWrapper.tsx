import { AppBar, Drawer, Main } from '..';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  useDrawer?: string;
  title?: string;
};

export default function PageWrapper({ children, useDrawer, title }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar useDrawer={useDrawer} title={title} />
      <Main useDrawer={useDrawer}>{children}</Main>
      {useDrawer === 'true' && <Drawer />}
    </Box>
  );
}
