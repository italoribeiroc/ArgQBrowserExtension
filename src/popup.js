let classifyTweets = document.getElementById('classifyTweets');

classifyTweets.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.insertCSS({
      target: {tabId: tab.id},
      files: ['./style.css'],
    });

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: classifyTweetsFromPage,
    });
});

function classifyTweetsFromPage() {
    let tweetElements = document.querySelectorAll('article[role="article"]');
    let tweetArray = Array.from(tweetElements);
  
    tweetArray.forEach((element) => {
      let textElement = element.querySelector('div[lang]');
  
      if (textElement) {
        let text = textElement.textContent.trim();
        let textLength = text.length;
  
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
          let dropdown = document.createElement('div');
          dropdown.classList.add('dropdown');
          dropdown.style.position = 'relative';
          dropdown.style.display = 'inline-block';
  
          let button = document.createElement('button');
          button.classList.add('dropbtn');
          button.style.backgroundColor = color;
          button.style.border = 'none';
          button.style.padding = '5px';
          button.style.borderRadius = '15%';
          button.textContent = classification;
  
          let dropdownContent = document.createElement('div');
          dropdownContent.classList.add('dropdown-content');
  
          let highlightButton = document.createElement('button');
          highlightButton.textContent = 'Mostrar elementos de clareza';
          highlightButton.style.backgroundColor = '#EDF2F9';
          highlightButton.style.border = 'none';
          highlightButton.style.display = 'none';
  
          highlightButton.addEventListener('click', function () {
            let randomStart = Math.floor(Math.random() * (textLength + 1));
            let randomEnd = randomStart + Math.floor(Math.random() * (textLength - randomStart + 1));
  
            let highlightedText = text.slice(0, randomStart) + '<span style="background-color: LightBlue;" class="tooltip">' + text.slice(randomStart, randomEnd) + '<span class="tooltiptext">Elemento de clareza</span></span>' + text.slice(randomEnd);
  
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