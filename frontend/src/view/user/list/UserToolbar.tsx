import { Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/list/userListActions';
import selectors from 'src/modules/user/list/userListSelectors';
import userSelectors from 'src/modules/user/userSelectors';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import MDButton from 'src/mui/components/MDButton';

import ConfirmModal from 'src/view/shared/modals/ConfirmModal';

function UserToolbar(props) {
  const dispatch = useDispatch();
  const [
    destroyAllConfirmVisible,
    setDestroyAllConfirmVisible,
  ] = useState(false);

  const hasPermissionToCreate = useSelector(
    userSelectors.selectPermissionToCreate,
  );
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );

  const hasRows = useSelector(selectors.selectHasRows);
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const loading = useSelector(selectors.selectLoading);
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );

  const doOpenDestroyAllConfirmModal = () => {
    setDestroyAllConfirmVisible(true);
  };

  const doCloseDestroyAllConfirmModal = () => {
    setDestroyAllConfirmVisible(false);
  };

  const doExport = () => {
    dispatch(actions.doExport());
  };

  const doDestroyAllSelected = () => {
    doCloseDestroyAllConfirmModal();

    dispatch(actions.doDestroyAllSelected());
  };

  const renderDestroyButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <MDButton
        variant="contained"
        color="purple"
        type="button"
        disabled={disabled}
        onClick={doOpenDestroyAllConfirmModal}
        startIcon={<DeleteIcon />}
        size="small"
        circular
      >
        {i18n('common.destroy')}
      </MDButton>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <ToolbarWrapper>
      {hasPermissionToCreate && (
        <MDButton
          variant="contained"
          color="purple"
          component={Link}
          to="/user/new"
          startIcon={<EmailIcon />}
          size="small"
          circular
        >
          {i18n('user.invite')}
        </MDButton>
      )}

      {renderDestroyButton()}

      {destroyAllConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroyAllSelected()}
          onClose={() => doCloseDestroyAllConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </ToolbarWrapper>
  );
}

export default UserToolbar;
