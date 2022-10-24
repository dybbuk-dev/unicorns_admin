import { useState } from 'react';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import colors from 'src/mui/assets/theme/base/colors';
import { IconButton } from '@mui/material';

function ViewCard(props) {
  const { nfts, type, tokens } = props;
  const [active, setActive] = useState(0);
  return (
    <MDBox
      borderRadius="10px"
      border={1}
      borderColor="grey.300"
      position="relative"
      overflow="hidden"
      width="160px"
      bgcolor="#ffffff"
    >
      <img
        src={
          type === 'UNIM'
            ? '/images/pack/pack_UNIM.svg'
            : type === 'RBW'
            ? '/images/pack/pack_RBW.svg'
            : nfts[active].image
        }
        width="100%"
        alt="Unicorn"
      />
      <MDTypography
        sx={{
          fontWeight: 600,
          color: colors.dark,
          fontSize: 16,
          px: '14px',
          pt: '4px',
        }}
      >
        {type === 'UNIM' || type === 'RBW'
          ? `$${type} tokens`
          : type === 'unicorns'
          ? `${nfts.length} Unicorns`
          : type === 'lands'
          ? `${nfts.length} Lands Plot`
          : null}
      </MDTypography>
      <MDTypography
        sx={{
          fontWeight: 400,
          color: colors.text,
          fontSize: 12,
          px: '14px',
          pb: tokens ? '20px' : '4px',
        }}
      >
        {tokens ? `${tokens} Tokens` : 'Rarity: Common'}
      </MDTypography>
      {type === 'unicorns' || type === 'lands' ? (
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {nfts.map((nft, i) => (
            <IconButton
              size="small"
              key={i}
              onClick={() => setActive(i)}
            >
              <MDBox
                width="8px"
                height="8px"
                borderRadius="50%"
                sx={{
                  bgcolor:
                    active === i ? '#6029E3' : 'grey.400',
                  mb: '6px',
                }}
              />
            </IconButton>
          ))}
        </MDBox>
      ) : null}
    </MDBox>
  );
}

ViewCard.defaultProps = {
  tokens: 0,
};

ViewCard.propTypes = {
  nfts: PropTypes.array,
  tokens: PropTypes.number,
  type: PropTypes.string,
};

export default ViewCard;
