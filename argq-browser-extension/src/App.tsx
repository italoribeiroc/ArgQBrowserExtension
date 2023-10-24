// import { useState } from 'react'
import './App.css'
import argqLogo from './assets/images/argq_logo_gr-escuro.png'
import { Gear, ExclamationCircle, Folder, ChevronRight } from 'react-bootstrap-icons'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const onclick = async () => {
  //   const[tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: () => {
  //       document.body.style.backgroundColor = "red";
  //     }
  //   })
  // }

  return (
    <div className="container" style={{ width: '300px', height: '400px', padding: '20px' }}>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <img src={argqLogo} alt="Arg Q!" style={{ height: '30px' }} />
                <a className="icon-link" href="https://argq.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-help-circle">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                </a>
            </div>

            <p className="text-center mt-2">Obtenha insights poderosos! <br /> Ative a análise de argumentação agora mesmo!</p>

            <button id="classifyTweets" className="btn btn-success btn-block" style={{ marginTop: '16px' }}>Ativar classificação</button>

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
                <a href="./report_error.html" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                        <ExclamationCircle className='icon-spacing'/>
                        Reportar erro
                    </div>
                    <ChevronRight />
                </a>
            </div>

        </div>
  )
}

export default App
