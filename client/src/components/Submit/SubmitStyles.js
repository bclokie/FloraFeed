import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();
const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    backgroundColor: 'white',
    border: '1px solid grey',
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '16px',
  },
  textarea: {
    backgroundColor: 'white',
    border: '1px solid grey',
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    height: '100px',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#357a38',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#4caf50',
    },
    display: 'block',
    margin: '0 auto',
  },
}));

export { theme, useStyles };
