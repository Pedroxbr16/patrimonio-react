import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function RelatorioBens() {
  const [bens] = useState([
    { numeroSerie: '12345', descricao: 'Notebook', numeroPatrimonio: '001', marca: 'Dell', modelo: 'Inspiron', setor: 'TI', tipoEquipamento: 'Computador', status: 'Ativo' },
    { numeroSerie: '67890', descricao: 'Monitor', numeroPatrimonio: '002', marca: 'LG', modelo: 'UltraWide', setor: 'Administração', tipoEquipamento: 'Monitor', status: 'Inativo' },
    // Adicione mais itens aqui para simular dados
  ]);

  const [filtros, setFiltros] = useState({
    marca: '',
    modelo: '',
    setor: '',
    tipoEquipamento: '',
    status: '',
  });

  // Função para alterar os filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  // Função para aplicar os filtros
  const applyFilters = (bem) => {
    return (
      (filtros.marca === '' || bem.marca.includes(filtros.marca)) &&
      (filtros.modelo === '' || bem.modelo.includes(filtros.modelo)) &&
      (filtros.setor === '' || bem.setor.includes(filtros.setor)) &&
      (filtros.tipoEquipamento === '' || bem.tipoEquipamento.includes(filtros.tipoEquipamento)) &&
      (filtros.status === '' || bem.status === filtros.status)
    );
  };

  // Função para exportar o relatório para PDF
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Bens Patrimoniais', 20, 10);
    doc.autoTable({
      startY: 20,
      head: [['Nº de Série', 'Descrição do Bem', 'Nº de Patrimônio', 'Marca', 'Modelo', 'Setor', 'Tipo do Equipamento', 'Status']],
      body: bens.filter(applyFilters).map(bem => [
        bem.numeroSerie,
        bem.descricao,
        bem.numeroPatrimonio,
        bem.marca,
        bem.modelo,
        bem.setor,
        bem.tipoEquipamento,
        bem.status,
      ]),
    });
    doc.save('relatorio_bens.pdf');
  };

  return (
    <div className="container">
      <h2>Relatório de Bens Patrimoniais</h2>
      <p>Aqui você pode visualizar e exportar o relatório dos bens patrimoniais.</p>

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
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
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
            <th>Marca</th>
            <th>Modelo</th>
            <th>Setor</th>
            <th>Tipo do Equipamento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bens.filter(applyFilters).map((bem, index) => (
            <tr key={index}>
              <td>{bem.numeroSerie}</td>
              <td>{bem.descricao}</td>
              <td>{bem.numeroPatrimonio}</td>
              <td>{bem.marca}</td>
              <td>{bem.modelo}</td>
              <td>{bem.setor}</td>
              <td>{bem.tipoEquipamento}</td>
              <td>{bem.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botão para exportar relatório */}
      <button onClick={exportarPDF} className="export-btn">Exportar para PDF</button>
    </div>
  );
}

export default RelatorioBens;
