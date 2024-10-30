// src/components/CadastroBem.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/CadastroBem.css'; // Importa o CSS específico para o formulário

function CadastroBem() {
  const [formData, setFormData] = useState({
    descricao: '',
    numeroPatrimonio: '',
    setor: '',
    contaContabil: '',
    numeroSerie: '',
    status: 'ativo',
    usuario: '',
    dataAquisicao: '',
    valorEntrada: ''
  });

  // Função para formatar o valor de entrada como moeda
  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, ''); // Remove tudo que não é número
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue / 100);
    return formattedValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Formatação para o campo Valor de Entrada
    if (name === "valorEntrada") {
      setFormData({ ...formData, [name]: formatCurrency(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/bens/', {
        ...formData,
        numeroPatrimonio: `CGE${formData.numeroPatrimonio}`, // Adiciona o prefixo ao enviar
      });
      alert('Bem cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar o bem:', error);
    }
  };

  return (
    <form className="cadastro-bem-form" onSubmit={handleSubmit}>
      <h2>Cadastro de Bem Patrimonial</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Número de Patrimônio</label>
          <div className="input-prefix">
            <span className="prefix">CGE -</span>
            <input
              type="text"
              name="numeroPatrimonio"
              placeholder="Número de Patrimônio"
              value={formData.numeroPatrimonio}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Setor/Subunidade</label>
          <input
            type="text"
            name="setor"
            placeholder="Setor/Subunidade"
            value={formData.setor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Conta Contábil</label>
          <input
            type="text"
            name="contaContabil"
            placeholder="Conta Contábil"
            value={formData.contaContabil}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Número de Série</label>
          <input
            type="text"
            name="numeroSerie"
            placeholder="Número de Série"
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
          <label>Usuário (caso notebook)</label>
          <input
            type="text"
            name="usuario"
            placeholder="Usuário (caso notebook)"
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
            placeholder="Valor de Entrada"
            value={formData.valorEntrada}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="submit-button">Cadastrar Bem</button>
    </form>
  );
}

export default CadastroBem;
