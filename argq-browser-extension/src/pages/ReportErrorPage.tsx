import { Link } from 'react-router-dom';

function ReportErrorPage() {
    return (
        <>
            <div className="d-flex justify-content-between header-container mb-2">
                <Link to="/" className="back-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                </Link>
                <h5>Reportar erro</h5>
                <span style={{ width: '24px' }}></span> 
            </div>
            <p className="mb-4">Temos o prazer de receber seus comentários! Use o campo abaixo para relatar erros encontrados ou nos fornecer sugestões de melhorias para a extensão.</p>
            <textarea className="form-control mb-4" rows={6} placeholder="Digite seu feedback aqui..."></textarea>
            <button className="btn submit-btn w-100 mb-4">Enviar</button>
        </>
    )
}

export default ReportErrorPage;
