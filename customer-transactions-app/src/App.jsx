import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import CustomerTable from './components/CustomerTable';
import TransactionChart from './components/TransactionChart';
import './App.css';

function App() {
  const [data, setData] = useState({ customers: [], transactions: [] });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get('http://localhost:5000/customers');
        const transactionsResponse = await axios.get('http://localhost:5000/transactions');
        setData({
          customers: customersResponse.data,
          transactions: transactionsResponse.data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <Container className="App">
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Transactions
      </Typography>
      <CustomerTable data={data} onCustomerSelect={handleCustomerSelect} />
      {selectedCustomer && (
        <TransactionChart customer={selectedCustomer} transactions={data.transactions} />
      )}
    </Container>
  );
}

export default App;
