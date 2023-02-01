import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Balance } from './components/Balance/Balance';
import Table from './components/Table/Table';
import { NewTransaction } from './components/NewTransaction/NewTransaction';
import Modal from 'react-modal';
import { useDatabase } from './context/DatabaseContext';

Modal.setAppElement('#root')

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const { fetch } = useDatabase();

  useEffect(() => {
    fetch({
      schema: 'transactions'
    }).then((result) => {
      if (result && result.length > 0) {
        // result
        setTransactions(result)
      }
    });
  }, [fetch])


  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Navbar />
      <Balance transactions={transactions} />
      <Table onRequestOpen={handleOpenModal} transactions={transactions} />
      <NewTransaction isOpen={isOpen} onRequestClose={handleCloseModal} />
    </div>
  );
}
