import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>🎬 Catálogo de Filmes</h1>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Início
        </NavLink>
        <NavLink to="/criar" className={({ isActive }) => isActive ? 'active' : ''}>
          Criar
        </NavLink>
        <NavLink to="/alterar" className={({ isActive }) => isActive ? 'active' : ''}>
          Alterar
        </NavLink>
        <NavLink to="/apagar" className={({ isActive }) => isActive ? 'active' : ''}>
          Apagar
        </NavLink>
      </div>
    </nav>
  );
}
