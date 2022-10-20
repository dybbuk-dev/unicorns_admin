import { styled, Theme } from '@mui/material/styles';

export default styled('div')(
  ({ theme }: { theme?: Theme | any }) => {
    const { palette, borders, typography } = theme;

    const { borderRadius } = borders;
    const { size } = typography;
    const { text, white, dark } = palette;

    return {
      '& .ql-toolbar': {
        borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,

        '& .ql-picker, & .ql-stroke': {
          stroke: `${dark.main} !important`,
          color: `${dark.main} !important`,
        },
      },

      '& .ql-container': {
        borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
      },

      '& .ql-editor': {
        color: text.main,

        '& p': {
          fontSize: size.md,
          color: text.main,
        },

        '& ul li': {
          color: text.main,
        },
      },
    };
  },
);
