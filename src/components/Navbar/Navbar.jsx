import React from 'react';
import logo from '../../assets/logo_mimos.png';
import './Navbar.css';

function Navbar() {

    return (
        <div className='Navbar'>
            <div className='navbar-menu'>
                <div className="navbar--logo">
                    <img className='logo' src={logo} alt='' />
                </div>
                <div className='navbar-title'>
                    <h1> Gerenciamento de caixa </h1>
                </div>

            </div>
            <div className='button-menu'>
                <label className='month-select-label' htmlFor='month-select'>
                    Mês:
                </label>
                <select
                    id='month-select'
                    className='month-select'
                    value={localStorage.getItem("month")}
                    onChange={(e) => {
                        localStorage.setItem("month", e.target.value);
                        window.location.reload();
                    }}
                >
                    <option value='0'>Janeiro</option>
                    <option value='1'>Fevereiro</option>
                    <option value='2'>Março</option>
                    <option value='3'>Abril</option>
                    <option value='4'>Maio</option>
                    <option value='5'>Junho</option>
                    <option value='6'>Julho</option>
                    <option value='7'>Agosto</option>
                    <option value='8'>Setembro</option>
                    <option value='9'>Outubro</option>
                    <option value='10'>Novembro</option>
                    <option value='11'>Dezembro</option>
                </select>
            </div>
        </div >
    )
}

export default Navbar;