import { CircularProgress } from '@mui/material';

interface SpinnerProps {
  size?: number;
}

function Spinner({ size }) {
  return (
    <div
      style={{
        width: '100%',
        marginTop: size / 2 + 'px',
        marginBottom: size / 2 + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress
        sx={{
          color: '#6029E3',
        }}
        size={size}
      />
    </div>
  );
}

Spinner.defaultProps = {
  size: 40,
};

export default Spinner;
