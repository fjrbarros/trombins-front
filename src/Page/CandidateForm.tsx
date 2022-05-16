import { Box, Button, TextField } from '@mui/material';
import { PageWrapper } from '../components';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CandidateForm() {
  return (
    <PageWrapper title="Candidate form" useDrawer="false">
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
          sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
          <TextField label="Name" sx={{ marginTop: '20px' }} />
          <TextField label="Age" />
          <TextField label="PPS" />
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Full time" />
            <FormControlLabel control={<Checkbox />} label="Collage" />
          </FormGroup>
          <FormControl fullWidth variant="standard">
            <InputLabel>English level</InputLabel>
            <Select label="English level">
              <MenuItem value="B">Beginner</MenuItem>
              <MenuItem value="I">Intermediary</MenuItem>
              <MenuItem value="A">Advanced</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel>Availability</InputLabel>
            <Select label="Availability">
              <MenuItem value="B">Beginner</MenuItem>
              <MenuItem value="I">Intermediary</MenuItem>
              <MenuItem value="A">Advanced</MenuItem>
            </Select>
          </FormControl>

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

export default CandidateForm;
