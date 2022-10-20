import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import selectors from 'src/modules/user/view/userViewSelectors';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MDButton from 'src/mui/components/MDButton';

function UserViewToolbar(props) {
  const { match } = props;

  const user = useSelector(selectors.selectUser);
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );

  const id = match.params.id;

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          component={Link}
          to={`/user/${id}/edit`}
          variant="gradient"
          color="purple"
          type="button"
          startIcon={<EditIcon />}
          size="small"
          circular
        >
          {i18n('common.edit')}
        </MDButton>
      )}

      {hasPermissionToAuditLogs && (
        <MDButton
          component={Link}
          to={`/audit-logs?entityId=${encodeURIComponent(
            id,
          )}`}
          color="purple"
          variant="outlined"
          startIcon={<HistoryIcon />}
          size="small"
          circular
        >
          {i18n('auditLog.menu')}
        </MDButton>
      )}

      {user && user.email && hasPermissionToAuditLogs && (
        <MDButton
          component={Link}
          type="button"
          color="purple"
          variant="outlined"
          to={`/audit-logs?createdByEmail=${encodeURIComponent(
            user.email,
          )}`}
          startIcon={<VisibilityIcon />}
          size="small"
          circular
        >
          {i18n('user.view.activity')}
        </MDButton>
      )}
    </ToolbarWrapper>
  );
}

export default UserViewToolbar;
