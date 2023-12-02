import { useRef, MouseEvent } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import { Gear, ExclamationCircle, Folder, ChevronRight } from 'react-bootstrap-icons'

function HomePage() {
    const classifyTweetsRef = useRef<HTMLButtonElement | null>(null);

    const handleClassifyClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

        if (tab.id) {
            chrome.scripting.insertCSS({
                target: {tabId: tab.id},
                files: ['/src/App.css'],
            });

            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: classifyTweetsFromPage,
            });
        }
    };

    return (
        <>
            <p className="text-center mt-2">Obtenha insights poderosos! <br /> Ative a análise de argumentação agora mesmo!</p>

            <button 
                id="classifyTweets"
                ref={classifyTweetsRef}
                onClick={handleClassifyClick}
                className="btn btn-success btn-block" 
                style={{ marginTop: '16px' }}>
                    Ativar classificação
            </button>

            <div className="list-group mt-4">
                <Link to="/settings" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                        <Gear className='icon-spacing'/>
                        Configurações
                    </div>
                    <ChevronRight />
                </Link>
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                        <Folder className='icon-spacing'/>
                        Tweets salvos
                    </div>
                    <ChevronRight />
                </a>
                <Link to="/report_error" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                        <ExclamationCircle className='icon-spacing'/>
                        Reportar erro
                    </div>
                    <ChevronRight />
                </Link>
            </div>

        </>
    )
}

interface ClassificationResponse {
  classification: {
      quality: number;
      clarity: number;
      organization: number;
      credibility: number;
      emotional_polarity: number;
      emotional_intensity: number;
  };
}

function classifyTweetsFromPage() {
    const tweetElements = document.querySelectorAll('article[role="article"]');
    const tweetArray = Array.from(tweetElements);

  
    tweetArray.forEach((element) => {
      const textElement = element.querySelector('div[lang]');
  
      if (textElement) {
        const text = textElement.textContent ? textElement.textContent.trim() : '';
        fetch('http://127.0.0.1:8000/argq/classify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        })
        .then((response) => response.json())
        .then(data => {
          let color = 'white';
          let classification = null;
    
          switch (data.classification) {
            case 2:
                color = 'LightGreen';
                classification = 'Alta';
                break;
            case 1:
                color = 'LightGoldenRodYellow';
                classification = 'Média';
                break;
            case 0:
                color = 'LightCoral';
                classification = 'Baixa';
                break;
          }
    
          if (classification != null) {
            const dropdown = document.createElement('div');
            dropdown.classList.add('dropdown');
            dropdown.style.position = 'relative';
            dropdown.style.display = 'inline-block';
    
            const button = document.createElement('button');
            button.classList.add('dropbtn');
            button.style.backgroundColor = color;
            button.style.border = 'none';
            button.style.padding = '5px';
            button.style.borderRadius = '15%';
            button.textContent = classification;
    
            const dropdownContent = document.createElement('div');
            dropdownContent.classList.add('dropdown-content');
            dropdownContent.style.backgroundColor = '#EDF2F9';
            dropdownContent.style.display = 'none';
            dropdownContent.style.width = '250px';
            dropdownContent.style.position = 'absolute';
            dropdownContent.style.right = '0';
            dropdownContent.style.zIndex = '9999';
            dropdownContent.style.position = 'fixed';

            const styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = `
                .dropdown, .dropdown * {
                    font-family: 'Roboto', sans-serif !important;
                }
                .dropdown .dropdown-content div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 5px 10px;
                    margin-top: 5px; // Margem no topo
                    margin-bottom: 5px; // Margem na base
                    border-bottom: 1px solid #ccc; // Linha separadora
                }
                .dropdown .dropdown-content div:last-child {
                    border-bottom: none; // Remove a borda do último item
                }
                .dropdown .dropdown-content div div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 15%;
                    text-align: center;
                    padding: 2px 5px;
                }
                .dropdown .dropbtn {
                    position: relative; // Posicionando o botão para estabelecer um novo contexto de empilhamento
                    z-index: 2;
                }
            
                .dropdown .dropdown-content {
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1); // Sombra leve para não dominar o design do Twitter
                    border: 1px solid #ccc; // Borda sutil para o dropdown
                    z-index: 9999; // Garantindo que o dropdown esteja em um nível alto
                }
                
                // Adicionando borda e separação dos itens do dropdown
                .dropdown .dropdown-content div {
                    border-bottom: 1px solid #e1e8ed; // Cor da borda alinhada com o esquema de cores do Twitter
                    margin: 8px 0; // Margem para separar os itens do dropdown
                }
            `;
            document.head.appendChild(styleSheet);

            button.addEventListener('click', () => {
                if (!dropdownContent.hasChildNodes()) {
                    fetch('http://127.0.0.1:8000/argq/classify/aspects', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ tweet: { text } }),
                    })
                    .then((response) => response.json())
                    .then((data: ClassificationResponse) => {
                        const aspectNames: { [key: string]: string } = {
                            quality: 'Qualidade geral',
                            clarity: 'Clareza',
                            organization: 'Organização',
                            credibility: 'Credibilidade',
                            emotional_polarity: 'Apelo Emocional - Polaridade',
                            emotional_intensity: 'Apelo Emocional - Intensidade'
                        };

                        Object.entries(data.classification).forEach(([aspect, value]) => {
                            let displayValue: string;
                            let backgroundColor: string;

                            if (aspect === 'emotional_polarity') {
                                displayValue = ['Negativa', 'Neutra', 'Positiva'][value];
                            } else {
                                displayValue = ['Baixa', 'Média', 'Alta'][value];
                            }

                            backgroundColor = ['LightCoral', 'LightGoldenRodYellow', 'LightGreen'][value];

                            const aspectItem = document.createElement('div');
                            aspectItem.style.display = 'flex';
                            aspectItem.style.justifyContent = 'space-between';
                            aspectItem.style.padding = '2px 10px';

                            const aspectName = document.createElement('span');
                            aspectName.textContent = aspectNames[aspect] || aspect;
                            aspectItem.appendChild(aspectName);

                            const aspectValue = document.createElement('div');
                            aspectValue.style.backgroundColor = backgroundColor;
                            aspectValue.style.borderRadius = '15%';
                            aspectValue.style.textAlign = 'center'
                            aspectValue.textContent = displayValue;
                            aspectValue.style.padding = '2px 5px';
                            aspectItem.appendChild(aspectValue);

                            dropdownContent.appendChild(aspectItem);
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }

                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });

            dropdown.appendChild(button);
            dropdown.appendChild(dropdownContent);
            element.appendChild(dropdown);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    });
  
    chrome.runtime.sendMessage({ message: 'Tweets classified successfully.' });
}

export default HomePage
