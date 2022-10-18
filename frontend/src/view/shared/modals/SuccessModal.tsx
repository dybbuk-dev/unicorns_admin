import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import MDButton from 'src/mui/components/MDButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PublishModal(props) {
  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={props.onClose}
      maxWidth="sm"
      fullWidth={true}
    >
      <MDBox position="relative" pt="100px" pb="20px">
        <MDBox
          position="absolute"
          width="70px"
          top="15px"
          left="50%"
          ml="-35px"
        >
          <img src="/images/success.svg" alt="Success" />
        </MDBox>
        <MDTypography
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '36px',
          }}
        >
          {props.title}
        </MDTypography>
        <MDTypography
          sx={{
            pt: '10px',
            pb: '20px',
            textAlign: 'center',
            fontWeight: 400,
            fontSize: '20px',
            fontColor: 'grey.400',
          }}
        >
          {props.description}
        </MDTypography>
        <MDBox display="flex" justifyContent="center">
          <MDButton
            variant="gradient"
            onClick={props.onClose}
            color="purple"
            size="small"
            autoFocus
            circular
            sx={{
              textTransform: 'none',
            }}
          >
            {props.okText}
          </MDButton>
        </MDBox>
      </MDBox>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default PublishModal;
