chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'sendFeedback') {
        const { email, feedback } = message.data;
        sendFeedback(email, feedback);
    }
});

function sendFeedback(email, feedback) {
    const apiUrl = "https://italoribeiro-argq-api.hf.space";
    fetch(`${apiUrl}/argq/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            text: feedback,
            email: email 
        })
    })
    .then(response => {
        if (response.ok) {
            chrome.runtime.sendMessage({ action: "feedbackSent", success: true });
        } else {
            return response.json().then(data => Promise.reject(data));
        }
    })
    .catch(error => {
        console.error('Erro ao enviar feedback:', error);
        chrome.runtime.sendMessage({ action: "feedbackSent", success: false });
    });
}