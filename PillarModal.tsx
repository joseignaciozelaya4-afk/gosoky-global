import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X, type LucideIcon } from 'lucide-react';

export type PillarDetail = {
  name: string;
  icon: LucideIcon;
  color: string;
  tagline: string;
  purpose: string;
  description: string;
  features: string[];
  modules?: string[];
  status: string;
};

type Props = {
  pillars: PillarDetail[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function PillarModal({ pillars, activeIndex, onClose, onNavigate }: Props) {
  const [animDir, setAnimDir] = useState(1);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    function handleKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && activeIndex !== null && activeIndex < pillars.length - 1) {
        setAnimDir(1);
        onNavigate(activeIndex + 1);
      }
      if (e.key === 'ArrowLeft' && activeIndex !== null && activeIndex > 0) {
        setAnimDir(-1);
        onNavigate(activeIndex - 1);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, onClose, onNavigate, pillars.length]);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      return () => { document.body.style.overflow = ''; };
    }
  }, [activeIndex]);

  if (activeIndex === null) return null;
  const pillar = pillars[activeIndex];
  const Icon = pillar.icon;
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < pillars.length - 1;

  return (
    <div className="pillar-modal-overlay" onClick={onClose}>
      <div
        className={`pillar-modal ${pillar.color}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pillar-modal-title"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: animDir > 0 ? 'pillarSlideInRight .35s cubic-bezier(.16,1,.3,1)' : 'pillarSlideInLeft .35s cubic-bezier(.16,1,.3,1)' }}
      >
        <div className="pillar-modal-header">
          <div className="pillar-modal-id">
            <Icon size={28} strokeWidth={1.4} />
            <span>0{activeIndex + 1} / 07</span>
          </div>
          <button ref={closeButtonRef} className="pillar-modal-close" onClick={onClose} aria-label="Cerrar vista detallada">
            <X size={18} />
          </button>
        </div>

        <div className="pillar-modal-body">
          <h2 id="pillar-modal-title">{pillar.name}</h2>
          <p className="pillar-modal-tagline">{pillar.tagline}</p>

          <div className="pillar-modal-section">
            <h3>PROPÓSITO</h3>
            <p>{pillar.purpose}</p>
          </div>

          <div className="pillar-modal-section">
            <h3>DESCRIPCIÓN</h3>
            <p>{pillar.description}</p>
          </div>

          {pillar.modules && pillar.modules.length > 0 && (
            <div className="pillar-modal-section">
              <h3>MÓDULOS</h3>
              <div className="pillar-modal-modules">
                {pillar.modules.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          )}

          <div className="pillar-modal-section">
            <h3>FUNCIONALIDADES</h3>
            <ul className="pillar-modal-features">
              {pillar.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="pillar-modal-status">
            <span className="pillar-modal-status-dot" />
            {pillar.status}
          </div>
        </div>

        <div className="pillar-modal-nav">
          <button
            className="pillar-modal-nav-btn"
            onClick={() => { if (hasPrev) { setAnimDir(-1); onNavigate(activeIndex - 1); } }}
            disabled={!hasPrev}
          >
            <ArrowLeft size={15} /> Anterior
          </button>
          <span className="pillar-modal-nav-label">{pillar.name}</span>
          <button
            className="pillar-modal-nav-btn"
            onClick={() => { if (hasNext) { setAnimDir(1); onNavigate(activeIndex + 1); } }}
            disabled={!hasNext}
          >
            Siguiente <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
