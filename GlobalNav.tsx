import { useState } from 'react';
import { ArrowUpRight, Heart, Menu, MessageCircle, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { GosokyLogo } from '@/components/GosokyLogo';

const primaryLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Conecta', to: '/conecta' },
  { label: 'Chat', to: '/chat' },
  { label: 'Translate', to: '/translate' },
  { label: 'Educa', to: '/educa' },
  { label: 'Viaja', to: '/travel' },
  { label: 'Comunidad', to: '/comunidad' },
];

const secondaryLinks = [
  { label: 'Singles', to: '/singles' },
  { label: 'Ama', to: '/ama' },
  { label: 'Cruceros', to: '/cruises' },
  { label: 'Mapa', to: '/map' },
  { label: 'Negocios', to: '/negocios' },
  { label: 'Oportunidades', to: '/opportunities' },
  { label: 'Creadores', to: '/creadores' },
  { label: 'Premium', to: '/premium' },
  { label: 'Seguridad', to: '/safety' },
  { label: 'Perfil', to: '/perfil' },
];

export function GlobalNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const close = () => setOpen(false);

  return (
    <header className="app-nav-wrap">
      <nav className="app-nav container">
        <Link to="/" className="brand" onClick={close} aria-label="Gosoky Global inicio"><GosokyLogo size={36} /><span>GOSOKY <b>GLOBAL</b></span></Link>
        <div className={`app-nav-links ${open ? 'open' : ''}`}>
          <div className="app-nav-group">
            <span className="app-nav-label">EXPLORAR</span>
            {primaryLinks.map((link) => <Link key={link.to} to={link.to} className={location.pathname === link.to ? 'active' : ''} onClick={close}>{link.label}</Link>)}
          </div>
          <div className="app-nav-group">
            <span className="app-nav-label">ECOSISTEMA</span>
            {secondaryLinks.map((link) => <Link key={link.to} to={link.to} className={location.pathname === link.to ? 'active' : ''} onClick={close}>{link.label}</Link>)}
          </div>
          <Link to="/membresias" className="app-nav-cta" onClick={close}>Ser parte <ArrowUpRight size={15} /></Link>
        </div>
        <div className="app-nav-actions"><Link to="/chat" className="app-nav-icon" aria-label="Abrir chat"><MessageCircle size={17} /></Link><Link to="/ama" className="app-nav-icon" aria-label="Abrir Ama"><Heart size={17} /></Link></div>
        <button className="app-menu-btn" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </nav>
    </header>
  );
}
