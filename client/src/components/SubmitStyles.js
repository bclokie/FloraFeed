import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

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
    backgroundColor: '#4caf50',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#357a38',
    },
  },
}));

export { theme, useStyles };