import MDBox from 'src/mui/components/MDBox';
import { Parser as HtmlToReactParser } from 'html-to-react';
import MDTypography from 'src/mui/components/MDTypography';

function HtmlViewItem(props) {
  const { value, label } = props;
  const htmlToReactParser = new HtmlToReactParser();
  const reactElement = htmlToReactParser.parse(value);
  return (
    <MDBox
      pt={2}
      sx={{
        position: 'relative',
      }}
    >
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
        {label}
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular">
        {reactElement}
      </MDTypography>
    </MDBox>
  );
}

export default HtmlViewItem;
