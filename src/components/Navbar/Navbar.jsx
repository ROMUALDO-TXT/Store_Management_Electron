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
        </div >
    )
}

export default Navbar;