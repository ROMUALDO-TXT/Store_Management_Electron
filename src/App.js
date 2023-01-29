import { useContext } from 'react';
import { DatabaseContext } from './context/DatabaseContext'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Balance } from './components/Balance/Balance';
import Table from './components/Table/Table';

export default function App() {

  const { database } = useContext(DatabaseContext);
  console.log(database);

  return (
    <div className="app">
      <Navbar />
      <Balance />
      <Table />
    </div>
  );
}
