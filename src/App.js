import { useContext, useState } from 'react';
import { DatabaseContext } from './context/DatabaseContext'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Balance } from './components/Balance/Balance';
import Table from './components/Table/Table';
import { NewTransaction } from './components/NewTransaction/NewTransaction';
import Modal from 'react-modal';

Modal.setAppElement('#root')

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }


  const { database } = useContext(DatabaseContext);
  console.log(database);

  return (
    <div className="app">
      <Navbar />
      <Balance />
      <Table onRequestOpen={handleOpenModal} />
      <NewTransaction isOpen={isOpen} onRequestClose={handleCloseModal} />
    </div>
  );
}
