import ReactModal from "react-modal";
import closeImg from "../../assets/cancel.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useState } from 'react';
import './NewTransaction.css'
import CurrencyInput from "react-currency-input-field";

export function NewTransaction({ isOpen, onRequestClose }) {

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState();
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposito');

    async function handleSubmit(event) {
        event.preventDefault();
        // await createTransaction({
        //     title,
        //     amount,
        //     category,
        //     type,
        // });

        setTitle('');
        setAmount(0);
        setType('deposito');
        setCategory('');
        onRequestClose();
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <div className="container">
                <div className="transactionForm-header">
                    <h2>Cadastrar transação</h2>
                    <button type="button" onClick={onRequestClose} className="close">
                        <img width='24' height='24' src={closeImg} alt="Fechar modal" className="closeImg" />
                    </button>
                </div>
                <form className="transactionForm" onSubmit={handleSubmit}>

                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        placeholder="Titulo"
                    />

                    <label htmlFor="value">Valor</label>
                    <CurrencyInput
                        id='value'
                        decimalsLimit={2}
                        decimalSeparator=','
                        groupSeparator="."
                        prefix="R$"
                        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                        value={amount}
                        onValueChange={(value) => setAmount(value)}
                        placeholder="Valor"
                    />

                    <div className="options">
                        <label
                            onClick={() => setType('deposito')}
                            className="income category"
                            style={{ background: type === 'deposito' ? 'rgba(53, 204, 149, 0.356)' : 'transparent' }}
                            htmlFor="income">
                            <img src={incomeImg} alt="Entrada" />
                            <span>&ensp;Entrada</span>
                            <input
                                id='income'
                                className="radio"
                                type="radio"
                                name="category"
                                onClick={() => setType('deposito')}
                                checked={type === 'deposito'}
                            />
                        </label>


                        <label
                            onClick={() => setType('saque')}
                            htmlFor="outcome"
                            className="outcome category"
                            style={{ background: type === 'saque' ? '#e52e4d5a' : 'transparent' }}
                        >

                            <img src={outcomeImg} alt="Saída" />
                            <span>Saída</span>
                            <input
                                id='outcome'
                                className="radio"
                                type="radio"
                                name="category"
                                defaultChecked={type === 'saque'}
                            />
                        </label>
                    </div>

                    <label htmlFor="category">Categoria</label>
                    <input
                        id='category'
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                        placeholder="Categoria"
                    />

                    <button type="submit" className="submitButton"> Cadastrar </button>


                </form>
            </div >
        </ReactModal >
    )
}