import { Link } from 'react-router-dom';
import { useState } from 'react';

function ReportErrorPage() {
    const [email, setEmail] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [resetKey] = useState<number>(0);

    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault();

        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        if (tab.id) {
            const settings = {
                email,
                feedback
            };
    
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: sendFeedback,
                args: [
                    settings.email,
                    settings.feedback
                ],
            });
        }
        

        // setFeedback('');
        // setEmail('');
        // setResetKey(prevKey => prevKey + 1);

        // try {
        //     console.log(email)
        //     const response = await fetch('https://italoribeiro-argq-api.hf.space/argq/feedback', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ text: feedback })
        //     });
        
        //     if (!response.ok) {
        //         alert(`Error: ${response.status}`);
        //     }
        //     setFeedback('');
        //     setEmail('');
        //     setResetKey(prevKey => prevKey + 1);
        //     alert('Feedback enviado com sucesso!');
        // } catch (error) {
        //     console.log(error)
        //     alert(`Error: ${error}`);
        // }
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
            <input key={resetKey} type="email" className="form-control mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
            <textarea key={resetKey} className="form-control mb-4" rows={6} placeholder="Digite seu feedback aqui..." onChange={(e) => setFeedback(e.target.value)}></textarea>
            <button id="feedback-text" onClick={handleSubmit} className="btn submit-btn w-100">Enviar</button>
            </div>
            <br />
        </>
    )
}

function sendFeedback(email: string, feedback: string) {
    const apiUrl = "https://italoribeiro-argq-api.hf.space";
    fetch(`${apiUrl}/argq/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            text: feedback, // Ajuste conforme a expectativa da API
            email: email 
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Feedback enviado com sucesso!');
        } else {
            return response.json().then(data => Promise.reject(data));
        }
    })
    .catch(error => {
        console.error('Erro ao enviar feedback:', error);
        alert('Erro ao enviar feedback: ' + (error.detail || 'Detalhe do erro não disponível'));
    });
}


export default ReportErrorPage;
