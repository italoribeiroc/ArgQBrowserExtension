let classifyTweets = document.getElementById('classifyTweets');

classifyTweets.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

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
        console.log(textElement);

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

            console.log('here');
            if (classification != null){
                let button = document.createElement('button');
                button.style.backgroundColor = color;
                button.style.border = 'none';
                button.style.padding = '5px';
                button.style.position = 'absolute';
                button.style.top = '5px';
                button.style.right = '5px';
                button.style.borderRadius = '15%';
                button.textContent = classification;

                button.addEventListener('click', function() {
                    let randomStart = Math.floor(Math.random() * (textLength + 1));
                    let randomEnd = randomStart + Math.floor(Math.random() * (textLength - randomStart + 1));

                    let highlightedText = text.slice(0, randomStart) + '<span style="background-color: yellow;">' + text.slice(randomStart, randomEnd) + '</span>' + text.slice(randomEnd);

                    textElement.innerHTML = highlightedText;
                    console.log('Button clicked!');
                });

                element.appendChild(button);
            }
        }
    });

    chrome.runtime.sendMessage({ message: 'Tweets classified successfully.' });
}