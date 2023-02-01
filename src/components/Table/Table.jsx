import './Table.css'
import cancel from '../../assets/cancel.svg';
import plus from '../../assets/plus.svg';
import { useDatabase } from '../../context/DatabaseContext';

export default function Table({ onRequestOpen, transactions }) {
    const { exclude } = useDatabase();

    function format(data) {
        let value = ''
        if (data.type === 'saque') {
            value += '- R$ '
        } else {
            value += '+ R$ '
        }
        let splitted = data.amount.split(',');
        if (splitted[1]) {
            value += splitted[0] + ',';
            if (splitted[1].length === 0) {
                value += '00';
            } else if (splitted[1].length === 1) {
                value += splitted[1] + '0';
            } else {
                value += splitted[1];
            }
        } else {
            value += splitted[0] + ',00'
        }
        return value;
    }

    return (
        <div className='table-component'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th className='add-th '><button className='add' onClick={onRequestOpen}> <img className='add-icon' width="24px" height="24px" alt='adicionar' src={plus} />&nbsp;Novo</button></th>
                    </tr>
                </thead>
                <tbody className='body'>
                    {transactions.map(transaction => {
                        return (
                            <tr key={transaction._id}>
                                <td>{transaction.data.title}</td>
                                <td className={transaction.data.type}>
                                    {format(transaction.data)}
                                </td>
                                <td>{transaction.data.category}</td>
                                <td>{new Intl.DateTimeFormat('pt-BR')
                                    .format(transaction.data.date ? new Date(transaction.data.date) : new Date(transaction.createdAt))}
                                </td>
                                <td className='delete-td'>
                                    <button className="delete" onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        exclude({ schema: 'transactions', data: { id: transaction._id } }).then(() => window.location.reload());
                                    }}> <img className='delete-icon' width="24px" height="24px" alt='delete' src={cancel} />
                                        &nbsp; Deletar</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}