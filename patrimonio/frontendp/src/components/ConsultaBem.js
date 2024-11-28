import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    // Função para buscar os dados dos bens
    const fetchBens = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bens'); // Atualize com o endpoint do backend
        setBens(response.data); // Atualiza o estado com os bens recebidos
      } catch (error) {
        console.error('Erro ao buscar bens:', error);
        alert('Erro ao buscar os bens. Tente novamente.');
      }
    };

    fetchBens();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const applyFilters = (bem) => {
    return (
      (filtros.marca === '' || bem.marca?.includes(filtros.marca)) &&
      (filtros.modelo === '' || bem.modelo?.includes(filtros.modelo)) &&
      (filtros.setor === '' || bem.setor === filtros.setor) &&
      (filtros.tipoEquipamento === '' || bem.tipoEquipamento === filtros.tipoEquipamento) &&
      (filtros.status === '' || bem.status === filtros.status)
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este bem?')) {
      try {
        await axios.delete(`http://localhost:5000/bens/${id}`);
        setBens(bens.filter((bem) => bem._id !== id)); // Remove o bem localmente
        alert('Bem excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir bem:', error);
        alert('Erro ao excluir o bem. Tente novamente.');
      }
    }
  };

  const handleEdit = (id) => {
    // Navegar ou abrir modal para edição (exemplo com redirecionamento)
    window.location.href = `/editar-bem/${id}`;
  };

  return (
    <div className="container">
      <h2>Consulta de Bens Patrimoniais</h2>
      <p>Aqui você pode consultar, editar e excluir os bens patrimoniais cadastrados.</p>

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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {bens.filter(applyFilters).map((bem) => (
            <tr key={bem._id}>
              <td>{bem.numeroSerie || 'N/A'}</td>
              <td>{bem.descricao || 'N/A'}</td>
              <td>{bem.numeroPatrimonio || 'N/A'}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(bem._id)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(bem._id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaBem;
