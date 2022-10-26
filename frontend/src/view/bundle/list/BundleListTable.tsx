import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import bundleSelectors from 'src/modules/bundle/bundleSelectors';
import destroyActions from 'src/modules/bundle/destroy/bundleDestroyActions';
import destroySelectors from 'src/modules/bundle/destroy/bundleDestroySelectors';
import actions from 'src/modules/bundle/list/bundleListActions';
import selectors from 'src/modules/bundle/list/bundleListSelectors';
import formSelectors from 'src/modules/bundle/form/bundleFormSelectors';
import DeleteModal from 'src/view/shared/modals/DeleteModal';
import SuccessModal from 'src/view/shared/modals/SuccessModal';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ViewModal from 'src/view/bundle/view/ViewModal';

function BundleListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const [bundleId, setBundleId] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [status, setStatus] = match.params.status
    ? useState(match.params.status)
    : useState(null);

  const findLoading = useSelector(selectors.selectLoading);

  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);

  const formStatus = useSelector(
    formSelectors.selectStatus,
  );
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const hasPermissionToEdit = useSelector(
    bundleSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    bundleSelectors.selectPermissionToDestroy,
  );

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line
  }, [dispatch]);

  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };

  const doCloseSuccessModal = () => {
    setStatus(null);
  };

  const doCloseViewModal = () => {
    setViewModal(false);
  };

  const form = useForm({
    mode: 'onSubmit',
  });

  const activeBundle = (values) => {
    return;
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(destroyActions.doDestroy(id));
  };

  return (
    <>
      {loading && (
        <MDBox>
          <Spinner />
        </MDBox>
      )}
      {!loading && !hasRows && (
        <MDBox>
          <MDTypography align="center">
            {i18n('table.noData')}
          </MDTypography>
        </MDBox>
      )}
      {!loading &&
        rows.map((row) => (
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={1}
            mb={2}
            border={1}
            borderColor="grey.200"
            borderRadius="10px"
            key={row.id}
          >
            <MDTypography ml={2}>{row.name}</MDTypography>
            <MDBox>
              <MDBox display="flex">
                <Tooltip title={i18n('common.view')}>
                  <IconButton
                    onClick={() => {
                      setBundleId(row.id);
                      setViewModal(true);
                    }}
                    color="success"
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
                {hasPermissionToEdit && (
                  <Tooltip title={i18n('common.edit')}>
                    <IconButton
                      color="success"
                      component={Link}
                      to={`/bundle/${row.id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {hasPermissionToDestroy && (
                  <Tooltip title={i18n('common.destroy')}>
                    <IconButton
                      color="success"
                      onClick={() =>
                        doOpenDestroyConfirmModal(row.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <FormWrapper>
                  <FormProvider {...form}>
                    <form
                      onSubmit={form.handleSubmit(
                        activeBundle,
                      )}
                    >
                      <MDBox ml={2}>
                        <SwitchFormItem
                          name="active"
                          label=""
                          value
                          color="success"
                        />
                      </MDBox>
                    </form>
                  </FormProvider>
                </FormWrapper>
              </MDBox>
            </MDBox>
          </MDBox>
        ))}

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
        showTotalEntries
      />

      {recordIdToDestroy && (
        <DeleteModal
          title={i18n('bundle.destroy.title')}
          description={i18n('bundle.destroy.description')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          cancelText={i18n('common.cancel')}
          okText="Yeah, delete"
        />
      )}

      {status === 'success' && formStatus === 'success' && (
        <SuccessModal
          title={i18n('bundle.create.publish')}
          description={i18n('bundle.create.description5')}
          onClose={() => doCloseSuccessModal()}
          okText="Ok, got it!"
        />
      )}

      {viewModal && (
        <ViewModal
          bundleId={bundleId}
          onClose={() => doCloseViewModal()}
        />
      )}
    </>
  );
}

export default BundleListTable;
