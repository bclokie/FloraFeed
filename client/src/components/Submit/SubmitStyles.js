import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const theme = createTheme();
const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
};

const Input = styled('input')({
  backgroundColor: colors.white,
  border: '1px solid grey',
  borderRadius: '4px',
  padding: '8px 12px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  marginBottom: '16px',
});

const TextArea = styled('textarea')({
  backgroundColor: colors.white,
  border: '1px solid grey',
  borderRadius: '4px',
  padding: '8px 12px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  height: '100px',
  marginBottom: '16px',
});

const Button = styled('button')({
  backgroundColor: colors.green1,
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  padding: '12px 24px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: colors.green2,
  },
  display: 'block',
  margin: '0 auto',
});

function Form() {
  return (
    <div>
      <Input type="text" />
      <TextArea />
      <Button>Submit</Button>
    </div>
  );
}

export { theme, Form };
