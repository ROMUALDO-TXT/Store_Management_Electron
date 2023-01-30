import './Table.css'
import cancel from '../../assets/cancel.svg';
import plus from '../../assets/plus.svg';


export default function Table({ onRequestOpen }) {

    const transactions = [{
        id: 1,
        title: 'titulo',
        type: 'deposito',
        amount: 2,
        category: 'conta',
        createdAt: new Date(),
    }]


    return (
        <div className='table-component'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th className='add-th'><button className='add' onClick={onRequestOpen}> <img className='add-icon' width="24px" height="24px" alt='adicionar' src={plus} />&nbsp;Novo</button></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => {
                        return (
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>
                                <td className={transaction.type}>
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(transaction.amount)}
                                </td>
                                <td>{transaction.category}</td>
                                <td>{new Intl.DateTimeFormat('pt-BR')
                                    .format(new Date(transaction.createdAt))}
                                </td>
                                <td className='delete-td'>
                                    <button className="delete" onClick="delete"> <img className='delete-icon' width="24px" height="24px" alt='delete' src={cancel} />&nbsp; Deletar</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}