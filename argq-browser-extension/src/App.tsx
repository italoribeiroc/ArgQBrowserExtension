// import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ReportErrorPage from './pages/ReportErrorPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
        <div className="container" style={{ width: '300px', height: '400px', padding: '20px' }}>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/report_error" element={<ReportErrorPage />} />
            </Routes>
        </div>
    </Router>
  )
}

export default App
