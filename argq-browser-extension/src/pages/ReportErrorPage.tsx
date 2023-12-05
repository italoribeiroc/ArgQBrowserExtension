import { Link } from 'react-router-dom';
import { useState } from 'react';

function ReportErrorPage() {
    const [feedback, setFeedback] = useState<string>('');
    const [resetKey, setResetKey] = useState<number>(0);

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log(feedback);
        setFeedback('');
        setResetKey(prevKey => prevKey + 1);
        alert('Feedback enviado com sucesso!');
    };

    return (
        <>
            <div className="d-flex justify-content-between header-container mb-3">
                <Link to="/" className="back-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                </Link>
                <h5>Reportar erro</h5>
                <span style={{ width: '24px' }}></span> 
            </div>
            <div 
                style={{
                    backgroundColor: 'white', 
                    borderRadius: '10px', 
                    padding: '8px 16px 16px 16px', 
                }}
                className=''
            >
            <p className="mb-4">Temos o prazer de receber seus comentários! Use o campo abaixo para relatar erros encontrados ou nos fornecer sugestões de melhorias para a extensão.</p>
            <textarea key={resetKey} className="form-control mb-4" rows={6} placeholder="Digite seu feedback aqui..." onChange={(e) => setFeedback(e.target.value)}></textarea>
            <button id="feedback-text" onClick={handleSubmit} className="btn submit-btn w-100">Enviar</button>
            </div>
            <br />
        </>
    )
}

export default ReportErrorPage;
