import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ReportErrorPage() {
    const [email, setEmail] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [_feedbackSent, setFeedbackSent] = useState(false);
    const [resetKey, setResetKey] = useState<number>(0);

    useEffect(() => {
        const messageListener = (message: any, _sender: any, _sendResponse: any) => {
            if (message.action === "feedbackSent") {
                if (message.success) {
                    alert('Feedback enviado com sucesso!');
                    setFeedbackSent(true);
                    setFeedback('');
                    setEmail('');
                    setResetKey(prevKey => prevKey + 1);
                } else {
                    alert('Ocorreu um erro ao enviar o feedback. Por favor, tente novamente mais tarde.');
                }
            }
        };

        chrome.runtime.onMessage.addListener(messageListener);

        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
        };
    }, []);

    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault();

        chrome.runtime.sendMessage({
            action: 'sendFeedback',
            data: {
                email,
                feedback
            }
        });
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
                <h5>Feedback</h5>
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
            <input type="email" className="form-control mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
            <textarea key={resetKey} className="form-control mb-4" rows={6} placeholder="Digite seu feedback aqui..." onChange={(e) => setFeedback(e.target.value)}></textarea>
            <button id="feedback-text" onClick={handleSubmit} className="btn submit-btn w-100">Enviar</button>
            </div>
            <br />
        </>
    )
}


export default ReportErrorPage;
