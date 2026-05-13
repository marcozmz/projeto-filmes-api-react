import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Inicio() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/')
      .then(res => setFilmes(res.data))
      .catch(() => setErro('Erro ao carregar filmes. Verifique a URL do MockAPI em src/api.js'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Filmes Cadastrados</h2>

      {loading && <p className="msg-loading">Carregando...</p>}
      {erro && <div className="msg-error">{erro}</div>}

      {!loading && !erro && filmes.length === 0 && (
        <p className="msg-empty">Nenhum filme cadastrado ainda. <Link to="/criar">Criar um filme</Link>.</p>
      )}

      <div className="movies-grid">
        {filmes.map(filme => (
          <Link to={`/ler/${filme.id}`} key={filme.id} className="movie-card">
            <div className="movie-id">ID: {filme.id}</div>
            <div className="movie-name">{filme.nome}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
