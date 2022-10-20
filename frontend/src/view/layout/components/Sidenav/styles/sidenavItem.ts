/* eslint-disable prefer-destructuring */

/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { Theme } from '@mui/material/styles';

function item(theme: Theme | any, ownerState: any) {
  const { palette, borders, functions, transitions } =
    theme;
  const { active, icon } = ownerState;

  const { transparent, white, grey } = palette;
  const { borderRadius } = borders;
  const { rgba } = functions;

  return {
    pl: icon ? 0 : 3,
    mt: 0.375,
    mb: 0.3,
    width: '100%',
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    backgroundColor: () => {
      let backgroundValue = transparent.main;

      if (active === 'isParent') {
        backgroundValue = grey[200];
      }

      return backgroundValue;
    },
    transition: transitions.create('background-color', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter,
    }),

    '&:hover, &:focus': {
      backgroundColor: !active && rgba(grey[400], 0.2),
    },
  };
}

function itemContent(theme: Theme, ownerState: any) {
  const { palette, typography, transitions, functions } =
    theme;
  const { miniSidenav, name, active, icon } = ownerState;

  const { white, dark } = palette;
  const { size, fontWeightRegular, fontWeightLight } =
    typography;
  const { pxToRem } = functions;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: icon
      ? `${pxToRem(8)} ${pxToRem(16)}`
      : `${pxToRem(12)} ${pxToRem(16)}`,
    marginLeft: icon ? 0 : pxToRem(18),
    userSelect: 'none',
    position: 'relative',

    '& span': {
      color:
        active === 'isParent' || !active
          ? dark.main
          : dark.main,
      fontWeight: active
        ? fontWeightRegular
        : fontWeightLight,
      fontSize: size.sm,
      opacity: miniSidenav && !icon ? 0 : 1,
      transition: transitions.create(['opacity', 'color'], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    '&::before': {
      content: `"${name[0]}"`,
      color:
        active === 'isParent' || !active
          ? dark.main
          : white.main,
      fontWeight: fontWeightRegular,
      display: icon ? 'none' : 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: pxToRem(-15),
      opacity: 1,
      borderRadius: '50%',
      fontSize: size.sm,
    },
  };
}

function itemArrow(theme: Theme, ownerState: any) {
  const {
    palette,
    typography,
    transitions,
    breakpoints,
    functions,
  } = theme;
  const { noCollapse, miniSidenav, open, active } =
    ownerState;

  const { white, dark } = palette;
  const { size } = typography;
  const { pxToRem, rgba } = functions;

  return {
    fontSize: `${size.lg} !important`,
    fontWeight: 700,
    marginBottom: pxToRem(-1),
    transform: open ? 'rotate(0)' : 'rotate(-180deg)',
    color: () => {
      let colorValue;

      colorValue =
        open || active ? dark.main : rgba(dark.main, 0.25);

      return colorValue;
    },
    transition: transitions.create(
      ['color', 'transform', 'opacity'],
      {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      },
    ),

    [breakpoints.up('xl')]: {
      display:
        noCollapse || miniSidenav
          ? 'none !important'
          : 'block !important',
    },
  };
}

export { item, itemContent, itemArrow };
