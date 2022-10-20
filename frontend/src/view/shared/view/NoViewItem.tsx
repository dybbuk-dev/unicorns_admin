import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function NoViewItem(props) {
  return (
    <MDBox
      pt={props.hiddenLabel ? 0 : 2}
      sx={{
        position: 'relative',
      }}
    >
      {!props.hiddenLabel && (
        <MDTypography
          variant="caption"
          color="secondary"
          fontWeight="regular"
          sx={{
            lineHeight: 1,
            position: 'absolute',
            top: 0,
          }}
        >
          {props.label}
        </MDTypography>
      )}
      <MDTypography
        variant="button"
        fontWeight="regular"
        fontStyle="italic"
        textTransform="capitalize"
      >
        {props.noData ??
          i18n('customViewer.noData', props.label)}
      </MDTypography>
    </MDBox>
  );
}

export default NoViewItem;
