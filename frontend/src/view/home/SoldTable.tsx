import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'src/modules/user/list/userListSelectors';
import actions from 'src/modules/user/list/userListActions';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import { TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Roles from 'src/security/roles';
import MDBox from 'src/mui/components/MDBox';
import DataTableHeadCell from 'src/mui/examples/Tables/DataTable/DataTableHeadCell';
import DataTableBodyCell from 'src/mui/examples/Tables/DataTable/DataTableBodyCell';
import MDTypography from 'src/mui/components/MDTypography';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';

function SoldTable() {
  const dispatch = useDispatch();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);

  const loading = useSelector(selectors.selectLoading);
  const rows = [];
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} width="35%">
                {'Asset'}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="15%">
                {'Time left'}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="25%">
                {'Price'}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {'Buyer Address'}
              </DataTableHeadCell>
            </TableRow>
          </MDBox>
          <TableBody>
            {loading && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <Spinner />
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading && !hasRows && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDTypography>
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell>
                    <img
                      src="/images/bundle.svg"
                      alt={row.email}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.email}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.fullName}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.roles.map((roleId) => (
                      <MDBadgeDot
                        key={roleId}
                        badgeContent={Roles.labelOf(roleId)}
                        variant="contained"
                      />
                    ))}
                  </DataTableBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
          entriesPerPage
          showTotalEntries
        />
      </TableContainer>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default SoldTable;
