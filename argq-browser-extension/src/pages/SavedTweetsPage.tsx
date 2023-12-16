import { Link } from 'react-router-dom';
import underConstructionsImage from '../assets/images/under_constructions.svg';

function SavedTweetsPage() {

    return (
        <div className="d-flex flex-column" style={{ height: '100%' }}>
            <div className="d-flex justify-content-between header-container mb-3">
                <Link to="/" className="back-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                </Link>
                <h5>Tweets salvos</h5>
                <span style={{ width: '24px' }}></span> 
            </div>
            <div 
                style={{
                    backgroundColor: 'white', 
                    borderRadius: '10px',
                    flex: 1,
                    marginBottom: '16px',
                    padding: '8px 16px 16px 16px', 
                }}
            >
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <h6>Funcionalidade em Desenvolvimento</h6>
                    <p>Esta funcionalidade ainda está sendo desenvolvida e será lançada em breve. Aguarde novidades!</p>
                    <img src={underConstructionsImage} />
                </div>
            </div>
            <br />
        </div>
    )
}

export default SavedTweetsPage;
