// import { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import { Gear, ExclamationCircle, Folder, ChevronRight } from 'react-bootstrap-icons'

function HomePage() {
  return (
    <>
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

export default HomePage
