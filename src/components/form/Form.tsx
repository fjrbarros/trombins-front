import { Box } from '@mui/material';
import { ReactChild, ReactChildren } from 'react';
import { SxProps } from '@mui/system';

interface IProps {
  onSubmit?: (event: any) => void;
  noValidate?: boolean;
  children?: ReactChild | ReactChildren | JSX.Element | JSX.Element[];
  className?: string;
  sx?: SxProps;
}

export default function Form({
  onSubmit,
  noValidate = true,
  children,
  sx,
}: IProps) {
  function handleSubmit(event: any) {
    event.preventDefault();

    if (onSubmit) onSubmit(event);
  }

  return (
    <Box
      component="form"
      noValidate={noValidate}
      onSubmit={handleSubmit}
      sx={sx}
    >
      {children}
    </Box>
  );
}
