import React, { useState, useEffect } from 'react';
import '../css/ConsultaBem.css';

function ConsultaBem() {
  const [bens, setBens] = useState([]);
  const [filtros, setFiltros] = useState({
    marca: '',
    modelo: '',
    setor: '',
    tipoEquipamento: '',
    status: '',
  });

  useEffect(() => {
    // Função para buscar os dados dos bens - troque a URL pelo endpoint do seu backend
    const fetchBens = async () => {
      const response = await fetch('http://localhost:5000/bens');
      const data = await response.json();
      setBens(data);
    };

    fetchBens();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const applyFilters = (bem) => {
    return (
      (filtros.marca === '' || bem.marca.includes(filtros.marca)) &&
      (filtros.modelo === '' || bem.modelo.includes(filtros.modelo)) &&
      (filtros.setor === '' || bem.setor === filtros.setor) &&
      (filtros.tipoEquipamento === '' || bem.tipoEquipamento === filtros.tipoEquipamento) &&
      (filtros.status === '' || bem.status === filtros.status)
    );
  };

  return (
    <div className="container">
      <h2>Consulta de Bens Patrimoniais</h2>
      <p>Aqui você pode consultar os bens patrimoniais cadastrados.</p>

      {/* Filtros */}
      <div className="filters">
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={filtros.marca}
            onChange={handleFilterChange}
            placeholder="Filtrar por marca"
          />
        </label>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={filtros.modelo}
            onChange={handleFilterChange}
            placeholder="Filtrar por modelo"
          />
        </label>
        <label>
          Setor:
          <input
            type="text"
            name="setor"
            value={filtros.setor}
            onChange={handleFilterChange}
            placeholder="Filtrar por setor"
          />
        </label>
        <label>
          Tipo:
          <input
            type="text"
            name="tipoEquipamento"
            value={filtros.tipoEquipamento}
            onChange={handleFilterChange}
            placeholder="Filtrar por tipo de equipamento"
          />
        </label>
        <label>
          Status:
          <select name="status" value={filtros.status} onChange={handleFilterChange}>
            <option value="">Todos os itens</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </label>
      </div>

      {/* Tabela de bens patrimoniais */}
      <table>
        <thead>
          <tr>
            <th>Nº de Série</th>
            <th>Descrição do Bem</th>
            <th>Nº de Patrimônio</th>
          </tr>
        </thead>
        <tbody>
          {bens.filter(applyFilters).map((bem) => (
            <tr key={bem._id}>
              <td>{bem.numeroSerie}</td>
              <td>{bem.descricao}</td>
              <td>{bem.numeroPatrimonio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaBem;
