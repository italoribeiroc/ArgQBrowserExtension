import { useState } from 'react';
import { Link } from 'react-router-dom';

function SettingsPage() {
    const [clareza, setClareza] = useState<boolean>(true);
    const [organizacao, setOrganizacao] = useState<boolean>(true);
    const [credibilidade, setCredibilidade] = useState<boolean>(true);
    const [apeloEmocional, setApeloEmocional] = useState<boolean>(true);

    return (
        <div className="d-flex flex-column" style={{ height: '100%' }}>
            <div className="d-flex justify-content-between header-container mb-3">
                <Link to="/" className="back-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                </Link>
                <h5>Configurações</h5>
                <span style={{ width: '24px' }}></span> 
            </div>
            <div 
                style={{
                    backgroundColor: 'white', 
                    borderRadius: '10px',
                    flex: 1,
                    marginBottom: '16px',
                    padding: '8px 16px 16px 16px', 
                }}
            >
                <div className="criteria-section mb-1">
                    <h6>Critérios a serem exibidos:</h6>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label>Clareza</label>
                        <input className='form-check-input' type="checkbox" checked={clareza} onChange={() => setClareza(!clareza)} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label>Organização</label>
                        <input className='form-check-input' type="checkbox" checked={organizacao} onChange={() => setOrganizacao(!organizacao)} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label>Credibilidade</label>
                        <input className='form-check-input' type="checkbox" checked={credibilidade} onChange={() => setCredibilidade(!credibilidade)} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label>Apelo emocional</label>
                        <input className='form-check-input' type="checkbox" checked={apeloEmocional} onChange={() => setApeloEmocional(!apeloEmocional)} />
                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}

export default SettingsPage;
