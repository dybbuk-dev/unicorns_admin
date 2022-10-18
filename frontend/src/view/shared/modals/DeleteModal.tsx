import React from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import MDButton from 'src/mui/components/MDButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ConfirmModal(props) {
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
          <img src="/images/close.svg" alt="Delete" />
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
            variant="outlined"
            onClick={props.onClose}
            color="purple"
            size="small"
            circular
            sx={{
              textTransform: 'none',
              mr: '10px',
            }}
          >
            {props.cancelText}
          </MDButton>
          <MDButton
            variant="gradient"
            onClick={props.onConfirm}
            size="small"
            autoFocus
            circular
            sx={{
              textTransform: 'none',
              bgcolor: '#FF4949 !important',
              color: '#FFFFFF !important',
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

export default ConfirmModal;
