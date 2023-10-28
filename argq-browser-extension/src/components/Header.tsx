import React from 'react';
import argqLogo from '../assets/images/argq_logo_gr-escuro.png';

const Header: React.FC = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
        <img src={argqLogo} alt="Arg Q!" style={{ height: '30px' }} />
        <a className="icon-link" href="https://argq.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-help-circle">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
        </a>
    </div>
  );
}

export default Header;

