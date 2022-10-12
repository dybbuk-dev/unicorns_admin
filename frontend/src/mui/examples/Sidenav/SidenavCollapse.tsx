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

import { ReactNode } from 'react';

// @mui material components
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
} from 'src/mui/examples/Sidenav/styles/sidenavCollapse';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

// Declaring props types for SidenavCollapse
interface Props {
  icon: ReactNode;
  name: string;
  children?: ReactNode;
  active?: Boolean;
  noCollapse?: Boolean;
  open?: Boolean;
  [key: string]: any;
}

function SidenavCollapse({
  icon,
  name,
  children,
  active,
  noCollapse,
  open,
  ...rest
}: Props): JSX.Element {
  const { miniSidenav } = selectMuiSettings();

  return (
    <>
      <ListItem component="li">
        <MDBox
          {...rest}
          sx={(theme: any) =>
            collapseItem(theme, {
              active,
            })
          }
        >
          <ListItemIcon
            sx={(theme) => collapseIconBox(theme)}
          >
            {typeof icon === 'string' ? (
              <Icon
                sx={(theme) =>
                  collapseIcon(theme, { active })
                }
              >
                {icon}
              </Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                active,
                noCollapse,
              })
            }
          />

          <Icon
            sx={(theme) =>
              collapseArrow(theme, {
                noCollapse,
                miniSidenav,
                open,
                active,
              })
            }
          >
            expand_less
          </Icon>
        </MDBox>
      </ListItem>
      {children && (
        <Collapse in={Boolean(open)} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Declaring default props for SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
  noCollapse: false,
  children: false,
  open: false,
};

export default SidenavCollapse;
