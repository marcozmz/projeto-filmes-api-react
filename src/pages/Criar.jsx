import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Criar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', genero: '', ano: '' });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCriar() {
    if (!form.nome || !form.genero || !form.ano) {
      setErro('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setErro('');
    try {
      await api.post('/', form);
      navigate('/');
    } catch {
      setErro('Erro ao criar filme. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2 className="page-title">Criar Filme</h2>

      <div className="form-card">
        {erro && <div className="msg-error">{erro}</div>}

        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Ex: Interstellar"
            value={form.nome}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gênero</label>
          <input
            type="text"
            name="genero"
            placeholder="Ex: Ficção Científica"
            value={form.genero}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ano</label>
          <input
            type="text"
            name="ano"
            placeholder="Ex: 2014"
            value={form.ano}
            onChange={handleChange}
          />
        </div>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleCriar} disabled={loading}>
            {loading ? 'Salvando...' : 'Criar'}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
