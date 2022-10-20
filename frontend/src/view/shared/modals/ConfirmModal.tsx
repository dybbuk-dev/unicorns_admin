import React from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';

function ConfirmModal(props) {
  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={props.onClose}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>
        <MDTypography>{props.title}</MDTypography>
      </DialogTitle>
      <DialogActions>
        <MDButton
          variant="outlined"
          onClick={props.onClose}
          color="purple"
          size="small"
          circular
        >
          {props.cancelText}
        </MDButton>
        <MDButton
          variant="gradient"
          onClick={props.onConfirm}
          color="purple"
          size="small"
          autoFocus
          circular
        >
          {props.okText}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ConfirmModal;
