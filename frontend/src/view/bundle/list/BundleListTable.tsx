import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import bundleSelectors from 'src/modules/bundle/bundleSelectors';
import destroyActions from 'src/modules/bundle/destroy/bundleDestroyActions';
import actions from 'src/modules/bundle/list/bundleListActions';
import selectors from 'src/modules/bundle/list/bundleListSelectors';
import formSelectors from 'src/modules/bundle/form/bundleFormSelectors';
import DeleteModal from 'src/view/shared/modals/DeleteModal';
import SuccessModal from 'src/view/shared/modals/SuccessModal';
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
  const [bundle, setBundle] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [successModal, setSuccessModal] = useState(true);
  const dispatch = useDispatch();

  const bundles = useSelector(selectors.selectBundles);

  const status = useSelector(selectors.selectStatus);

  const formStatus = useSelector(
    formSelectors.selectStatus,
  );

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
    setSuccessModal(false);
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

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(destroyActions.doDestroy(id));
  };

  return (
    <>
      {!status && (
        <MDBox>
          <Spinner />
        </MDBox>
      )}
      {status && bundles === null && (
        <MDBox>
          <MDTypography align="center">
            {i18n('table.noData')}
          </MDTypography>
        </MDBox>
      )}
      {status &&
        bundles.map((bundle, index) => (
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
            key={index}
          >
            <MDTypography ml={2}>
              {bundle.id + 1}
            </MDTypography>
            <MDBox>
              <MDBox display="flex">
                <Tooltip title={i18n('common.view')}>
                  <IconButton
                    onClick={() => {
                      setBundle(bundle);
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
                      to={`/bundle/${bundle.id}/edit`}
                      disabled
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
                        doOpenDestroyConfirmModal(bundle.id)
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
                          value={bundle.status === 0}
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

      {successModal && formStatus === 'success' && (
        <SuccessModal
          title={i18n('bundle.create.publish')}
          description={i18n('bundle.create.description5')}
          onClose={() => doCloseSuccessModal()}
          okText="Ok, got it!"
        />
      )}

      {viewModal && (
        <ViewModal
          bundle={bundle}
          onClose={() => doCloseViewModal()}
        />
      )}
    </>
  );
}

export default BundleListTable;
