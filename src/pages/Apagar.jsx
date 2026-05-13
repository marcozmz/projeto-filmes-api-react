import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// Estados possíveis: 'busca' | 'encontrado' | 'nao_encontrado'

export default function Apagar() {
  const navigate = useNavigate();
  const [idBusca, setIdBusca] = useState('');
  const [estado, setEstado] = useState('busca');
  const [filme, setFilme] = useState(null);
  const [loadingBusca, setLoadingBusca] = useState(false);
  const [loadingApagar, setLoadingApagar] = useState(false);
  const [erro, setErro] = useState('');

  async function handleProcurar() {
    if (!idBusca.trim()) return;
    setLoadingBusca(true);
    setErro('');
    try {
      const res = await api.get(`/${idBusca.trim()}`);
      setFilme(res.data);
      setEstado('encontrado');
    } catch {
      setEstado('nao_encontrado');
    } finally {
      setLoadingBusca(false);
    }
  }

  async function handleApagar() {
    setLoadingApagar(true);
    try {
      await api.delete(`/${filme.id}`);
      navigate('/');
    } catch {
      setErro('Erro ao apagar filme. Tente novamente.');
    } finally {
      setLoadingApagar(false);
    }
  }

  function resetar() {
    setEstado('busca');
    setIdBusca('');
    setFilme(null);
    setErro('');
  }

  /* ── RENDERIZAÇÃO CONDICIONAL ── */

  // Estado: BUSCA
  if (estado === 'busca') {
    return (
      <div className="container">
        <h2 className="page-title">Apagar Filme</h2>
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
        <h2 className="page-title">Apagar Filme</h2>
        <div className="msg-not-found">
          <p>❌ Filme com ID "{idBusca}" não encontrado.</p>
          <button className="btn btn-secondary" onClick={resetar}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // Estado: ENCONTRADO — confirmação de exclusão
  return (
    <div className="container">
      <h2 className="page-title">Confirmar Exclusão</h2>

      <div className="detail-card">
        {erro && <div className="msg-error">{erro}</div>}

        <p style={{ color: '#e94560', marginBottom: '24px', fontSize: '1rem' }}>
          ⚠️ Tem certeza que deseja apagar este filme? Esta ação não pode ser desfeita.
        </p>

        <div className="detail-row">
          <span className="detail-label">ID</span>
          <span className="detail-value">{filme.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Nome</span>
          <span className="detail-value">{filme.nome}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Gênero</span>
          <span className="detail-value">{filme.genero}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Ano</span>
          <span className="detail-value">{filme.ano}</span>
        </div>

        <div className="btn-group">
          <button className="btn btn-danger" onClick={handleApagar} disabled={loadingApagar}>
            {loadingApagar ? 'Apagando...' : 'Apagar'}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
