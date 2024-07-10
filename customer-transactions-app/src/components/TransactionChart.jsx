import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Paper, Typography } from '@mui/material';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TransactionChart({ customer, transactions }) {
  const customerTransactions = transactions.filter(transaction => transaction.customer_id === customer.id);

  const data = {
    labels: customerTransactions.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Transaction Amount',
        data: customerTransactions.map(transaction => transaction.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  return (
    <Paper style={{ padding: '1rem' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Transaction History for {customer.name}
      </Typography>
      <Bar data={data} />
    </Paper>
  );
}

export default TransactionChart;
