# Arg Q! - Browser Extension

**Classify tweets in the domain of Brazilian politics with a single click!**

🔗 [Leia isto em Português](README.md)

## About

`Arg Q!` is a browser extension designed to provide instant insights into tweets related to Brazilian politics. With just one click, you can get a quick and reliable classification of tweets, making it easier to analyze and understand the political landscape on social media.

## How to Use

To start using the `Arg Q!` extension in your browser, follow the steps below:

1. **Download the Project**  
   Download or clone this repository to your computer.

2. **Setup the Backend (FastAPI)**
   - Navigate to the `backend` folder.
   - Enter a Python virtual environment.
   - Run `make install` to install dependencies.
   - After installation, run `make run` to launch the API.

3. **Setup the Frontend (Vite)**
   - Go to the `argq-browser-extension` folder.
   - Run `npm run build` to package the application.

4. **Load the Extension in the Browser**
   - Open your browser's Extension Manager.
     - For Chromium-based browsers (like Google Chrome or Brave), this is usually found under "More Tools" > "Extensions", or by typing `chrome://extensions/` in the address bar.
   - Enable "Developer Mode", usually located at the top-right corner.
   - Click on "Load Unpacked" and select the `dist` folder generated inside `argq-browser-extension`.

5. **Ready to Use**  
   The `Arg Q!` extension should now appear in your list of extensions and you can start classifying tweets right away!

## Support and Contribution

If you encounter any issues or have suggestions, feel free to open an issue in this repository. Contributions, whether through code improvements, bug fixes, or new features, are always welcome!
