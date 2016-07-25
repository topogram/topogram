import { TableRow, TableRowColumn } from 'material-ui/Table';
import React, { PropTypes } from 'react';

const SmartTableRow = ({ index, row, tableHeaders }) => (
  <TableRow key={index}>
    {tableHeaders.map((header, propIndex) => (
      <TableRowColumn key={propIndex}>hoho</TableRowColumn>
    ))}
  </TableRow>
);

SmartTableRow.propTypes = {
  index: PropTypes.number,
  row: PropTypes.object
};

export default SmartTableRow;
