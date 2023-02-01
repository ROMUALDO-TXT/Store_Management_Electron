import './Balance.css'
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"

export function Balance({ transactions }) {

    const summary = {
        deposits: 0,
        withdraws: 0,
    };



    transactions.forEach((transaction) => {
        let transactionDate = new Date(transaction.data.date);
        if (Number(localStorage.getItem('month')) === Number(transactionDate.getMonth())) {
            if (transaction.data.type === 'deposito') {
                summary.deposits += Number(convert(transaction.data.amount))
            } else if (transaction.data.type === 'saque') {
                summary.withdraws += Number(convert(transaction.data.amount))
            }
        }
    })

    function convert(data) {
        let datas = data.split(',');
        if (datas[1])
            return datas[0] + '.' + datas[1];
        else
            return datas[0];
    }

    return (
        <div className="balance">
            <div className='normal'>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong> {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(summary.deposits)}</strong>
            </div>
            <div className='normal'>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>
                <strong>-  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(summary.withdraws)}</strong>
            </div>
            <div className='normal' style={{ background: summary.deposits - summary.withdraws >= 0 ? '#33cc95' : '#e52e4d' }}>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong> {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(summary.deposits - summary.withdraws)}</strong>
            </div>
        </div>
    );
}