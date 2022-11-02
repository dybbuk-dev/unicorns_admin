import ReactDOM from 'react-dom';
import { Dialog } from '@mui/material';
import { IconButton } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ViewCard from 'src/view/bundle/view/ViewCard';
import CloseIcon from '@mui/icons-material/Close';
import colors from 'src/mui/assets/theme/base/colors';

function ViewModal(props) {
  const bundle = props.bundle;

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={props.onClose}
      maxWidth="md"
      fullWidth={true}
    >
      <MDBox px={3} py={2}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="h3">
            {bundle.id + 1}
          </MDTypography>
          <IconButton
            onClick={props.onClose}
            color="inherit"
            sx={{
              boxShadow: 2,
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </MDBox>
        <MDBox
          display="flex"
          borderRadius="12px"
          justifyContent="space-around"
          alignItems="center"
          mt={2}
          p={1}
          sx={{
            background: `linear-gradient(to right, #306ED6, #600D8B, #43006A)`,
          }}
        >
          <ViewCard type="UNIM" tokens={bundle.UNIM} />
          <MDBox px={1}>
            <img
              src="/images/plus.svg"
              alt="Plus"
              width="18px"
            />
          </MDBox>
          <ViewCard
            type="unicorns"
            nfts={bundle.unicorns}
          />
          <MDBox px={1}>
            <img
              src="/images/plus.svg"
              alt="Plus"
              width="18px"
            />
          </MDBox>
          <ViewCard type="RBW" tokens={bundle.RBW} />
          <MDBox px={1}>
            <img
              src="/images/plus.svg"
              alt="Plus"
              width="18px"
            />
          </MDBox>
          <ViewCard type="lands" nfts={bundle.lands} />
        </MDBox>
        <MDBox
          sx={{
            mt: 2,
            mb: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MDBox>
            <MDTypography
              sx={{
                color: colors.text.main,
                fontWeight: 400,
                fontSize: '16px',
              }}
            >
              Pack value
            </MDTypography>
            <MDBox display="flex" alignItems="center">
              <img src="/images/ether.svg" alt="Timer" />
              <MDTypography
                sx={{
                  color: colors.dark.main,
                  fontWeight: 800,
                  fontSize: '24px',
                  pl: '6px',
                  lineHeight: 1.4,
                }}
              >
                {`${bundle.price} MATIC`}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ViewModal;
