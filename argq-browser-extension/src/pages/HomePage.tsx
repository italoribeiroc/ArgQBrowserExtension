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
                files: ['../App.css'],
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
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                        <Gear className='icon-spacing'/>
                        Configurações
                    </div>
                    <ChevronRight />
                </a>
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

function classifyTweetsFromPage() {
    const tweetElements = document.querySelectorAll('article[role="article"]');
    const tweetArray = Array.from(tweetElements);
  
    tweetArray.forEach((element) => {
      const textElement = element.querySelector('div[lang]');
  
      if (textElement) {
        const text = textElement.textContent ? textElement.textContent.trim() : '';
        const textLength = text.length;
  
        let color = 'white';
        let classification = null;
  
        if (textLength <= 30) {
          color = 'LightGreen';
          classification = 'Alta';
        } else if (textLength > 30 && textLength <= 100) {
          color = 'LightGoldenRodYellow';
          classification = 'Média';
        } else if (textLength > 100) {
          color = 'LightCoral';
          classification = 'Baixa';
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
  
          const highlightButton = document.createElement('button');
          highlightButton.textContent = 'Mostrar elementos de clareza';
          highlightButton.style.backgroundColor = '#EDF2F9';
          highlightButton.style.border = 'none';
          highlightButton.style.display = 'none';
  
          highlightButton.addEventListener('click', function () {
            const randomStart = Math.floor(Math.random() * (textLength + 1));
            const randomEnd = randomStart + Math.floor(Math.random() * (textLength - randomStart + 1));
  
            const highlightedText = text.slice(0, randomStart) + '<span style="background-color: LightBlue;" class="tooltip">' + text.slice(randomStart, randomEnd) + '<span class="tooltiptext">Elemento de clareza</span></span>' + text.slice(randomEnd);
  
            textElement.innerHTML = highlightedText;
            console.log('Button clicked!');
          });
  
          let isHighlightVisible = false;
  
          button.addEventListener('click', function () {
            if (isHighlightVisible) {
              highlightButton.style.display = 'none';
              isHighlightVisible = false;
            } else {
              highlightButton.style.display = 'block';
              isHighlightVisible = true;
            }
          });
  
          dropdownContent.appendChild(highlightButton);
          dropdown.appendChild(button);
          dropdown.appendChild(dropdownContent);
          element.appendChild(dropdown);
        }
      }
    });
  
    chrome.runtime.sendMessage({ message: 'Tweets classified successfully.' });
}

export default HomePage
