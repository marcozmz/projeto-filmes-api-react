import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// Estados possíveis: 'busca' | 'encontrado' | 'nao_encontrado'

export default function Alterar() {
  const navigate = useNavigate();
  const [idBusca, setIdBusca] = useState('');
  const [estado, setEstado] = useState('busca');
  const [form, setForm] = useState({ nome: '', genero: '', ano: '' });
  const [loadingBusca, setLoadingBusca] = useState(false);
  const [loadingAlterar, setLoadingAlterar] = useState(false);
  const [erro, setErro] = useState('');
  const [idEncontrado, setIdEncontrado] = useState('');

  async function handleProcurar() {
    if (!idBusca.trim()) return;
    setLoadingBusca(true);
    setErro('');
    try {
      const res = await api.get(`/${idBusca.trim()}`);
      const filme = res.data;
      setForm({ nome: filme.nome, genero: filme.genero, ano: filme.ano });
      setIdEncontrado(filme.id);
      setEstado('encontrado');
    } catch {
      setEstado('nao_encontrado');
    } finally {
      setLoadingBusca(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAlterar() {
    if (!form.nome || !form.genero || !form.ano) {
      setErro('Preencha todos os campos.');
      return;
    }
    setLoadingAlterar(true);
    setErro('');
    try {
      await api.put(`/${idEncontrado}`, form);
      navigate('/');
    } catch {
      setErro('Erro ao alterar filme. Tente novamente.');
    } finally {
      setLoadingAlterar(false);
    }
  }

  function resetar() {
    setEstado('busca');
    setIdBusca('');
    setErro('');
  }

  /* ── RENDERIZAÇÃO CONDICIONAL ── */

  // Estado: BUSCA
  if (estado === 'busca') {
    return (
      <div className="container">
        <h2 className="page-title">Alterar Filme</h2>
        <div className="search-box">
          <div className="form-group">
            <label>Digite o ID do Filme</label>
            <input
              type="text"
              placeholder="Ex: 1"
              value={idBusca}
              onChange={e => setIdBusca(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleProcurar()}
            />
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={handleProcurar} disabled={loadingBusca}>
              {loadingBusca ? 'Procurando...' : 'Procurar'}
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Estado: NÃO ENCONTRADO
  if (estado === 'nao_encontrado') {
    return (
      <div className="container">
        <h2 className="page-title">Alterar Filme</h2>
        <div className="msg-not-found">
          <p>❌ Filme com ID "{idBusca}" não encontrado.</p>
          <button className="btn btn-secondary" onClick={resetar}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // Estado: ENCONTRADO
  return (
    <div className="container">
      <h2 className="page-title">Alterar Filme — ID: {idEncontrado}</h2>
      <div className="form-card">
        {erro && <div className="msg-error">{erro}</div>}

        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gênero</label>
          <input
            type="text"
            name="genero"
            value={form.genero}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ano</label>
          <input
            type="text"
            name="ano"
            value={form.ano}
            onChange={handleChange}
          />
        </div>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleAlterar} disabled={loadingAlterar}>
            {loadingAlterar ? 'Salvando...' : 'Alterar'}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
