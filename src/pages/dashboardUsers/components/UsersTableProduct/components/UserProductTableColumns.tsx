import { Chip, Typography, Grid, Tooltip } from '@mui/material';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import React, { CSSProperties, ReactNode } from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { PartyUser, PartyUserProduct } from '../../../../../model/PartyUser';
import { ProductRolesLists } from '../../../../../model/ProductRole';
import { Party, UserStatus } from '../../../../../model/Party';
import { Product } from '../../../../../model/Product';
import UserProductRowActions from './UserProductRowActions';

export function buildColumnDefs(
  canEdit: boolean,
  party: Party,
  product: Product,
  onRowClick: (partyUser: PartyUser) => void,
  onDelete: (user: PartyUser) => void,
  onStatusUpdate: (user: PartyUser, nextStatus: UserStatus) => void,
  productRolesLists: ProductRolesLists
) {
  return [
    {
      field: 'fullName',
      cellClassName: 'justifyContentBold',
      headerName: 'NOME',
      align: 'left',
      headerAlign: 'left',
      width: 275,
      editable: false,
      disableColumnMenu: true,
      valueGetter: getFullName,
      renderHeader: showCustmHeader,
      renderCell: (params) => showName(params, product, false, onRowClick),
      sortable: false,
    },
    {
      field: 'email',
      cellClassName: 'justifyContentNormal',
      headerName: 'EMAIL',
      align: 'left',
      headerAlign: 'left',
      width: 293,
      editable: false,
      disableColumnMenu: true,
      renderHeader: showCustmHeader,
      renderCell: (params) => renderCell(params, undefined, onRowClick),
      sortable: false,
    },
    {
      field: 'userRole',
      cellClassName: 'justifyContentBold',
      headerName: 'RUOLI',
      align: 'left',
      headerAlign: 'left',
      width: 250,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => showRoles(params, product, productRolesLists, onRowClick),
      renderHeader: showCustmHeader,
      sortable: false,
    },
    {
      field: 'status',
      cellClassName: 'justifyContentNormalRight',
      headerName: '',
      align: 'center',
      width: 82,
      hideSortIcons: true,
      disableColumnMenu: true,
      editable: false,
      renderCell: (params) => showStatus(params, product, onRowClick),
      sortable: false,
    },
    {
      field: 'azioni',
      cellClassName: 'justifyContentNormalRight',
      headerName: '',
      align: 'right',
      width: 53,
      hideSortIcons: true,
      disableColumnMenu: true,
      editable: false,
      renderCell: (p) =>
        canEdit
          ? showActions(party, product, p, onDelete, onStatusUpdate)
          : renderCell(p, '', onRowClick),
      sortable: false,
    },
  ] as Array<GridColDef>;
}

function renderCell(
  params: GridRenderCellParams,
  value: ReactNode = params.value,
  onRowClick?: (partyUser: PartyUser) => void,
  overrideStyle: CSSProperties = {}
) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        paddingRight: '24px',
        paddingLeft: '24px',
        paddingTop: '-16px',
        paddingBottom: '-16px',
        marginTop: '16px',
        // marginBottom:'16px',
        borderBottom: '1px solid #CCD4DC',
        cursor: 'pointer',
        ...overrideStyle,
      }}
      onClick={onRowClick ? () => onRowClick(params.row) : undefined}
    >
      <div
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as const,
          paddingBottom: '8px',
          width: '100%',
          color: params.row.status === 'SUSPENDED' ? '#9E9E9E' : undefined,
          fontSize: '14px',
        }}
      >
        {value}
      </div>
    </div>
  );
}

function isUserSuspended(user: PartyUser, product: Product): boolean {
  return (
    user.status === 'SUSPENDED' ||
    !user.products.find((p) => p.id === product.id)?.roles?.find((r) => r.status !== 'SUSPENDED')
  );
}

function getFullName(params: GridValueGetterParams) {
  return `${params.row.name} ${params.row.surname} ${params.row.status}`;
}

function showCustmHeader(params: GridColumnHeaderParams) {
  return (
    <React.Fragment>
      <Typography
        color="text.secondary"
        sx={{ fontSize: '14px', fontWeight: '700', outline: 'none', paddingLeft: 1 }}
      >
        {params.colDef.headerName}
      </Typography>
    </React.Fragment>
  );
}

function showName(
  params: GridRenderCellParams,
  product: Product,
  canShowChip: boolean,
  onRowClick: (partyUser: PartyUser) => void
) {
  const isSuspended = isUserSuspended(params.row as PartyUser, product);
  const showChip = canShowChip && isSuspended;
  return (
    <React.Fragment>
      {renderCell(
        params,
        <>
          <Grid container sx={{ width: '100%' }}>
            <Grid item xs={showChip ? 7 : 12} sx={{ width: '100%' }}>
              <Typography variant="h6" color={isSuspended ? '#9E9E9E' : undefined}>
                {params.row.name} {params.row.surname} {params.row.isCurrentUser ? '(tu)' : ''}
              </Typography>
            </Grid>
            {showChip && (
              <Grid
                item
                xs={5}
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <TableChip text="Sospeso" />
              </Grid>
            )}
          </Grid>
        </>,
        onRowClick
      )}
    </React.Fragment>
  );
}

function TableChip({ text }: { text: string }) {
  return (
    <Chip
      label={text}
      sx={{
        fontSize: '16px',
        fontWeight: '600',
        color: '#17324D',
        backgroundColor: '#E0E0E0',
        paddingBottom: '1px',
        height: '24px',
      }}
    />
  );
}

function showRoles(
  params: GridRenderCellParams<PartyUser>,
  product: Product,
  productRolesLists: ProductRolesLists,
  onRowClick: (partyUser: PartyUser) => void
) {
  const isSuspended = isUserSuspended(params.row as PartyUser, product);
  return (
    <React.Fragment>
      {renderCell(
        params,
        <Grid container direction="column">
          {(params.row as PartyUser).products
            .find((p) => p.id === product.id)
            ?.roles?.map(
              (
                r // load just the actual product
              ) => (
                <Grid item key={r.relationshipId}>
                  <Typography
                    color={isSuspended || r.status === 'SUSPENDED' ? '#9E9E9E' : undefined}
                    sx={{ fontSize: '14px', fontWeight: '700', outline: 'none' }}
                  >
                    {productRolesLists.groupByProductRole[r.role]
                      ? productRolesLists.groupByProductRole[r.role].title
                      : r.role}
                  </Typography>
                </Grid>
              )
            )}
        </Grid>,
        onRowClick
      )}
    </React.Fragment>
  );
}

function showStatus(
  params: GridRenderCellParams,
  product: Product,
  onRowClick: (partyUser: PartyUser) => void
) {
  const showChip = isUserSuspended(params.row as PartyUser, product);
  return renderCell(params, <>{showChip && <TableChip text="Sospeso" />}</>, onRowClick, {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center',
  });
}

function showActions(
  party: Party,
  product: Product,
  users: GridRenderCellParams<PartyUser>,
  onDelete: (user: PartyUser) => void,
  onStatusUpdate: (user: PartyUser, nextStatus: UserStatus) => void
) {
  const row = users.row as PartyUser;
  const userProduct = row.products.find((p) => p.id === product.id) as PartyUserProduct;
  return renderCell(
    users,
    row.isCurrentUser || (userProduct?.roles?.length ?? 2) > 1 ? (
      <Tooltip title="Le azioni sono disponibili nel dettaglio del referente">
        <InfoOutlined sx={{ color: '#5C6F82', paddingTop: 1, boxSizing: 'unset' }} />
      </Tooltip>
    ) : (
      <UserProductRowActions
        party={party}
        partyUser={row}
        partyUserProduct={userProduct}
        onDelete={onDelete}
        onStatusUpdate={onStatusUpdate}
      />
    ),
    undefined,
    { paddingLeft: 0, paddingRight: 0, textAlign: 'center' }
  );
}