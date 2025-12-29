import React from 'react';
import { alpha, TableCell, TableCellProps } from '@mui/material';

function TableActionCell(props: TableCellProps) {
  return (
    <TableCell
      sx={ t => ({ background: alpha(t.palette.primary.main, 0.05) }) }
      onClick={ e => e.stopPropagation() }
      { ...props }
    />
  );
}

export default TableActionCell;