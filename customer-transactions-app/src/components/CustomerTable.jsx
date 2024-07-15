import React, { useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

function CustomerTable({ data, onCustomerSelect }) {
  const [filter, setFilter] = useState('');

  const filteredCustomers = data.customers.filter(customer =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Paper style={{ marginBottom: '2rem', padding: '1rem' }}>
      <TextField
        fullWidth
        label="Filter by customer name"
        variant="outlined"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Transaction Date</TableCell>
            <TableCell>Transaction Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCustomers.map(customer => {
            const customerTransactions = data.transactions.filter(transaction => transaction.customer_id === customer.id);
            return customerTransactions.map(transaction => (
              <TableRow key={transaction.id} onClick={() => onCustomerSelect(customer)} style={{ cursor: 'pointer' }}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default CustomerTable;