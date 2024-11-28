import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/EdicaoBem.css'; // Crie ou ajuste o CSS para essa tela

function EdicaoBem() {
  const { id } = useParams(); // Obtém o ID da URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descricao: '',
    numeroPatrimonio: '',
    setor: '',
    contaContabil: '',
    numeroSerie: '',
    status: 'ativo',
    usuario: '',
    dataAquisicao: '',
    valorEntrada: '',
    marca: '',
    modelo: '',
    tipoEquipamento: '',
  });

  useEffect(() => {
    // Busca os dados do bem pelo ID
    const fetchBem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bens/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados do bem:', error);
        alert('Erro ao carregar os dados do bem.');
      }
    };

    fetchBem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/bens/${id}`, formData);
      alert('Bem atualizado com sucesso!');
      navigate('/consulta-bens'); // Redireciona para a página de consulta
    } catch (error) {
      console.error('Erro ao atualizar o bem:', error);
      alert('Erro ao atualizar o bem. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <h2>Edição de Bem Patrimonial</h2>
      <form className="edicao-bem-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Número de Patrimônio</label>
            <input
              type="text"
              name="numeroPatrimonio"
              value={formData.numeroPatrimonio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Setor</label>
            <input
              type="text"
              name="setor"
              value={formData.setor}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Conta Contábil</label>
            <input
              type="text"
              name="contaContabil"
              value={formData.contaContabil}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Número de Série</label>
            <input
              type="text"
              name="numeroSerie"
              value={formData.numeroSerie}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Usuário</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Data de Aquisição</label>
            <input
              type="date"
              name="dataAquisicao"
              value={formData.dataAquisicao}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Valor de Entrada</label>
            <input
              type="text"
              name="valorEntrada"
              value={formData.valorEntrada}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Tipo de Equipamento</label>
            <input
              type="text"
              name="tipoEquipamento"
              value={formData.tipoEquipamento}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Salvar Alterações
        </button>
        <button type="button" className="cancel-button" onClick={() => navigate('/consulta-bens')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EdicaoBem;
