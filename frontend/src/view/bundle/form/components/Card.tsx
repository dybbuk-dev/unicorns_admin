import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import {
  unicorns,
  lands,
} from 'src/view/bundle/form/NFT_JSON';
import colors from 'src/mui/assets/theme/base/colors';

export default function Card(props) {
  const { index, isChecked, isUnicorn, isGeneral, mt } =
    props;
  const image = isUnicorn
    ? unicorns[index].img
    : lands[index].img;
  const name = isUnicorn
    ? unicorns[index].name
    : lands[index].name;
  return (
    <MDBox
      borderRadius="10px"
      border={1}
      borderColor="grey.300"
      position="relative"
      overflow="hidden"
      width="160px"
      bgcolor="#ffffff"
      mt={mt}
    >
      {!isGeneral && isChecked ? (
        <MDBox position="absolute" top="5px" right="3px">
          <img
            width="80%"
            src="/images/checked.svg"
            alt="Checked"
          />
        </MDBox>
      ) : !isGeneral && !isChecked ? (
        <MDBox position="absolute" top="5px" right="3px">
          <img
            width="80%"
            src="/images/unchecked.svg"
            alt="Unchecked"
          />
        </MDBox>
      ) : null}
      <img src={image} width="100%" alt="Unicorn" />
      <MDTypography
        sx={{
          fontWeight: 600,
          color: colors.dark,
          fontSize: 16,
          px: '10px',
          pt: '4px',
        }}
      >
        {name}
      </MDTypography>
      <MDTypography
        sx={{
          fontWeight: 400,
          color: colors.text,
          fontSize: 12,
          px: '10px',
          pb: '10px',
        }}
      >
        Crypto Unicorns Market
      </MDTypography>
    </MDBox>
  );
}
