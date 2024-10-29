// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CadastroBem from './components/CadastroBem';
import ConsultaBem from './components/ConsultaBem';
import RelatorioBens from './components/RelatorioBens';
import './css/App.css'; 

// Componente Home (Página inicial)
function Home() {
  return (
    <div className="container">
      <h2>Bem-vindo ao Gerenciamento de Bens Patrimoniais</h2>
      <p>Selecione uma das opções acima para navegar.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Gerenciamento de Bens Patrimoniais</h1>
          {/* Links de Navegação */}
          <nav>
            <Link to="/">Home</Link> |{' '}
            <Link to="/cadastro">Cadastro de Bem</Link> |{' '}
            <Link to="/consulta">Consulta de Bem</Link> |{' '}
            <Link to="/relatorio">Relatório de Bens</Link>
          </nav>
        </header>

        {/* Definição de Rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroBem />} />
          <Route path="/consulta" element={<ConsultaBem />} />
          <Route path="/relatorio" element={<RelatorioBens />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
