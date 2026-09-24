import { useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRightLeft, Calendar, Compass, Flame, Globe, Heart, MapPin,
  Plane, Search, Share2, Star, Trash2, UtensilsCrossed, Ticket,
  Plus, Check, Hotel as HotelIcon, Ship, UserRound, Sparkles, Clock, X,
} from 'lucide-react';
import { useTravel } from '@/components/travel/useTravel';
import {
  destinations, flights, hotels, restaurants, cruises, cruiseMemberships,
  activities, travelEvents, activityCategoryLabels, destinationTypeLabels,
  searchAll, getDestination, getHotelsByDestination, getRestaurantsByDestination,
  getActivitiesByDestination, getEventsByDestination, getFlightsByDestination,
  type Destination, type Flight, type Hotel, type Restaurant, type Cruise,
  type Activity, type ActivityCategory, type FavoriteItem,
} from '@/services/travelService';

export type View =
  | 'dashboard' | 'destinations' | 'destination-detail' | 'flights' | 'hotels'
  | 'restaurants' | 'cruises' | 'cruise-detail' | 'activities' | 'events'
  | 'itineraries' | 'favorites' | 'offers' | 'packages' | 'profile' | 'map'
  | 'cruise-memberships';

const navItems: { key: View; label: string; icon: typeof Globe }[] = [
  { key: 'dashboard', label: 'Inicio', icon: Compass },
  { key: 'destinations', label: 'Destinos', icon: Globe },
  { key: 'flights', label: 'Vuelos', icon: Plane },
  { key: 'hotels', label: 'Hoteles', icon: HotelIcon },
  { key: 'restaurants', label: 'Restaurantes', icon: UtensilsCrossed },
  { key: 'cruises', label: 'Cruceros', icon: Ship },
  { key: 'activities', label: 'Actividades', icon: Ticket },
  { key: 'events', label: 'Eventos', icon: Calendar },
  { key: 'itineraries', label: 'Itinerarios', icon: MapPin },
  { key: 'favorites', label: 'Favoritos', icon: Heart },
  { key: 'offers', label: 'Ofertas', icon: Flame },
  { key: 'packages', label: 'Crea tu viaje', icon: Sparkles },
  { key: 'map', label: 'Mapa', icon: MapPin },
  { key: 'profile', label: 'Mi perfil', icon: UserRound },
];

export function GosokyTravel({ initialView = 'dashboard' }: { initialView?: View } = {}) {
  const { pendingShare, clearPendingShare } = useTravel();
  const [view, setView] = useState<View>(initialView);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [selectedCruiseId, setSelectedCruiseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  function navigate(next: View, destinationId?: string, cruiseId?: string): void {
    setView(next);
    if (destinationId !== undefined) setSelectedDestinationId(destinationId);
    if (cruiseId !== undefined) setSelectedCruiseId(cruiseId);
    window.scrollTo({ top: document.getElementById('travel')?.offsetTop ?? 0, behavior: 'smooth' });
  }

  const selectedDestination = selectedDestinationId ? getDestination(selectedDestinationId) : null;
  const selectedCruise = selectedCruiseId ? cruises.find((c) => c.id === selectedCruiseId) : null;

  return (
    <section id="travel" className="travel-section">
      <div className="container">
        <div className="travel-header">
          <div>
            <p className="section-label"><span />GOSOKY TRAVEL + CRUISES</p>
            <h2>Descubre el mundo.<br /><span>Conecta, viaja, pertenece.</span></h2>
          </div>
          <p>Una plataforma global de viajes integrada al ecosistema Gosoky. Explora destinos, busca vuelos y hoteles, descubre cruceros, planifica itinerarios y comparte con tu red.</p>
        </div>

        <div className="travel-shell">
          <aside className="travel-nav">
            <div className="travel-nav-header">
              <span className="chat-kicker">GOSOKY GLOBAL</span>
              <h3>Travel + Cruises</h3>
            </div>
            <nav className="travel-nav-list">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  className={`travel-nav-item ${view === item.key || (item.key === 'destinations' && view === 'destination-detail') || (item.key === 'cruises' && view === 'cruise-detail') ? 'active' : ''}`}
                  onClick={() => navigate(item.key)}
                >
                  <item.icon size={15} />
                  {item.label}
                </button>
              ))}
            </nav>
            <button className="travel-nav-memberships" onClick={() => navigate('cruise-memberships')}>
              <Ship size={14} /> Membresías Cruises
            </button>
          </aside>

          <div className="travel-content">
            {view === 'dashboard' && <DashboardView onNavigate={navigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
            {view === 'destinations' && <DestinationsView onNavigate={navigate} />}
            {view === 'destination-detail' && selectedDestination && <DestinationDetailView destination={selectedDestination} onNavigate={navigate} />}
            {view === 'flights' && <FlightsView />}
            {view === 'hotels' && <HotelsView />}
            {view === 'restaurants' && <RestaurantsView />}
            {view === 'cruises' && <CruisesView onNavigate={navigate} />}
            {view === 'cruise-detail' && selectedCruise && <CruiseDetailView cruise={selectedCruise} onBack={() => navigate('cruises')} />}
            {view === 'activities' && <ActivitiesView />}
            {view === 'events' && <EventsView />}
            {view === 'itineraries' && <ItinerariesView />}
            {view === 'favorites' && <FavoritesView />}
            {view === 'offers' && <OffersView />}
            {view === 'packages' && <PackagesView />}
            {view === 'profile' && <ProfileView onNavigate={navigate} />}
            {view === 'map' && <MapView />}
            {view === 'cruise-memberships' && <CruiseMembershipsView />}
          </div>
        </div>
        {pendingShare && <div className="travel-share-toast"><div><Share2 size={16} /><span><strong>{pendingShare.name}</strong><small>Listo para compartir en Gosoky Chat</small></span></div><button onClick={() => { document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' }); clearPendingShare(); }}>Ir a Chat</button><button className="toast-close" onClick={clearPendingShare}><X size={14} /></button></div>}
      </div>
    </section>
  );
}

function DemoBadge(): JSX.Element {
  return <span className="demo-badge">DEMO</span>;
}

function DemoActionButton({ children, message }: { children: ReactNode; message: string }): JSX.Element {
  const [visible, setVisible] = useState(false);
  return <span className="demo-action-wrap"><button className="action-btn" onClick={() => setVisible(true)}>{children}</button>{visible && <span className="demo-feedback" role="status">{message}</span>}</span>;
}

function FavoriteButton({ item }: { item: FavoriteItem }): JSX.Element {
  const { isFavorite, toggleFavorite } = useTravel();
  const fav = isFavorite(item.id);
  return (
    <button className={`fav-btn ${fav ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}>
      <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
      {fav ? 'Guardado' : 'Guardar'}
    </button>
  );
}

function ShareButton({ name, subtitle }: { name: string; subtitle: string }): JSX.Element {
  const { shareItem } = useTravel();
  return (
    <button className="share-btn" onClick={(e) => { e.stopPropagation(); shareItem(name, subtitle); }}>
      <Share2 size={14} /> Compartir
    </button>
  );
}

function Stars({ rating }: { rating: number }): JSX.Element {
  return (
    <span className="stars">
      <Star size={11} fill="currentColor" />
      {rating.toFixed(1)}
    </span>
  );
}

function DashboardView({ onNavigate, searchQuery, setSearchQuery }: { onNavigate: (v: View, d?: string, c?: string) => void; searchQuery: string; setSearchQuery: (q: string) => void }): JSX.Element {
  const results = useMemo(() => searchQuery.trim() ? searchAll(searchQuery) : null, [searchQuery]);

  const cards: { key: View; label: string; icon: typeof Globe; color: string }[] = [
    { key: 'destinations', label: 'Destinos', icon: Globe, color: '#3c8d78' },
    { key: 'flights', label: 'Vuelos', icon: Plane, color: '#2d7890' },
    { key: 'hotels', label: 'Hoteles', icon: HotelIcon, color: '#b67f32' },
    { key: 'restaurants', label: 'Restaurantes', icon: UtensilsCrossed, color: '#a65c63' },
    { key: 'cruises', label: 'Cruceros', icon: Ship, color: '#806a9b' },
    { key: 'activities', label: 'Actividades', icon: Ticket, color: '#3c8d78' },
    { key: 'map', label: 'Explorar mapa', icon: MapPin, color: '#2d7890' },
    { key: 'itineraries', label: 'Itinerarios', icon: Calendar, color: '#b67f32' },
    { key: 'favorites', label: 'Favoritos', icon: Heart, color: '#a65c63' },
    { key: 'events', label: 'Eventos', icon: Calendar, color: '#806a9b' },
    { key: 'offers', label: 'Ofertas', icon: Flame, color: '#c25450' },
    { key: 'profile', label: 'Mi perfil', icon: UserRound, color: '#3c8d78' },
  ];

  return (
    <div className="travel-view">
      <div className="travel-search-bar">
        <Search size={18} />
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="¿A dónde quieres viajar? Busca país, ciudad, hotel, crucero..." />
        {searchQuery && <button onClick={() => setSearchQuery('')}><X size={15} /></button>}
      </div>

      {results ? (
        <div className="search-results">
          <h3>Resultados para "{searchQuery}" <DemoBadge /></h3>
          {results.destinations.length === 0 && results.hotels.length === 0 && results.restaurants.length === 0 && results.activities.length === 0 && results.cruises.length === 0 && results.events.length === 0 ? (
            <p className="empty-state">No se encontraron resultados. Prueba con "París", "crucero" o "playa".</p>
          ) : (
            <>
              {results.destinations.length > 0 && <div className="result-group"><h4>Destinos</h4>{results.destinations.map((d) => <ResultRow key={d.id} image={d.image} title={d.name} subtitle={`${d.country} · ${d.city}`} onClick={() => onNavigate('destination-detail', d.id)} />)}</div>}
              {results.hotels.length > 0 && <div className="result-group"><h4>Hoteles</h4>{results.hotels.map((h) => <ResultRow key={h.id} image={h.image} title={h.name} subtitle={h.location} onClick={() => onNavigate('hotels')} />)}</div>}
              {results.restaurants.length > 0 && <div className="result-group"><h4>Restaurantes</h4>{results.restaurants.map((r) => <ResultRow key={r.id} image={r.image} title={r.name} subtitle={r.cuisine} onClick={() => onNavigate('restaurants')} />)}</div>}
              {results.cruises.length > 0 && <div className="result-group"><h4>Cruceros</h4>{results.cruises.map((c) => <ResultRow key={c.id} image={c.image} title={c.shipName} subtitle={c.route} onClick={() => onNavigate('cruises')} />)}</div>}
              {results.activities.length > 0 && <div className="result-group"><h4>Actividades</h4>{results.activities.map((a) => <ResultRow key={a.id} image={a.image} title={a.name} subtitle={a.description} onClick={() => onNavigate('activities')} />)}</div>}
              {results.events.length > 0 && <div className="result-group"><h4>Eventos</h4>{results.events.map((e) => <ResultRow key={e.id} image={e.image} title={e.name} subtitle={e.type} onClick={() => onNavigate('events')} />)}</div>}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="travel-dashboard-grid">
            {cards.map((card) => (
              <button key={card.key} className="travel-card" onClick={() => onNavigate(card.key)}>
                <div className="travel-card-icon" style={{ backgroundColor: card.color }}><card.icon size={22} /></div>
                <strong>{card.label}</strong>
              </button>
            ))}
          </div>

          <div className="travel-section-block">
            <div className="travel-block-header"><h3>Destinos destacados</h3><button className="text-link" onClick={() => onNavigate('destinations')}>Ver todos <ArrowRightLeft size={14} /></button></div>
            <div className="travel-card-row">
              {destinations.slice(0, 3).map((d) => (
                <button key={d.id} className="dest-card" onClick={() => onNavigate('destination-detail', d.id)}>
                  <img loading="lazy" decoding="async" src={d.image} alt={d.name} />
                  <div className="dest-card-overlay">
                    <div><strong>{d.name}</strong><small>{d.country}</small></div>
                    <Stars rating={d.rating} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="travel-section-block">
            <div className="travel-block-header"><h3>Cruceros destacados</h3><button className="text-link" onClick={() => onNavigate('cruises')}>Ver todos <ArrowRightLeft size={14} /></button></div>
            <div className="travel-card-row">
              {cruises.slice(0, 3).map((c) => (
                <button key={c.id} className="dest-card" onClick={() => onNavigate('cruise-detail', undefined, c.id)}>
                  <img loading="lazy" decoding="async" src={c.image} alt={c.shipName} />
                  <div className="dest-card-overlay">
                    <div><strong>{c.shipName}</strong><small>{c.line}</small></div>
                    <span className="price-tag">desde ${c.priceFrom}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ResultRow({ image, title, subtitle, onClick }: { image: string; title: string; subtitle: string; onClick: () => void }): JSX.Element {
  return (
    <button className="result-row" onClick={onClick}>
      <img loading="lazy" decoding="async" src={image} alt={title} />
      <div><strong>{title}</strong><small>{subtitle}</small></div>
    </button>
  );
}

function DestinationsView({ onNavigate }: { onNavigate: (v: View, d?: string) => void }): JSX.Element {
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? destinations : destinations.filter((d) => d.type === filter);
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Destinos del mundo</h3><DemoBadge /></div>
      <div className="filter-pills">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Todos</button>
        {Object.entries(destinationTypeLabels).map(([key, label]) => (
          <button key={key} className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{label}</button>
        ))}
      </div>
      <div className="dest-grid">
        {filtered.map((d) => (
          <article key={d.id} className="dest-card-large">
            <img loading="lazy" decoding="async" src={d.image} alt={d.name} />
            <div className="dest-card-body">
              <div className="dest-card-top"><strong>{d.name}</strong><Stars rating={d.rating} /></div>
              <small><MapPin size={11} /> {d.country} · {d.city}</small>
              <p>{d.description}</p>
              <div className="dest-card-tags">
                <span>{destinationTypeLabels[d.type]}</span>
                <span>{d.climate}</span>
              </div>
              <div className="card-actions">
                <FavoriteButton item={{ id: d.id, type: 'destination', name: d.name, subtitle: `${d.country} · ${d.city}`, image: d.image }} />
                <ShareButton name={d.name} subtitle={`${d.country} · ${d.city}`} />
                <button className="detail-link" onClick={() => onNavigate('destination-detail', d.id)}>Explorar destino <ArrowRightLeft size={13} /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function DestinationDetailView({ destination, onNavigate }: { destination: Destination; onNavigate: (v: View, d?: string) => void }): JSX.Element {
  const destHotels = getHotelsByDestination(destination.id);
  const destRestaurants = getRestaurantsByDestination(destination.id);
  const destActivities = getActivitiesByDestination(destination.id);
  const destEvents = getEventsByDestination(destination.id);
  const destFlights = getFlightsByDestination(destination.name);
  const { createItinerary } = useTravel();

  return (
    <div className="travel-view">
      <button className="back-btn" onClick={() => onNavigate('destinations')}><ArrowLeft size={15} /> Volver a destinos</button>
      <div className="dest-hero">
        <img loading="lazy" decoding="async" src={destination.image} alt={destination.name} />
        <div className="dest-hero-overlay">
          <h3>{destination.name}</h3>
          <p><MapPin size={13} /> {destination.country} · {destination.city}</p>
          <div className="dest-hero-tags">
            <Stars rating={destination.rating} />
            <span>{destination.climate}</span>
            <span>Idioma: {destination.language}</span>
            <span>Moneda: {destination.currency}</span>
          </div>
        </div>
      </div>
      <p className="dest-description">{destination.description}</p>
      <div className="dest-highlights">
        <h4>Lugares destacados</h4>
        <div className="highlight-pills">{destination.highlights.map((h) => <span key={h}>{h}</span>)}</div>
      </div>
      <div className="card-actions dest-actions">
        <FavoriteButton item={{ id: destination.id, type: 'destination', name: destination.name, subtitle: `${destination.country} · ${destination.city}`, image: destination.image }} />
        <ShareButton name={destination.name} subtitle={`${destination.country} · ${destination.city}`} />
        <button className="action-btn" onClick={() => { createItinerary(`Viaje a ${destination.name}`, destination.id); onNavigate('itineraries'); }}>
          <Calendar size={14} /> Crear itinerario
        </button>
      </div>

      <div className="dest-tabs">
        <h4>Todo lo que puedes hacer en {destination.name}</h4>
        <div className="dest-tab-grid">
          {destFlights.length > 0 && <div className="dest-tab-section"><h5>Vuelos <DemoBadge /></h5>{destFlights.map((f) => <div key={f.id} className="mini-card"><strong>{f.airline}</strong><small>{f.departureTime} → {f.arrivalTime}</small><span>${f.price}</span></div>)}</div>}
          {destHotels.length > 0 && <div className="dest-tab-section"><h5>Hoteles <DemoBadge /></h5>{destHotels.map((h) => <div key={h.id} className="mini-card"><strong>{h.name}</strong><small>{h.location}</small><span>${h.pricePerNight}/noche</span></div>)}</div>}
          {destRestaurants.length > 0 && <div className="dest-tab-section"><h5>Restaurantes <DemoBadge /></h5>{destRestaurants.map((r) => <div key={r.id} className="mini-card"><strong>{r.name}</strong><small>{r.cuisine}</small><Stars rating={r.rating} /></div>)}</div>}
          {destActivities.length > 0 && <div className="dest-tab-section"><h5>Actividades <DemoBadge /></h5>{destActivities.map((a) => <div key={a.id} className="mini-card"><strong>{a.name}</strong><small>{a.durationHours}h</small><span>${a.price}</span></div>)}</div>}
          {destEvents.length > 0 && <div className="dest-tab-section"><h5>Eventos <DemoBadge /></h5>{destEvents.map((e) => <div key={e.id} className="mini-card"><strong>{e.name}</strong><small>{e.date}</small></div>)}</div>}
        </div>
      </div>

      <div className="dest-map-placeholder">
        <MapPin size={24} />
        <p>Mapa de {destination.name}</p>
        <small>Integración con proveedor de mapas próximamente</small>
      </div>
    </div>
  );
}

function FlightsView(): JSX.Element {
  const [origin, setOrigin] = useState('');
  const [dest, setDest] = useState('');
  const [travelers, setTravelers] = useState('1');
  const [cabin, setCabin] = useState('Económica');
  const results = flights.filter((f) => (!dest || f.destination === dest) && (!origin || f.origin === origin));

  return (
    <div className="travel-view">
      <div className="view-header"><h3>Vuelos</h3><DemoBadge /></div>
      <div className="search-form">
        <label>Origen<select value={origin} onChange={(e) => setOrigin(e.target.value)}><option value="">Cualquiera</option>{[...new Set(flights.map((f) => f.origin))].map((o) => <option key={o} value={o}>{o}</option>)}</select></label>
        <label>Destino<select value={dest} onChange={(e) => setDest(e.target.value)}><option value="">Cualquiera</option>{[...new Set(flights.map((f) => f.destination))].map((d) => <option key={d} value={d}>{d}</option>)}</select></label>
        <label>Viajeros<select value={travelers} onChange={(e) => setTravelers(e.target.value)}>{['1', '2', '3', '4', '5'].map((n) => <option key={n} value={n}>{n}</option>)}</select></label>
        <label>Clase<select value={cabin} onChange={(e) => setCabin(e.target.value)}>{['Económica', 'Ejecutiva', 'Primera'].map((c) => <option key={c} value={c}>{c}</option>)}</select></label>
      </div>
      <div className="flight-results">
        {results.length === 0 ? <p className="empty-state">No hay vuelos demo para esta ruta.</p> : results.map((f) => (
          <div key={f.id} className="flight-card">
            <div className="flight-airline"><Plane size={16} /><strong>{f.airline}</strong></div>
            <div className="flight-route"><div><strong>{f.departureTime}</strong><small>{f.origin}</small></div><div className="flight-arrow"><Clock size={12} />{f.duration}</div><div><strong>{f.arrivalTime}</strong><small>{f.destination}</small></div></div>
            <div className="flight-details"><span>{f.stops === 0 ? 'Directo' : `${f.stops} escala(s)`}</span><span>{f.class}</span><span>{f.baggage}</span></div>
            <div className="flight-price"><strong>${f.price}</strong><small>por {travelers} viajero(s)</small></div>
            <DemoActionButton message="La conexión con el proveedor de vuelos estará disponible próximamente.">Continuar <DemoBadge /></DemoActionButton>
          </div>
        ))}
      </div>
      <p className="demo-note">Resultados demostración. La integración con proveedores de vuelos se conectará posteriormente.</p>
    </div>
  );
}

function HotelsView(): JSX.Element {
  const [destFilter, setDestFilter] = useState('all');
  const filtered = destFilter === 'all' ? hotels : hotels.filter((h) => h.destinationId === destFilter);
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Hoteles</h3><DemoBadge /></div>
      <div className="filter-pills">
        <button className={destFilter === 'all' ? 'active' : ''} onClick={() => setDestFilter('all')}>Todos</button>
        {destinations.map((d) => <button key={d.id} className={destFilter === d.id ? 'active' : ''} onClick={() => setDestFilter(d.id)}>{d.name}</button>)}
      </div>
      <div className="hotel-grid">
        {filtered.map((h) => (
          <div key={h.id} className="hotel-card">
            <img loading="lazy" decoding="async" src={h.image} alt={h.name} />
            <div className="hotel-body">
              <div className="hotel-top"><strong>{h.name}</strong><Stars rating={h.rating} /></div>
              <small><MapPin size={11} /> {h.location}</small>
              <div className="hotel-amenities">{h.amenities.slice(0, 4).map((a) => <span key={a}>{a}</span>)}</div>
              <p>{h.description}</p>
              <div className="card-actions">
                <div className="price-tag">${h.pricePerNight}<small>/noche</small></div>
                <FavoriteButton item={{ id: h.id, type: 'hotel', name: h.name, subtitle: h.location, image: h.image }} />
                <ShareButton name={h.name} subtitle={h.location} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RestaurantsView(): JSX.Element {
  const [destFilter, setDestFilter] = useState('all');
  const filtered = destFilter === 'all' ? restaurants : restaurants.filter((r) => r.destinationId === destFilter);
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Restaurantes</h3><DemoBadge /></div>
      <div className="filter-pills">
        <button className={destFilter === 'all' ? 'active' : ''} onClick={() => setDestFilter('all')}>Todos</button>
        {destinations.map((d) => <button key={d.id} className={destFilter === d.id ? 'active' : ''} onClick={() => setDestFilter(d.id)}>{d.name}</button>)}
      </div>
      <div className="hotel-grid">
        {filtered.map((r) => (
          <div key={r.id} className="hotel-card">
            <img loading="lazy" decoding="async" src={r.image} alt={r.name} />
            <div className="hotel-body">
              <div className="hotel-top"><strong>{r.name}</strong><Stars rating={r.rating} /></div>
              <small><MapPin size={11} /> {r.location} · {r.cuisine}</small>
              <p>{r.description}</p>
              <div className="card-actions">
                <div className="price-tag">{r.priceRange}</div>
                <FavoriteButton item={{ id: r.id, type: 'restaurant', name: r.name, subtitle: r.cuisine, image: r.image }} />
                <ShareButton name={r.name} subtitle={r.cuisine} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CruisesView({ onNavigate }: { onNavigate: (v: View, d?: string, c?: string) => void }): JSX.Element {
  return (
    <div className="travel-view">
      <div className="view-header"><h3>GOSOKY CRUISES</h3><DemoBadge /></div>
      <p className="view-subtitle">Viaja el mundo por mar. Rutas premium, experiencias únicas y aventuras inolvidables.</p>
      <div className="cruise-grid">
        {cruises.map((c) => (
          <div key={c.id} className="cruise-card">
            <img loading="lazy" decoding="async" src={c.image} alt={c.shipName} />
            <div className="cruise-body">
              <div className="cruise-top"><div><strong>{c.shipName}</strong><small>{c.line}</small></div><span className="price-tag">desde ${c.priceFrom}</span></div>
              <p className="cruise-route"><MapPin size={12} /> {c.route}</p>
              <div className="cruise-meta"><span><Calendar size={12} /> {c.durationDays} días</span><span>{c.departureDate}</span></div>
              <div className="cruise-ports"><small>Puertos:</small>{c.ports.map((p) => <span key={p}>{p}</span>)}</div>
              <div className="cruise-experiences"><small>Experiencias:</small>{c.experiences.slice(0, 3).map((e) => <span key={e}>{e}</span>)}</div>
              <div className="card-actions">
                <FavoriteButton item={{ id: c.id, type: 'cruise', name: c.shipName, subtitle: c.route, image: c.image }} />
                <ShareButton name={c.shipName} subtitle={c.route} />
                <button className="action-btn" onClick={() => onNavigate('cruise-detail', undefined, c.id)}>Ver detalles</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CruiseDetailView({ cruise, onBack }: { cruise: Cruise; onBack: () => void }): JSX.Element {
  return (
    <div className="travel-view">
      <button className="back-btn" onClick={onBack}><ArrowLeft size={15} /> Volver a cruceros</button>
      <div className="dest-hero">
        <img loading="lazy" decoding="async" src={cruise.image} alt={cruise.shipName} />
        <div className="dest-hero-overlay">
          <h3>{cruise.shipName}</h3>
          <p>{cruise.line}</p>
          <div className="dest-hero-tags"><span><Calendar size={12} /> {cruise.durationDays} días</span><span>{cruise.departureDate}</span><span className="price-tag">desde ${cruise.priceFrom}</span></div>
        </div>
      </div>
      <p className="dest-description">{cruise.description}</p>
      <div className="dest-highlights"><h4>Ruta</h4><p className="cruise-route"><MapPin size={13} /> {cruise.route}</p></div>
      <div className="dest-highlights"><h4>Puertos de escala</h4><div className="highlight-pills">{cruise.ports.map((p) => <span key={p}>{p}</span>)}</div></div>
      <div className="dest-highlights"><h4>Categorías de cabina</h4><div className="highlight-pills">{cruise.cabinCategories.map((c) => <span key={c}>{c}</span>)}</div></div>
      <div className="dest-highlights"><h4>Experiencias a bordo</h4><div className="highlight-pills">{cruise.experiences.map((e) => <span key={e}>{e}</span>)}</div></div>
      <div className="card-actions">
        <FavoriteButton item={{ id: cruise.id, type: 'cruise', name: cruise.shipName, subtitle: cruise.route, image: cruise.image }} />
        <ShareButton name={cruise.shipName} subtitle={cruise.route} />
        <DemoActionButton message="La reserva se habilitará cuando conectemos un proveedor autorizado.">Reservar <DemoBadge /></DemoActionButton>
      </div>
    </div>
  );
}

function ActivitiesView(): JSX.Element {
  const [category, setCategory] = useState<ActivityCategory | 'all'>('all');
  const filtered = category === 'all' ? activities : activities.filter((a) => a.category === category);
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Actividades y experiencias</h3><DemoBadge /></div>
      <div className="filter-pills">
        <button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>Todas</button>
        {(Object.entries(activityCategoryLabels) as [ActivityCategory, string][]).map(([key, label]) => (
          <button key={key} className={category === key ? 'active' : ''} onClick={() => setCategory(key)}>{label}</button>
        ))}
      </div>
      <div className="hotel-grid">
        {filtered.map((a) => (
          <div key={a.id} className="hotel-card">
            <img loading="lazy" decoding="async" src={a.image} alt={a.name} />
            <div className="hotel-body">
              <div className="hotel-top"><strong>{a.name}</strong><Stars rating={a.rating} /></div>
              <small>{activityCategoryLabels[a.category]} · {a.durationHours}h</small>
              <p>{a.description}</p>
              <div className="card-actions">
                <div className="price-tag">${a.price}</div>
                <FavoriteButton item={{ id: a.id, type: 'activity', name: a.name, subtitle: activityCategoryLabels[a.category], image: a.image }} />
                <ShareButton name={a.name} subtitle={activityCategoryLabels[a.category]} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsView(): JSX.Element {
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Eventos del mundo</h3><DemoBadge /></div>
      <div className="hotel-grid">
        {travelEvents.map((e) => {
          const dest = getDestination(e.destinationId);
          return (
            <div key={e.id} className="hotel-card">
              <img loading="lazy" decoding="async" src={e.image} alt={e.name} />
              <div className="hotel-body">
                <div className="hotel-top"><strong>{e.name}</strong><span className="event-type">{e.type}</span></div>
                <small><Calendar size={11} /> {e.date} · {dest?.name}</small>
                <p>{e.description}</p>
                <div className="card-actions">
                  <FavoriteButton item={{ id: e.id, type: 'event', name: e.name, subtitle: e.type, image: e.image }} />
                  <ShareButton name={e.name} subtitle={e.type} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ItinerariesView(): JSX.Element {
  const { itineraries, createItinerary, addToItinerary, removeFromItinerary, removeItinerary } = useTravel();
  const [newTitle, setNewTitle] = useState('');
  const [newDest, setNewDest] = useState(destinations[0]?.id ?? '');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="travel-view">
      <div className="view-header"><h3>Mi viaje</h3></div>
      {!showForm && <button className="action-btn" onClick={() => setShowForm(true)}><Plus size={14} /> Crear nuevo viaje</button>}
      {showForm && (
        <div className="inline-form">
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Nombre del viaje (ej. Viaje a París)" />
          <select value={newDest} onChange={(e) => setNewDest(e.target.value)}>
            {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button className="action-btn" onClick={() => { if (newTitle.trim()) { createItinerary(newTitle.trim(), newDest); setNewTitle(''); setShowForm(false); } }}>Crear</button>
          <button className="ghost-btn" onClick={() => setShowForm(false)}>Cancelar</button>
        </div>
      )}
      {itineraries.length === 0 ? (
        <p className="empty-state">No tienes itinerarios. Crea tu primer viaje.</p>
      ) : (
        <div className="itinerary-list">
          {itineraries.map((it) => {
            const dest = getDestination(it.destinationId);
            return (
              <div key={it.id} className="itinerary-card">
                <div className="itinerary-header">
                  <div><strong>{it.title}</strong><small>{dest?.name ?? 'Destino'}</small></div>
                  <button className="remove-btn" onClick={() => removeItinerary(it.id)}><Trash2 size={14} /></button>
                </div>
                {it.days.map((day) => (
                  <div key={day.day} className="itinerary-day">
                    <div className="day-header"><span>Día {day.day}</span></div>
                    {day.items.length === 0 ? <small className="empty-day">Sin actividades</small> : (
                      <div className="day-items">
                        {day.items.map((item, i) => (
                          <div key={i} className="day-item">
                            <span><strong>{item.type}</strong> {item.name}{item.time && <small> · {item.time}</small>}</span>
                            <button className="remove-btn" onClick={() => removeFromItinerary(it.id, day.day, i)}><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                    <AddItemForm onAdd={(type, name, time) => addToItinerary(it.id, day.day, { type, name, time })} />
                  </div>
                ))}
                <button className="action-btn small" onClick={() => addToItinerary(it.id, it.days.length + 1, { type: 'actividad', name: 'Nueva actividad' })}><Plus size={13} /> Añadir día</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AddItemForm({ onAdd }: { onAdd: (type: string, name: string, time?: string) => void }): JSX.Element {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('Vuelo');
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  if (!open) return <button className="add-item-btn" onClick={() => setOpen(true)}><Plus size={12} /> Añadir actividad</button>;
  return (
    <div className="inline-form small">
      <select value={type} onChange={(e) => setType(e.target.value)}>{['Vuelo', 'Hotel', 'Restaurante', 'Actividad', 'Evento', 'Excursión'].map((t) => <option key={t} value={t}>{t}</option>)}</select>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
      <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Hora (opcional)" />
      <button className="action-btn small" onClick={() => { if (name.trim()) { onAdd(type, name.trim(), time || undefined); setName(''); setTime(''); setOpen(false); } }}><Check size={13} /></button>
      <button className="ghost-btn small" onClick={() => setOpen(false)}>Cancelar</button>
    </div>
  );
}

function FavoritesView(): JSX.Element {
  const { favorites, toggleFavorite } = useTravel();
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Mis favoritos</h3></div>
      {favorites.length === 0 ? (
        <p className="empty-state">No tienes favoritos guardados. Explora destinos, hoteles y actividades y toca "Guardar".</p>
      ) : (
        <div className="hotel-grid">
          {favorites.map((f) => (
            <div key={f.id} className="hotel-card">
              <img loading="lazy" decoding="async" src={f.image} alt={f.name} />
              <div className="hotel-body">
                <div className="hotel-top"><strong>{f.name}</strong><span className="event-type">{f.type}</span></div>
                <small>{f.subtitle}</small>
                <div className="card-actions">
                  <button className="fav-btn active" onClick={() => toggleFavorite(f)}><Heart size={14} fill="currentColor" /> Quitar</button>
                  <ShareButton name={f.name} subtitle={f.subtitle} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OffersView(): JSX.Element {
  const offers = [
    { id: 'o1', title: 'Crucero Caribe - 30% off', subtitle: 'Symphony of the Seas · 7 días', image: cruises[0].image, price: 629, originalPrice: 899 },
    { id: 'o2', title: 'Hotel en París - 20% off', subtitle: 'Hotel Le Bristol · 3 noches', image: hotels[0].image, price: 520, originalPrice: 650 },
    { id: 'o3', title: 'Vuelo a Roma - 15% off', subtitle: 'Alitalia · Directo desde $663', image: destinations[2].image, price: 663, originalPrice: 780 },
    { id: 'o4', title: 'Atardecer en Santorini - 25% off', subtitle: 'Velero por la caldera', image: activities[4].image, price: 112, originalPrice: 150 },
  ];
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Ofertas del mundo</h3><DemoBadge /></div>
      <div className="hotel-grid">
        {offers.map((o) => (
          <div key={o.id} className="hotel-card offer-card">
            <img loading="lazy" decoding="async" src={o.image} alt={o.title} />
            <div className="offer-badge">-{Math.round((1 - o.price / o.originalPrice) * 100)}%</div>
            <div className="hotel-body">
              <div className="hotel-top"><strong>{o.title}</strong></div>
              <small>{o.subtitle}</small>
              <div className="card-actions">
                <div className="price-tag"><span className="original-price">${o.originalPrice}</span> ${o.price}</div>
                <DemoActionButton message="Esta promoción es demostrativa y todavía no tiene disponibilidad real.">Ver oferta <DemoBadge /></DemoActionButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="demo-note">Ofertas de demostración. Las promociones reales se conectarán con proveedores posteriormente.</p>
    </div>
  );
}

function PackagesView(): JSX.Element {
  const { createItinerary, addToItinerary } = useTravel();
  const [destId, setDestId] = useState(destinations[0].id);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const destHotels = getHotelsByDestination(destId);
  const destActivities = getActivitiesByDestination(destId);
  const destRestaurants = getRestaurantsByDestination(destId);
  const destFlights = getFlightsByDestination(getDestination(destId)?.name ?? '');
  const total = (selectedFlight?.price ?? 0) + (selectedHotel?.pricePerNight ?? 0) * 3 + (selectedActivity?.price ?? 0);

  function savePackage(): void {
    const destination = getDestination(destId);
    const itineraryId = createItinerary(`Viaje a ${destination?.name ?? 'mi destino'}`, destId);
    if (selectedFlight) addToItinerary(itineraryId, 1, { type: 'Vuelo', name: `${selectedFlight.airline} · ${selectedFlight.origin} → ${selectedFlight.destination}` });
    if (selectedHotel) addToItinerary(itineraryId, 1, { type: 'Hotel', name: selectedHotel.name });
    if (selectedActivity) addToItinerary(itineraryId, 2, { type: 'Actividad', name: selectedActivity.name });
    if (selectedRestaurant) addToItinerary(itineraryId, 2, { type: 'Restaurante', name: selectedRestaurant.name });
  }

  return (
    <div className="travel-view">
      <div className="view-header"><h3>Crea tu viaje</h3><DemoBadge /></div>
      <p className="view-subtitle">Combina vuelo, hotel, actividad y restaurante en un solo paquete.</p>
      <div className="inline-form">
        <select value={destId} onChange={(e) => { setDestId(e.target.value); setSelectedFlight(null); setSelectedHotel(null); setSelectedActivity(null); setSelectedRestaurant(null); }}>
          {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
      <div className="package-builder">
        <div className="package-section">
          <h4><Plane size={15} /> Vuelo</h4>
          {destFlights.length === 0 ? <small>No hay vuelos demo para este destino.</small> : (
            <div className="package-options">{destFlights.map((f) => <button key={f.id} className={`package-option ${selectedFlight?.id === f.id ? 'selected' : ''}`} onClick={() => setSelectedFlight(f)}><strong>{f.airline}</strong><small>{f.departureTime} → {f.arrivalTime}</small><span>${f.price}</span>{selectedFlight?.id === f.id && <Check size={14} />}</button>)}</div>
          )}
        </div>
        <div className="package-section">
          <h4><HotelIcon size={15} /> Hotel (3 noches)</h4>
          <div className="package-options">{destHotels.map((h) => <button key={h.id} className={`package-option ${selectedHotel?.id === h.id ? 'selected' : ''}`} onClick={() => setSelectedHotel(h)}><strong>{h.name}</strong><small>{h.location}</small><span>${h.pricePerNight * 3}</span>{selectedHotel?.id === h.id && <Check size={14} />}</button>)}</div>
        </div>
        <div className="package-section">
          <h4><Ticket size={15} /> Actividad</h4>
          <div className="package-options">{destActivities.map((a) => <button key={a.id} className={`package-option ${selectedActivity?.id === a.id ? 'selected' : ''}`} onClick={() => setSelectedActivity(a)}><strong>{a.name}</strong><small>{a.durationHours}h</small><span>${a.price}</span>{selectedActivity?.id === a.id && <Check size={14} />}</button>)}</div>
        </div>
        <div className="package-section">
          <h4><UtensilsCrossed size={15} /> Restaurante (2 cenas)</h4>
          <div className="package-options">{destRestaurants.map((r) => <button key={r.id} className={`package-option ${selectedRestaurant?.id === r.id ? 'selected' : ''}`} onClick={() => setSelectedRestaurant(r)}><strong>{r.name}</strong><small>{r.cuisine}</small><span>{r.priceRange}</span>{selectedRestaurant?.id === r.id && <Check size={14} />}</button>)}</div>
        </div>
      </div>
      <div className="package-summary">
        <h4>Resumen del viaje</h4>
        {selectedFlight && <div className="summary-row"><span>Vuelo: {selectedFlight.airline}</span><strong>${selectedFlight.price}</strong></div>}
        {selectedHotel && <div className="summary-row"><span>Hotel: {selectedHotel.name} (3 noches)</span><strong>${selectedHotel.pricePerNight * 3}</strong></div>}
        {selectedActivity && <div className="summary-row"><span>Actividad: {selectedActivity.name}</span><strong>${selectedActivity.price}</strong></div>}
        {selectedRestaurant && <div className="summary-row"><span>Restaurante: {selectedRestaurant.name} (2 cenas)</span><strong>$--</strong></div>}
        <div className="summary-total"><span>Total estimado</span><strong>${total}</strong></div>
        <button className="action-btn" onClick={savePackage} disabled={!selectedFlight && !selectedHotel && !selectedActivity && !selectedRestaurant}><Calendar size={14} /> Guardar en itinerario</button>
        <p className="demo-note">Precios de demostración. No se procesan compras reales hasta conectar proveedores y pagos.</p>
      </div>
    </div>
  );
}

function ProfileView({ onNavigate }: { onNavigate: (v: View, d?: string) => void }): JSX.Element {
  const { favorites, itineraries } = useTravel();
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Mi perfil de viajero</h3></div>
      <div className="profile-card">
        <div className="profile-avatar"><UserRound size={40} /></div>
        <div><strong>Viajero Gosoky</strong><small>Miembro del ecosistema global</small></div>
      </div>
      <div className="profile-stats">
        <div className="profile-stat"><strong>{favorites.length}</strong><small>Favoritos</small></div>
        <div className="profile-stat"><strong>{itineraries.length}</strong><small>Itinerarios</small></div>
        <div className="profile-stat"><strong>{destinations.length}</strong><small>Destinos explorados</small></div>
      </div>
      <div className="profile-sections">
        <button className="profile-section" onClick={() => onNavigate('favorites')}><Heart size={16} /> Mis favoritos</button>
        <button className="profile-section" onClick={() => onNavigate('itineraries')}><Calendar size={16} /> Mis itinerarios</button>
        <button className="profile-section" onClick={() => onNavigate('cruise-memberships')}><Ship size={16} /> Membresías de crucero</button>
      </div>
      <div className="profile-preferences">
        <h4>Preferencias</h4>
        <div className="pref-row"><span>Idioma preferido</span><strong>Español</strong></div>
        <div className="pref-row"><span>Moneda</span><strong>USD ($)</strong></div>
        <div className="pref-row"><span>Tipo de viaje favorito</span><strong>Cultural</strong></div>
      </div>
    </div>
  );
}

function MapView(): JSX.Element {
  const points = [
    { type: 'Destino', name: 'París', x: 50, y: 35, image: destinations[0].image },
    { type: 'Destino', name: 'Tokio', x: 82, y: 45, image: destinations[1].image },
    { type: 'Destino', name: 'Roma', x: 53, y: 42, image: destinations[2].image },
    { type: 'Destino', name: 'Nueva York', x: 28, y: 38, image: destinations[3].image },
    { type: 'Destino', name: 'Santorini', x: 55, y: 45, image: destinations[4].image },
    { type: 'Destino', name: 'Maldivas', x: 68, y: 60, image: destinations[5].image },
  ];
  const [selected, setSelected] = useState<typeof points[0] | null>(null);
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Mapa del mundo</h3><DemoBadge /></div>
      <div className="map-container">
        <div className="map-placeholder">
          <Globe size={60} />
          <p>Mapa interactivo</p>
          <small>Integración con proveedor de mapas próximamente</small>
        </div>
        {points.map((p) => (
          <button key={p.name} className="map-pin" style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => setSelected(p)}>
            <MapPin size={18} />
          </button>
        ))}
        {selected && (
          <div className="map-popup">
            <img loading="lazy" decoding="async" src={selected.image} alt={selected.name} />
            <div><strong>{selected.name}</strong><small>{selected.type}</small></div>
            <button onClick={() => setSelected(null)}><X size={14} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function CruiseMembershipsView(): JSX.Element {
  return (
    <div className="travel-view">
      <div className="view-header"><h3>Membresías Gosoky Cruises</h3></div>
      <p className="view-subtitle">Membresías independientes de Gosoky Premium. Diseñadas para viajeros que exploran el mundo por mar.</p>
      <div className="membership-grid">
        {cruiseMemberships.map((m) => (
          <div key={m.id} className="membership-card">
            <div className="membership-header"><Ship size={20} /><strong>{m.name}</strong></div>
            <p>{m.description}</p>
            <ul className="membership-benefits">
              {m.benefits.map((b) => <li key={b}><Check size={13} /> {b}</li>)}
            </ul>
            <div className="membership-price"><strong>${m.price}</strong><small>/{m.duration}</small></div>
            <DemoActionButton message="La membresía se podrá contratar cuando se conecte el sistema de pagos autorizado.">Seleccionar <DemoBadge /></DemoActionButton>
          </div>
        ))}
      </div>
      <p className="demo-note">No se procesan pagos reales hasta conectar un sistema de pago autorizado.</p>
    </div>
  );
}
