import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Ler() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get(`/${id}`)
      .then(res => setFilme(res.data))
      .catch(() => setErro('Filme não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="container">
      <h2 className="page-title">Detalhes do Filme</h2>

      {loading && <p className="msg-loading">Carregando...</p>}
      {erro && <div className="msg-error">{erro}</div>}

      {filme && (
        <div className="detail-card">
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
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
