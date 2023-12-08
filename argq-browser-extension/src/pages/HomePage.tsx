import { useRef, MouseEvent } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import { Gear, ExclamationCircle, Folder, ChevronRight } from 'react-bootstrap-icons'
import { useSettings } from '../components/SettingsContext';

function HomePage() {
    const {
        clareza,
        organizacao,
        credibilidade,
        apeloEmocionalPolaridade,
        apeloEmocionalIntensidade,
    } = useSettings();
    console.log(clareza, organizacao, credibilidade, apeloEmocionalPolaridade, apeloEmocionalIntensidade);

    const classifyTweetsRef = useRef<HTMLButtonElement | null>(null);

    const handleClassifyClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

        if (tab.id) {
            chrome.scripting.insertCSS({
                target: {tabId: tab.id},
                files: ['/src/App.css'],
            });

            const settings = {
                clareza,
                organizacao,
                credibilidade,
                apeloEmocionalPolaridade,
                apeloEmocionalIntensidade
            };

            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: classifyTweetsFromPage,
                args: [
                    settings.clareza,
                    settings.organizacao,
                    settings.credibilidade,
                    settings.apeloEmocionalPolaridade,
                    settings.apeloEmocionalIntensidade
                ],
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
                        Feedback
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

function classifyTweetsFromPage(
  clareza: Boolean,
  organizacao: Boolean,
  credibilidade: Boolean,
  apeloEmocionalPolaridade: Boolean,
  apeloEmocionalIntensidade: Boolean
) {
  const apiUrl = "https://italoribeiro-argq-api.hf.space";
  const tweetElements = document.querySelectorAll('article[role="article"]');
  const tweetArray = Array.from(tweetElements);

  tweetArray.forEach((element) => {
    const existingDropdown = element.querySelector('.dropdown');
    if (existingDropdown) {
      existingDropdown.remove();
    }
    const textElement = element.querySelector("div[lang]");

    if (textElement) {
      const text = textElement.textContent
        ? textElement.textContent.trim()
        : "";
      
      fetch(`${apiUrl}/argq/classify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })
        .then((response) => response.json())
        .then((data) => {
          let color = "white";
          let classification = null;

          switch (data.classification) {
            case 2:
              color = "LightGreen";
              classification = "Alta";
              break;
            case 1:
              color = "LightGoldenRodYellow";
              classification = "Média";
              break;
            case 0:
              color = "LightCoral";
              classification = "Baixa";
              break;
          }

          if (classification != null) {
            const dropdown = document.createElement("div");
            dropdown.classList.add("dropdown");
            dropdown.style.position = "static";
            dropdown.style.display = "inline-block";

            const button = document.createElement("button");
            button.classList.add("dropbtn");
            button.style.backgroundColor = color;
            button.style.border = "none";
            button.style.padding = "5px";
            button.style.borderRadius = "15%";
            button.textContent = classification;
            button.style.cursor = "pointer";
            button.addEventListener(
              "mouseover",
              () => (button.style.filter = "brightness(90%)")
            );
            button.addEventListener(
              "mouseout",
              () => (button.style.filter = "brightness(100%)")
            );

            const dropdownContent = document.createElement("div");
            dropdownContent.classList.add("dropdown-content");
            dropdownContent.style.backgroundColor = "#EDF2F9";
            dropdownContent.style.display = "none";
            dropdownContent.style.width = "250px";

            dropdownContent.style.left = "0";
            dropdownContent.style.zIndex = "999999";

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
                    margin-top: 5px; 
                    margin-bottom: 7px; 
                    border-bottom: 1px solid #ccc; 
                }
                .dropdown .dropdown-content div:last-child {
                    border-bottom: none;
                }
                .dropdown .dropdown-content div div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 15%;
                    text-align: center;
                    padding: 2px 5px;
                }
                
            
                .dropdown .dropdown-content {
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
                    border: 1px solid #ccc; 
                }
                
                
                .dropdown .dropdown-content div {
                    border-bottom: 1px solid #e1e8ed; 
                    margin: 8px 0; 
                }
            `;
            document.head.appendChild(styleSheet);

            button.addEventListener("click", () => {
              if (!dropdownContent.hasChildNodes()) {
                const aspects = [];
                if (clareza) aspects.push("clarity");
                if (organizacao) aspects.push("organization");
                if (credibilidade) aspects.push("credibility");
                if (apeloEmocionalPolaridade) aspects.push("emotional_polarity");
                if (apeloEmocionalIntensidade) aspects.push("emotional_intensity");

                fetch(`${apiUrl}/argq/classify/aspects`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    tweet: { text },
                    aspects
                  }),
                })
                  .then((response) => response.json())
                  .then((data: ClassificationResponse) => {
                    const aspectNames: { [key: string]: string } = {
                      quality: "Qualidade geral",
                      clarity: "Clareza",
                      organization: "Organização",
                      credibility: "Credibilidade",
                      emotional_polarity: "Apelo Emocional - Polaridade",
                      emotional_intensity: "Apelo Emocional - Intensidade",
                    };

                    Object.entries(data.classification).forEach(
                      ([aspect, value]) => {
                        let displayValue: string;
                        let backgroundColor: string;

                        if (aspect === "emotional_polarity") {
                          displayValue = ["Negativa", "Neutra", "Positiva"][
                            value
                          ];
                        } else {
                          displayValue = ["Baixa", "Média", "Alta"][value];
                        }

                        backgroundColor = [
                          "LightCoral",
                          "LightGoldenRodYellow",
                          "LightGreen",
                        ][value];

                        const aspectItem = document.createElement("div");
                        aspectItem.style.display = "flex";
                        aspectItem.style.justifyContent = "space-between";
                        aspectItem.style.padding = "2px 10px";

                        const aspectName = document.createElement("span");
                        aspectName.textContent = aspectNames[aspect] || aspect;
                        aspectItem.appendChild(aspectName);

                        const aspectValueButton =
                          document.createElement("button");
                        aspectValueButton.style.backgroundColor =
                          backgroundColor;
                        aspectValueButton.style.borderRadius = "15%";
                        aspectValueButton.style.textAlign = "center";
                        aspectValueButton.textContent = displayValue;
                        aspectValueButton.style.padding = "2px 5px";
                        aspectValueButton.style.border = "none";
                        aspectValueButton.style.cursor = "pointer";
                        aspectValueButton.addEventListener(
                          "mouseover",
                          () => (aspectValueButton.style.filter = "brightness(90%)")
                        );
                        aspectValueButton.addEventListener(
                          "mouseout",
                          () => (aspectValueButton.style.filter = "brightness(100%)")
                        );
                        const aspectTexts: { [key: string]: string } = {
                          clarity: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, clareza...",
                          organization: "Lorem ipsum dolor sit, amet consectetur adipisicing elit, organização...",
                          credibility: "Lorem ipsum dolor sit amet consectetur, credibilidade...",
                          emotional_polarity: "Lorem ipsum dolor, apelo emocional polaridade...",
                          emotional_intensity: "Lorem ipsum dolor sit, apelo emocional intensidade..."
                        };
                        aspectValueButton.addEventListener(
                          "click",
                          function () {
                            const existingInfo = element.querySelector(".info");
                            if (existingInfo) {
                              existingInfo.remove();
                            }

                            const info = document.createElement("div");
                            info.style.backgroundColor = backgroundColor;
                            info.className = "info";
                            info.style.padding = "10px";
                            info.style.paddingRight = "5px";
                            info.style.marginTop = "10px";
                            info.style.position = "relative";
                            info.style.fontFamily = "Roboto, sans-serif";
                            info.textContent = aspectTexts[aspect] || "";

                            const closeButton = document.createElement("button");
                            //closeButton.textContent = "X";
                            closeButton.style.position = "absolute";
                            closeButton.style.top = "0";
                            closeButton.style.right = "0";
                            closeButton.style.border = "none";
                            closeButton.style.background = "none";
                            closeButton.style.cursor = "pointer";
                            closeButton.style.fontSize = "10px";

                            closeButton.innerHTML = `
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                              </svg>
                            `;

                            closeButton.addEventListener("click", function() {
                              info.remove();
                            });
                        
                            info.appendChild(closeButton);
                            
                            const parent = textElement.parentNode as Node;
                            parent.insertBefore(info, textElement.nextSibling);
                          }
                        );
                        aspectItem.appendChild(aspectValueButton);

                        dropdownContent.appendChild(aspectItem);
                      }
                    );
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }

              dropdownContent.style.display =
                dropdownContent.style.display === "block" ? "none" : "block";
            });

            dropdown.appendChild(button);
            dropdown.appendChild(dropdownContent);
            element.appendChild(dropdown);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  chrome.runtime.sendMessage({ message: "Tweets classified successfully." });
}

export default HomePage
