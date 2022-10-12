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

function collapseItem(theme: Theme, ownerState: any) {
  const {
    palette,
    transitions,
    breakpoints,
    boxShadows,
    borders,
    functions,
  } = theme;
  const { active } = ownerState;

  const { white, transparent, dark, grey } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem, rgba } = functions;

  return {
    background: () => {
      let backgroundValue = active
        ? grey[200]
        : transparent.main;
      return backgroundValue;
    },
    color: dark.main,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: `${pxToRem(8)} ${pxToRem(16)}`,
    margin: `${pxToRem(1.5)} ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    boxShadow: 'none',
    [breakpoints.up('xl')]: {
      transition: transitions.create(
        ['box-shadow', 'background-color'],
        {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.shorter,
        },
      ),
    },

    '&:hover, &:focus': {
      backgroundColor: rgba(grey[400], 0.2),
    },
  };
}

function collapseIconBox(theme: Theme) {
  const { palette, transitions, borders, functions } =
    theme;

  const { white, dark } = palette;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    color: dark.main,
    borderRadius: borderRadius.md,
    display: 'grid',
    placeItems: 'center',
    transition: transitions.create('margin', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    '& svg, svg g, span.MuiIcon-root': {
      color: dark.main,
    },
  };
}

const collapseIcon = (
  { palette: { white, gradients } }: Theme,
  { active }: any,
) => ({
  color: active ? white.main : gradients.dark.state,
});

function collapseText(theme: any, ownerState: any) {
  const {
    typography,
    transitions,
    breakpoints,
    functions,
  } = theme;
  const { active, noCollapse } = ownerState;

  const { size, fontWeightRegular, fontWeightLight } =
    typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(10),

    [breakpoints.up('xl')]: {
      transition: transitions.create(
        ['opacity', 'margin'],
        {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        },
      ),
    },

    '& span': {
      fontWeight: active
        ? fontWeightRegular
        : fontWeightLight,
      fontSize: size.sm,
      lineHeight: '2rem',
      overflow: 'hidden',
      width: noCollapse ? '135px' : '110px',
      display: 'block',
      textOverflow: 'ellipsis',
      textTransform: 'capitalize',
    },
  };
}

function collapseArrow(theme: Theme, ownerState: any) {
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

    // [breakpoints.up('xl')]: {
    display:
      noCollapse || miniSidenav
        ? 'none !important'
        : 'block !important',
    // },
  };
}

export {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
};
