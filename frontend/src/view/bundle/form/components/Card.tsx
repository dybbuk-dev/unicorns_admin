import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import colors from 'src/mui/assets/theme/base/colors';

function Card(props) {
  const { title, image, isChecked, isGeneral, mt } = props;

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
            loading="lazy"
          />
        </MDBox>
      ) : null}
      <img
        src={
          image ? image : '/images/unicorns/unicorn1.svg'
        }
        width="100%"
        alt={image}
      />
      <MDBox mx="10px" overflow="hidden">
        <MDTypography
          sx={{
            fontWeight: 600,
            color: colors.dark,
            fontSize: 16,
            pt: '4px',
            width: '200%',
          }}
        >
          {title ? title : 'NFT to test'}
        </MDTypography>
      </MDBox>
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

Card.defaultProps = {
  title: '',
  image: '',
  isChecked: false,
  isGeneral: false,
};

Card.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  isChecked: PropTypes.bool,
  isGeneral: PropTypes.bool,
  mt: PropTypes.string,
};

export default Card;
