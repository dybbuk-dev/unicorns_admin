import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/bundle/view/bundleViewActions';
import selectors from 'src/modules/bundle/view/bundleViewSelectors';
import { IconButton } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import { Grid } from '@mui/material';
import MDTypography from 'src/mui/components/MDTypography';
import ViewCard from 'src/view/bundle/view/ViewCard';
import Spinner from 'src/view/shared/Spinner';
import CloseIcon from '@mui/icons-material/Close';
import colors from 'src/mui/assets/theme/base/colors';

function ViewModal(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFind(props.bundleId));
  }, [dispatch, props.bundleId]);

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={props.onClose}
      maxWidth="md"
      fullWidth={true}
    >
      {loading || record === null ? (
        <MDBox>
          <Spinner />
        </MDBox>
      ) : (
        <MDBox px={3} py={2}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h3">
              {record.name}
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
            <ViewCard type="UNIM" tokens={record.UNIM} />
            <MDBox px={1}>
              <img
                src="/images/plus.svg"
                alt="Plus"
                width="18px"
              />
            </MDBox>
            <ViewCard
              type="unicorns"
              nfts={record.unicorns}
            />
            <MDBox px={1}>
              <img
                src="/images/plus.svg"
                alt="Plus"
                width="18px"
              />
            </MDBox>
            <ViewCard type="RBW" tokens={record.RBW} />
            <MDBox px={1}>
              <img
                src="/images/plus.svg"
                alt="Plus"
                width="18px"
              />
            </MDBox>
            <ViewCard type="lands" nfts={record.lands} />
          </MDBox>
          <Grid container mt={3}>
            <Grid item xs={6}>
              <MDTypography
                sx={{
                  color: colors.text.main,
                  fontWeight: 400,
                  fontSize: '16px',
                }}
              >
                Offer valid until time expires
              </MDTypography>
              <MDBox display="flex" alignItems="center">
                <img src="/images/timer.svg" alt="Timer" />
                <MDTypography
                  sx={{
                    color: colors.purple.main,
                    fontWeight: 800,
                    fontSize: '24px',
                    pl: '6px',
                    lineHeight: 1.4,
                  }}
                >
                  2d 23h 54m 1s
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={6}>
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
                  0.1 ETH
                </MDTypography>
                <MDTypography
                  sx={{
                    color: colors.dark.main,
                    fontWeight: 500,
                    fontSize: '16px',
                    pl: '4px',
                    pt: '8px',
                    lineHeight: 1.4,
                  }}
                >
                  ($134,28 USD)
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      )}
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ViewModal;
