import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { SxProps } from '@mui/system';

interface IProps {
  label?: string;
  sx?: SxProps;
  name?: string;
  onChange?: (event: any) => void;
  error?: boolean;
  helperText?: string | boolean | undefined;
  value?: string;
}

export default function PasswordInput({
  label,
  sx,
  name,
  onChange,
  error,
  helperText,
  value,
}: IProps) {
  const [type, setType] = useState('password');

  function toogleShowPassword() {
    setType(type === 'password' ? 'text' : 'password');
  }

  return (
    <TextField
      type={type}
      label={label}
      sx={sx}
      name={name}
      onChange={onChange}
      error={error}
      helperText={helperText}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment style={{ cursor: 'pointer' }} position="end">
            <IconButton
              tabIndex={-1}
              onClick={toogleShowPassword}
              onMouseDown={event => event.preventDefault()}
            >
              {type === 'text' ? (
                <VisibilityOutlined />
              ) : (
                <VisibilityOffOutlined />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
