import { CardMedia } from '@mui/material';

export function BrandLogo(props) {
  let logo = resources.logo;
  return (
    <>
      <CardMedia
        src={logo}
        component="img"
        sx={{
          maxWidth: '100%',
          width: props.width ? props.width : '90%',
          margin: 0,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </>
  );
}

const resources = {
  logo: '/images/logo.svg',
};
