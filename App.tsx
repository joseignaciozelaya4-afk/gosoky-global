import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight, ChevronDown, CircleCheck, Globe2, ShieldCheck,
  Sparkles, Languages, GraduationCap, Plane, Heart, Users, MessageCircle,
  Cpu, Route as RouteIcon, BriefcaseBusiness, Gem, Network, Target, Lightbulb, Eye, Waves,
} from 'lucide-react';
import { GosokyLogo } from '@/components/GosokyLogo';
import { GosokyChat } from '@/components/GosokyChat';
import { GosokyTranslate } from '@/components/GosokyTranslate';
import { GosokyTravel, type View as TravelView } from '@/components/GosokyTravel';
import { TravelProvider } from '@/components/travel/TravelContext';
import { type LanguageCode } from '@/services/translationService';
import { type PillarDetail } from '@/components/PillarModal';
import { GlobalNav } from '@/components/GlobalNav';
import { ConectaPage, SinglesPage, AmaPage, EducaPage, CommunityPage, BusinessPage, OpportunitiesPage, CreatorsPage, CruisePage, MembershipPage, PremiumPage, ProfilePage, SafetyPage, AuthPage, MapPage, ModuleShell } from '@/pages/ModulePages';

const peopleImage = 'https://images.pexels.com/photos/4907601/pexels-photo-4907601.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const architectureImage = 'https://images.pexels.com/photos/16494354/pexels-photo-16494354.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const founderImage1 = 'https://images.pexels.com/photos/19423069/pexels-photo-19423069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const founderImage2 = 'https://images.pexels.com/photos/29768321/pexels-photo-29768321.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const navItems = [
  ['Visión', 'vision'], ['Chat', 'chat'], ['Travel + Cruises', 'travel'], ['Historia', 'historia'], ['Fundadores', 'fundadores'],
  ['Ecosistema', 'ecosistema'], ['Pilares', 'pilares'], ['Membresías', 'membresias'],
  ['Seguridad', 'seguridad'], ['Hoja de ruta', 'ruta'], ['Inversión', 'inversion'],
];

const pillars = [
  { name: 'CONECTA', icon: Network, color: 'blue', text: 'Personas, comunidades, culturas y oportunidades alrededor del mundo.' },
  { name: 'COMUNICA', icon: MessageCircle, color: 'cyan', text: 'Mensajes, audio, llamadas, videollamadas, publicaciones y transmisiones.' },
  { name: 'TRADUCE', icon: Languages, color: 'gold', text: 'Tecnología e inteligencia artificial orientadas a reducir las barreras de idioma.' },
  { name: 'EDUCA', icon: GraduationCap, color: 'green', text: 'Conocimiento, tecnología, creatividad, idiomas y desarrollo de capacidades.' },
  { name: 'VIAJA', icon: Plane, color: 'orange', text: 'Experiencias, turismo, encuentros, viajes y una visión futura de cruceros.' },
  { name: 'AMA', icon: Heart, color: 'rose', text: 'Relaciones humanas, afecto, amistad y solidaridad con respeto, consentimiento y seguridad.' },
  { name: 'PERTENECE', icon: Users, color: 'violet', text: 'Comunidades donde las personas puedan sentirse parte de algo significativo.' },
];

const pillarDetails: PillarDetail[] = [
  {
    name: 'CONECTA',
    icon: Network,
    color: 'blue',
    tagline: 'Personas, comunidades, culturas y oportunidades alrededor del mundo.',
    purpose: 'Conectar personas de diferentes lugares, culturas y contextos para construir un mundo más cercano donde las barreras no impidan la conexión humana.',
    description: 'GOSOKY CONECTA es el pilar fundamental del ecosistema: la puerta de entrada para que las personas se encuentren, construyan relaciones significativas y accedan a oportunidades globales. Integra perfiles, comunidades, búsqueda avanzada y herramientas para descubrir personas con intereses compartidos.',
    features: [
      'Perfiles personales con identidad, intereses y biografía',
      'Búsqueda avanzada de personas por intereses, ubicación e idioma',
      'Comunidades temáticas y grupos culturales',
      'Sistema de conexiones y solicitudes mutuas',
      'Feed social con publicaciones y actualizaciones',
      'Integración con el resto de los pilares del ecosistema',
    ],
    status: 'DESARROLLO PROGRESIVO · PARTE DEL ECOSISTEMA',
  },
  {
    name: 'COMUNICA',
    icon: MessageCircle,
    color: 'cyan',
    tagline: 'Mensajes, audio, llamadas, videollamadas, publicaciones y transmisiones.',
    purpose: 'Facilitar la comunicación entre personas de diferentes idiomas y culturas mediante mensajería, audio, voz, video y transmisiones en tiempo real.',
    description: 'GOSOKY COMUNICA es el motor de interacción del ecosistema. Permite conversar por texto, audio, llamadas de voz, videollamadas y transmisiones en vivo, con traducción integrada para que el idioma nunca sea una barrera.',
    features: [
      'Mensajería en tiempo real con texto y audio',
      'Llamadas de voz y videollamadas',
      'Transmisiones en vivo (GOSOKY LIVE)',
      'Traducción automática integrada en el chat',
      'Conversaciones grupales y privadas',
      'Soporte multimedia: imágenes, archivos y enlaces',
    ],
    status: 'EN DESARROLLO · CHAT ACTIVO',
  },
  {
    name: 'TRADUCE',
    icon: Languages,
    color: 'gold',
    tagline: 'Tecnología e inteligencia artificial orientadas a reducir las barreras de idioma.',
    purpose: 'Reducir las barreras de idioma mediante tecnología e inteligencia artificial para que las personas puedan comunicarse sin importar su lengua nativa.',
    description: 'GOSOKY TRADUCE utiliza inteligencia artificial para traducir mensajes, textos y conversaciones en tiempo real. Es el puente que permite que personas de diferentes culturas se entiendan y conecten sin fricción.',
    features: [
      'Traducción automática de mensajes en el chat',
      'Panel de traducción independiente (GOSOKY TRANSLATE)',
      'Detección automática de idioma de origen',
      'Soporte para múltiples idiomas internacionales',
      'Traducción de audio y voz (futuro)',
      'Integración con todos los módulos del ecosistema',
    ],
    status: 'VISIÓN TECNOLÓGICA · PROTOTIPO ACTIVO',
  },
  {
    name: 'EDUCA',
    icon: GraduationCap,
    color: 'green',
    tagline: 'Conocimiento, tecnología, creatividad, idiomas y desarrollo de capacidades.',
    purpose: 'Crear oportunidades educativas mediante conocimiento, idiomas, intercambio cultural y desarrollo de capacidades dentro de una comunidad global.',
    description: 'GOSOKY EDUCA es el pilar formativo del ecosistema. Ofrece acceso a aprendizaje de idiomas, intercambio cultural, desarrollo de habilidades tecnológicas y contenido educativo creado por la comunidad y por creadores.',
    features: [
      'Aprendizaje de idiomas integrado',
      'Intercambio cultural entre miembros',
      'Contenido educativo y cursos',
      'Herramientas para creadores (GOSOKY CREATORS)',
      'Desarrollo de capacidades tecnológicas',
      'Certificaciones y reconocimiento de logros (futuro)',
    ],
    status: 'PRÓXIMAMENTE · DESARROLLO PROGRESIVO',
  },
  {
    name: 'VIAJA',
    icon: Plane,
    color: 'orange',
    tagline: 'Experiencias, turismo, encuentros, viajes y una visión futura de cruceros.',
    purpose: 'Abrir el mundo mediante experiencias, turismo, encuentros y viajes, con una visión futura de cruceros como línea independiente.',
    description: 'GOSOKY VIAJA integra planificación de viajes, destinos, vuelos, hoteles, restaurantes, actividades y experiencias. Incluye GOSOKY TRAVEL y GOSOKY CRUISES como dos líneas complementarias dentro del mismo pilar.',
    features: [
      'Exploración de destinos internacionales',
      'Búsqueda de vuelos y hoteles',
      'Reservas de restaurantes y actividades',
      'Itinerarios personalizados guardables',
      'GOSOKY CRUISES: visión futura de cruceros',
      'Experiencias y actividades por destino',
    ],
    modules: ['DESTINOS', 'VUELOS', 'HOTELES', 'RESTAURANTES', 'CRUCEROS', 'ACTIVIDADES Y EXPERIENCIAS', 'EXPLORACIÓN POR DESTINOS'],
    status: 'VISIÓN FUTURA · PROTOTIPO ACTIVO',
  },
  {
    name: 'AMA',
    icon: Heart,
    color: 'rose',
    tagline: 'Relaciones humanas, afecto, amor, amistad y solidaridad con respeto, consentimiento y seguridad.',
    purpose: 'Representar relaciones humanas, afecto, amor, amistad y solidaridad bajo principios de respeto, consentimiento, seguridad y responsabilidad.',
    description: 'GOSOKY AMA es el pilar que honra las relaciones humanas. Conecta con GOSOKY SINGLES para facilitar encuentros significativos entre personas, siempre bajo principios de respeto, consentimiento, seguridad y responsabilidad.',
    features: [
      'Conexiones significativas entre personas (GOSOKY SINGLES)',
      'Relaciones humanas con respeto y consentimiento',
      'Amistad, afecto y solidaridad',
      'Seguridad y moderación como prioridad',
      'Protección y controles para usuarios',
      'Principios: RESPETO · CONSENTIMIENTO · SEGURIDAD · RESPONSABILIDAD',
    ],
    status: 'PARTE DEL ECOSISTEMA · DESARROLLO PROGRESIVO',
  },
  {
    name: 'PERTENECE',
    icon: Users,
    color: 'violet',
    tagline: 'Comunidades donde las personas puedan sentirse parte de algo significativo.',
    purpose: 'Construir una comunidad basada en identidad, participación, cooperación y respeto donde cada persona pueda sentirse incluida y valorada.',
    description: 'GOSOKY PERTENECE es el pilar comunitario del ecosistema. Busca que las personas encuentren un espacio donde sentirse parte de algo significativo, con identidad, inclusión, participación y cooperación.',
    features: [
      'Comunidades con identidad compartida',
      'Inclusión y diversidad como valores',
      'Participación activa de los miembros',
      'Cooperación y colaboración entre usuarios',
      'Espacios seguros y moderados',
      'Sentido de pertenencia global',
    ],
    status: 'PARTE DEL ECOSISTEMA · DESARROLLO PROGRESIVO',
  },
];

const ecosystem = [
  ['GOSOKY SOCIAL', 'NÚCLEO', 'blue'], ['GOSOKY CHAT', 'EN DESARROLLO', 'cyan'], ['GOSOKY TRANSLATE', 'VISIÓN TECNOLÓGICA', 'gold'],
  ['GOSOKY LIVE', 'PRÓXIMAMENTE', 'green'], ['GOSOKY EDUCA', 'PRÓXIMAMENTE', 'green'], ['GOSOKY SINGLES', 'PARTE DEL ECOSISTEMA', 'orange'],
  ['GOSOKY KIDS', 'VISIÓN FUTURA', 'violet'], ['GOSOKY TRAVEL', 'VISIÓN FUTURA', 'cyan'], ['GOSOKY CRUISES', 'VISIÓN FUTURA', 'gold'],
  ['GOSOKY OPPORTUNITIES', 'VISIÓN FUTURA', 'blue'], ['GOSOKY CREATORS', 'VISIÓN FUTURA', 'rose'], ['GOSOKY MARKET', 'VISIÓN FUTURA', 'green'],
];

const principles = ['RESPETO', 'INCLUSIÓN', 'OPORTUNIDADES', 'COOPERACIÓN', 'INNOVACIÓN', 'TRANSPARENCIA', 'RESPONSABILIDAD', 'HUMANIDAD', 'SEGURIDAD'];

const ecosystemTargets: Record<string, string> = {
  'GOSOKY SOCIAL': '/comunidad',
  'GOSOKY CHAT': '/chat',
  'GOSOKY TRANSLATE': '/translate',
  'GOSOKY SINGLES': '/singles',
  'GOSOKY TRAVEL': '/travel',
  'GOSOKY CRUISES': '/cruises',
};

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label"><span />{children}</p>;
}

export function HomePage() {
  const navigate = useNavigate();

  function openPillar(index: number): void {
    const routes: Record<string, string> = { CONECTA: '/conecta', COMUNICA: '/chat', TRADUCE: '/translate', EDUCA: '/educa', VIAJA: '/travel', AMA: '/ama', PERTENECE: '/pertenece' };
    navigate(routes[pillarDetails[index].name]);
  }

  return (
    <div className="site-shell">
      <main>
        <section id="inicio" className="hero">
          <div className="hero-grid" />
          <div className="glow glow-one" /><div className="glow glow-two" />
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow"><span className="pulse-dot" />GOSOKY GLOBAL · MUNDIAL · SIN BARRERAS</div>
              <h1>La puerta al mundo,<br /><em>sin barreras.</em></h1>
              <p className="hero-lead">GOSOKY GLOBAL reúne conexión humana, comunicación, traducción, educación, viajes y oportunidades en un ecosistema digital internacional. No es solamente una aventura, es tu nuevo mundo real.</p>
              <div className="hero-buttons"><a className="button button-primary" href="/conecta">Comenzar la aventura <ArrowUpRight size={17} /></a><a className="button button-ghost" href="#ecosistema">Explorar GOSOKY <ChevronDown size={16} /></a></div>
              <div className="hero-pillars">CONECTA <i>•</i> COMUNICA <i>•</i> TRADUCE <i>•</i> EDUCA <i>•</i> VIAJA <i>•</i> AMA <i>•</i> PERTENECE</div>
            </div>
            <div className="hero-visual"><div className="orbital orbital-a" /><div className="orbital orbital-b" /><div className="world-orb"><GosokyLogo size={300} className="hero-logo" /></div><div className="orbit-tag tag-top"><span />142° 24' N<br /><b>CONEXIÓN ACTIVA</b></div><div className="orbit-tag tag-bottom"><span />TODOS LOS CAMINOS<br /><b>COMIENZAN AQUÍ</b></div></div>
          </div>
          <div className="scroll-cue"><span />Desplaza para explorar</div>
        </section>

        <GosokyChat />

        <TravelProvider><GosokyTravel /></TravelProvider>

        <section id="vision" className="section intro-section">
          <div className="container two-col align-center"><div><SectionLabel>01 / LA VISIÓN</SectionLabel><h2>No es solamente<br /><span>una red social.</span></h2></div><div className="intro-copy"><p className="large-copy">GOSOKY busca construir un espacio digital mundial donde la tecnología esté al servicio de las personas y donde el idioma, la distancia y las diferencias culturales no tengan que separar a quienes desean conectar.</p><a className="text-link" href="#pilares">Descubre nuestros pilares <ArrowUpRight size={16} /></a></div></div>
          <div className="container manifesto"><div className="manifesto-line" /><div><p className="quote">“Yo conocí las barreras antes de pensar en crear una plataforma para derribarlas.”</p><p className="quote-credit">LA VISIÓN / GOSOKY GLOBAL</p></div></div>
        </section>

        <section className="section dark-section purpose-section"><div className="container purpose-grid"><div><SectionLabel>PROPÓSITO / MISIÓN / VISIÓN</SectionLabel><h2>Un mismo propósito.<br /><span>Un mundo más cercano.</span></h2><div className="purpose-image"><img loading="lazy" decoding="async" src={peopleImage} alt="Personas compartiendo un momento de conexión y viaje" /><div className="image-caption">PERSONAS / CULTURAS / OPORTUNIDADES</div></div></div><div className="purpose-cards"><article><Target size={22} /><h3>PROPÓSITO</h3><p>Conectar personas, culturas, idiomas y oportunidades para construir un mundo más cercano, donde las barreras no impidan la conexión humana.</p></article><article><Eye size={22} /><h3>VISIÓN</h3><p>Construir un ecosistema digital global que acerque a las personas y contribuya a crear un mundo donde las fronteras, la distancia y el idioma no sean barreras.</p></article><article><Lightbulb size={22} /><h3>MISIÓN</h3><p>Utilizar la tecnología para conectar personas, facilitar la comunicación entre idiomas y culturas, crear oportunidades y construir comunidad.</p></article></div></div></section>

        <section id="pilares" className="section pillars-section"><div className="container"><div className="section-heading"><div><SectionLabel>02 / LOS SIETE PILARES</SectionLabel><h2>La arquitectura de<br /><span>una conexión humana.</span></h2></div><p>Una identidad. Siete formas de acercar el mundo. Cada pilar es una puerta hacia una comunidad más abierta, diversa y conectada.</p></div><div className="pillar-grid">{pillars.map(({ name, icon: Icon, color, text }, i) => <article className={`pillar-card ${color}`} key={name} onClick={() => openPillar(i)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPillar(i); } } }><div className="pillar-number">0{i + 1}</div><Icon className="pillar-icon" size={27} strokeWidth={1.4} /><h3>{name}</h3><p>{text}</p><span className="card-arrow"><ArrowUpRight size={16} /></span></article>)}</div></div></section>

        <section id="historia" className="section history-section"><div className="container"><div className="section-heading"><div><SectionLabel>03 / NUESTRA HISTORIA</SectionLabel><h2>Una visión mundial<br /><span>comenzó con una historia real.</span></h2></div><p>La historia de Gosoky nace de experiencias con necesidad, trabajo, fe, distancia, oportunidades y una barrera que se volvió parte esencial de la visión: el idioma.</p></div><div className="timeline"><div className="timeline-line" />{[['01', '1976 · LA MOSQUITIA, HONDURAS', 'José Ignacio Zelaya Godoy nace en un contexto de pobreza extrema y estudia hasta tercer grado debido a la falta de recursos.'], ['02', '12 AÑOS · TRABAJO Y APRENDIZAJE', 'Sale de su hogar para trabajar y comienza un camino marcado por esfuerzo y perseverancia.'], ['03', 'AÑO 2000 · UNA FAMILIA', 'Regresa a su comunidad, conoce a Elena Marina Osorno Carrillo y juntos comienzan una vida atravesando momentos difíciles.'], ['04', 'EXPERIENCIA · OFICIOS Y SERVICIO', 'Trabaja en joyería, aprende el área técnica de odontología y elaboración de prótesis dentales, estudia teología y sirve a Dios.'], ['05', 'LA BARRERA · ESTADOS UNIDOS', 'La experiencia de vivir en otro país vuelve a mostrar una realidad concreta: las personas pueden estar cerca y aun así no entenderse por el idioma.'], ['06', 'LA PREGUNTA', '“Señor, yo sé que hay más personas que necesitan ayuda. ¿Cómo lo hago?” De esa búsqueda comienza a tomar forma una visión mayor.'], ['07', 'GOSOKY GLOBAL', 'La idea original de conectar solteros evoluciona hacia un ecosistema digital mundial sin perder su origen humano.']].map(([num, title, copy]) => <div className="timeline-item" key={num}><div className="timeline-marker">{num}</div><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></section>

        <section id="fundadores" className="section founders-section dark-section"><div className="container"><div className="section-heading"><div><SectionLabel>04 / FUNDADORES DE GOSOKY GLOBAL</SectionLabel><h2>Detrás de Gosoky<br /><span>hay una historia humana.</span></h2></div><p>Gosoky Global no nació solamente de una idea tecnológica. Nació de experiencias reales, dificultades, perseverancia y del deseo de encontrar una manera de ayudar a más personas.</p></div><div className="founder-cards"><article className="founder-card"><div className="founder-photo"><img loading="lazy" decoding="async" src={founderImage1} alt="José Ignacio Zelaya Godoy, co-fundador de GOSOKY GLOBAL" /><div className="founder-photo-frame" /></div><div className="founder-info"><span className="founder-num">01</span><h3>José Ignacio Zelaya Godoy</h3><p className="founder-role">CO-FUNDADOR · VISIONARIO</p><div className="founder-divider" /><p className="founder-bio">Impulsor de la visión de construir un mundo más conectado, donde el idioma, la distancia y las oportunidades no sean barreras para las personas.</p></div></article><article className="founder-card"><div className="founder-photo"><img loading="lazy" decoding="async" src={founderImage2} alt="Elena Marina Osorno Carrillo, co-fundadora de GOSOKY GLOBAL" /><div className="founder-photo-frame" /></div><div className="founder-info"><span className="founder-num">02</span><h3>Elena Marina Osorno Carrillo</h3><p className="founder-role">CO-FUNDADORA · ÁREA ADMINISTRATIVA Y ECONÓMICA</p><div className="founder-divider" /><p className="founder-bio">Parte fundamental del camino de Gosoky, aportando visión, compromiso, administración y perseverancia a la construcción del proyecto.</p></div></article></div><p className="founder-note">“Los sueños inspiran el comienzo. La disciplina construye el camino. La perseverancia convierte la visión en realidad.”</p></div></section>

        <section id="ecosistema" className="section ecosystem-section"><div className="container"><div className="section-heading"><div><SectionLabel>05 / ECOSISTEMA</SectionLabel><h2>El ecosistema<br /><span>Gosoky.</span></h2></div><p>Gosoky integra diferentes experiencias en una misma visión tecnológica. Cada módulo debe crecer de forma progresiva, transparente y escalable.</p></div><div className="ecosystem-layout"><div className="ecosystem-core"><div className="core-ring ring-1" /><div className="core-ring ring-2" /><Globe2 size={66} /><strong>GOSOKY<br /><b>GLOBAL</b></strong><small>EL MUNDO SIN BARRERAS</small></div><div className="ecosystem-list">{ecosystem.map(([name, status, color]) => <a className="eco-row" href={ecosystemTargets[name] ?? '#ecosistema'} key={name}><span className={`eco-dot ${color}`} /><strong>{name}</strong><span className={`status ${color}`}>{status}</span><ArrowUpRight size={16} /></a>)}</div></div><div className="complementary"><span>LÍNEAS COMPLEMENTARIAS</span>{['GOSOKY PREMIUM', 'GOSOKY KITS', 'GOSOKY OPORTUNITIES'].map(x => <b key={x}>{x}</b>)}</div></div></section>

        <section id="membresias" className="section products-section dark-section"><div className="container"><SectionLabel>06 / LÍNEAS DEL ECOSISTEMA</SectionLabel><div className="product-feature"><div><p className="product-kicker">ORIGEN Y EVOLUCIÓN</p><h2>GOSOKY<br /><span>SINGLES</span></h2><p className="large-copy">Una línea enfocada en conectar personas solteras y facilitar la comunicación entre personas de diferentes lugares, integrando conexión, cultura, viajes y pertenencia.</p><a className="button button-outline" href="#parte">Explorar la visión <ArrowUpRight size={16} /></a></div><div className="product-visual"><Heart size={104} strokeWidth={0.6} /><div>CONEXIONES<br /><b>SIGNIFICATIVAS</b></div></div></div><div className="product-cards"><article><Gem size={22} /><p className="product-kicker">MEMBRESÍA OPCIONAL</p><h3>GOSOKY PREMIUM</h3><p>El registro a GOSOKY es gratuito. El servicio básico es limitado. Premium contempla llamadas de voz, videollamadas, mensajes ilimitados y futuras herramientas, sin precios definitivos anunciados en esta etapa.</p><span>DESARROLLO PROGRESIVO</span></article><article><Waves size={22} /><p className="product-kicker">LÍNEA INDEPENDIENTE</p><h3>GOSOKY CRUCEROS</h3><p>Una línea independiente con dos modalidades de membresía. Cada una tendrá posteriormente sus propias condiciones, beneficios, características, precios y operación.</p><span>VISIÓN FUTURA</span></article><article><BriefcaseBusiness size={22} /><p className="product-kicker">FUTURA EXPANSIÓN</p><h3>GOSOKY KITS</h3><p>Una futura línea de productos y soluciones que representa una oportunidad de expansión comercial dentro del ecosistema global.</p><span>PRÓXIMA ETAPA</span></article></div></div></section>

        <section className="section capabilities-section"><div className="container capability-grid"><article className="capability-main"><SectionLabel>07 / EXPERIENCIAS</SectionLabel><h2>Herramientas para<br /><span>un mundo conectado.</span></h2><p className="large-copy">La visión tecnológica contempla mensajería, comunicación, traducción, voz y video. Todo se desarrolla progresivamente, con la responsabilidad de no prometer lo que todavía está en construcción.</p><div className="capability-tags"><span><MessageCircle size={15} />Mensajería</span><span><Languages size={15} />Traducción</span><span><GraduationCap size={15} />Educación</span><span><Plane size={15} />Viajes</span></div></article><article className="capability-card"><div className="cap-icon"><GraduationCap /></div><p className="product-kicker">GOSOKY EDUCA</p><h3>Aprender también es conectar.</h3><p>Conocimiento, idiomas e intercambio cultural como parte de una comunidad global con más oportunidades educativas.</p><span>DESARROLLO PROGRESIVO</span></article><article className="capability-card image-card"><img loading="lazy" decoding="async" src={architectureImage} alt="Arquitectura moderna que representa innovación" /><div className="image-card-overlay"><p className="product-kicker">GOSOKY VIAJA</p><h3>El mundo está por descubrirse.</h3><p>Destinos, culturas, movilidad y nuevas experiencias internacionales.</p></div></article></div></section>

        <section className="section ama-section dark-section"><div className="container ama-layout"><div className="ama-icon"><Heart size={110} strokeWidth={0.65} /></div><div><SectionLabel>08 / UN PILAR ESPECIAL</SectionLabel><h2>AMA<br /><span>con respeto.</span></h2><p className="large-copy">Representa relaciones humanas, afecto, amor, amistad y solidaridad. Siempre bajo principios de respeto, consentimiento, seguridad y responsabilidad.</p><div className="respect-list"><span>RESPETO</span><span>CONSENTIMIENTO</span><span>SEGURIDAD</span><span>RESPONSABILIDAD</span></div></div></div></section>

        <section className="section belong-section"><div className="container belong-layout"><div><SectionLabel>09 / PERTENECE</SectionLabel><h2>Una comunidad<br /><span>donde cabemos todos.</span></h2><p className="large-copy">Pertenecer es sentirse incluido, valorado y parte de algo. GOSOKY GLOBAL busca construir una comunidad basada en identidad, participación, cooperación y respeto.</p><a className="text-link" href="#parte">Construir comunidad <ArrowUpRight size={16} /></a></div><div className="belong-orbit"><div className="belong-center"><Users size={30} /><span>PERTENECE</span></div><div className="belong-node node-1">IDENTIDAD</div><div className="belong-node node-2">INCLUSIÓN</div><div className="belong-node node-3">PARTICIPACIÓN</div><div className="belong-node node-4">COOPERACIÓN</div></div></div></section>

        <section id="seguridad" className="section security-section dark-section"><div className="container security-grid"><div><SectionLabel>10 / SEGURIDAD</SectionLabel><h2>La tecnología debe<br /><span>proteger a las personas.</span></h2><p className="large-copy">Gosoky debe diseñarse con privacidad, moderación, controles y protección como prioridades. Las funciones de seguridad se implementarán progresivamente conforme evolucione la plataforma.</p><div className="security-badge"><ShieldCheck size={25} /><span>SEGURIDAD · PRIVACIDAD · CONFIANZA</span></div></div><div className="security-features">{['Privacidad y protección de información personal', 'Moderación para reportar, bloquear y prevenir abusos', 'Protección infantil con controles y espacios separados'].map((x, i) => <div key={x}><span>0{i + 1}</span><CircleCheck size={17} /><b>{x}</b></div>)}</div></div></section>

        <section className="section architecture-section"><div className="container"><div className="section-heading"><div><SectionLabel>11 / TECNOLOGÍA</SectionLabel><h2>Diseñada para<br /><span>evolucionar.</span></h2></div><p>Una arquitectura modular, integrada, escalable, flexible y sostenible permite construir con claridad y crecer con responsabilidad.</p></div><div className="architecture-diagram"><div className="arch-center"><Cpu size={30} /><b>GOSOKY<br />CORE</b></div>{['IDENTIDAD', 'CONEXIÓN', 'COMUNICACIÓN', 'TRADUCCIÓN', 'IA', 'DATOS', 'SEGURIDAD', 'MEMBRESÍAS', 'COMUNIDAD', 'VIAJES'].map((x, i) => <div className={`arch-node arch-${i}`} key={x}>{x}</div>)}</div><div className="ai-band"><Sparkles size={22} /><div><b>INTELIGENCIA ARTIFICIAL COMO TECNOLOGÍA ESTRATÉGICA</b><p>Traducción, asistencia, personalización, moderación, seguridad, soporte y educación: posibles usos que se desarrollarán progresivamente.</p></div></div></div></section>

        <section id="ruta" className="section roadmap-section dark-section"><div className="container"><div className="section-heading"><div><SectionLabel>12 / HOJA DE RUTA</SectionLabel><h2>Crecer por etapas.<br /><span>Pensar global desde el principio.</span></h2></div><p>La transparencia es parte de la confianza. Las funciones se presentan según su etapa real y no como capacidades ya disponibles.</p></div><div className="roadmap">{[['01', 'GOSOKY SOCIAL', 'La puerta de entrada al ecosistema.'], ['02', 'CHAT + TRANSLATE', 'Comunicación internacional y traducción.'], ['03', 'LIVE + EDUCA', 'Contenido, aprendizaje y creadores.'], ['04+', 'SINGLES + TRAVEL + BUSINESS', 'Conexiones, experiencias y oportunidades.']].map(([num, title, copy], i) => <div className={`roadmap-step ${i === 0 ? 'active' : ''}`} key={num}><span>{num}</span><RouteIcon size={19} /><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>

        <section className="section opportunity-section"><div className="container opportunity-grid"><div><SectionLabel>13 / OPORTUNIDADES</SectionLabel><h2>Conectar también<br /><span>es crear futuro.</span></h2><p className="large-copy">GOSOKY GLOBAL busca generar oportunidades mediante conexión, educación, viajes, comercio, tecnología, emprendimiento, cooperación y nuevos servicios.</p></div><div className="opportunity-list">{[
  ['Conexión', 'pilares'], ['Educación', 'pilares'], ['Viajes', 'travel'], ['Comercio', 'ecosistema'],
  ['Tecnología', 'vision'], ['Emprendimiento', 'inversion'], ['Cooperación', 'parte'], ['Relaciones internacionales', 'ecosistema'],
].map(([label, id], i) => <a key={label} href={`#${id}`}><span>0{i + 1}</span><b>{label}</b><ArrowUpRight size={16} /></a>)}</div></div></section>

        <section id="inversion" className="section investment-section dark-section"><div className="container investment-grid"><div><SectionLabel>14 / INVERSIÓN</SectionLabel><h2>Una oportunidad<br /><span>para construir lo que sigue.</span></h2><p className="large-copy">GOSOKY GLOBAL representa una visión de ecosistema digital global con posibilidad de crecimiento progresivo y diversificación.</p><a className="button button-primary" href="#parte">Conocer la oportunidad <ArrowUpRight size={17} /></a></div><div className="investment-panel"><p>ÁREAS POTENCIALES</p>{['Tecnología e infraestructura', 'Expansión y desarrollo de productos', 'Seguridad y marketing', 'Internacionalización', 'Nuevas líneas de negocio'].map(x => <div key={x}><CircleCheck size={16} />{x}</div>)}<small>La información financiera detallada será desarrollada posteriormente en el módulo específico de inversión.</small></div></div></section>

        <section className="section principles-section"><div className="container"><div className="principle-header"><SectionLabel>15 / PRINCIPIOS</SectionLabel><h2>La tecnología al servicio<br /><span>de las personas.</span></h2></div><div className="principle-grid">{principles.map((x, i) => <div key={x}><span>0{i + 1}</span><b>{x}</b></div>)}</div><div className="philosophy"><p>“Los sueños inspiran el comienzo.<br />La disciplina construye el camino.<br /><b>La perseverancia convierte la visión en realidad.</b>”</p><span>FILOSOFÍA GOSOKY GLOBAL</span></div></div></section>

        <section className="declaration"><div className="container declaration-inner"><Globe2 size={34} /><p>GOSOKY GLOBAL cree que la tecnología tiene mayor valor cuando sirve para acercar a las personas, conectar culturas, facilitar oportunidades y construir relaciones humanas más allá de las fronteras.</p><span>GOSOKY GLOBAL / EL MUNDO SIN BARRERAS</span></div></section>
      </main>

      <footer id="parte" className="footer"><div className="container"><div className="footer-top"><div><a href="#inicio" className="brand footer-brand"><GosokyLogo size={36} /><span>GOSOKY <b>GLOBAL</b></span></a><p>EL MUNDO SIN BARRERAS</p><div className="footer-pillars">CONECTA • COMUNICA • TRADUCE • EDUCA<br />VIAJA • AMA • PERTENECE</div></div><div className="footer-nav"><p>NAVEGACIÓN</p>{navItems.slice(0, 8).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div className="footer-contact"><p>LA VISIÓN CONTINÚA</p><h3>¿Quieres ser parte<br />de lo que sigue?</h3><a className="button button-primary" href="#fundadores">Conocer a los fundadores <ArrowUpRight size={16} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} GOSOKY GLOBAL</span><span>CONSTRUIR • VALIDAR • MEJORAR • ESCALAR</span><span>EL MUNDO SIN BARRERAS</span></div></div></footer>

    </div>
  );
}

function TranslateRoute() {
  const navigate = useNavigate();
  function savePreferences(source: LanguageCode | 'auto', target: LanguageCode): void {
    try {
      localStorage.setItem('gosoky-translate-prefs', JSON.stringify({ source, target }));
    } catch {
      // Preference storage is optional in demo mode.
    }
  }
  return <GosokyTranslate open initialText="" preferredSource="auto" preferredTarget="en" onClose={() => navigate('/')} onSavePreferences={savePreferences} />;
}

function TravelRoute({ view = 'dashboard' }: { view?: TravelView }) {
  return <TravelProvider><GosokyTravel initialView={view} /></TravelProvider>;
}

function ChatRoute() {
  return <ModuleShell eyebrow="COMUNICA · GOSOKY CHAT" title="Habla con el mundo." description="Mensajería demo preparada para conversaciones, historial y traducción integrada."><GosokyChat /></ModuleShell>;
}

function AppRoutes() {
  return <>
    <GlobalNav />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/conecta" element={<ConectaPage />} />
      <Route path="/chat" element={<ChatRoute />} />
      <Route path="/translate" element={<TranslateRoute />} />
      <Route path="/educa" element={<EducaPage />} />
      <Route path="/travel" element={<TravelRoute />} />
      <Route path="/destinations" element={<TravelRoute view="destinations" />} />
      <Route path="/flights" element={<TravelRoute view="flights" />} />
      <Route path="/hotels" element={<TravelRoute view="hotels" />} />
      <Route path="/restaurants" element={<TravelRoute view="restaurants" />} />
      <Route path="/cruises" element={<CruisePage />} />
      <Route path="/activities" element={<TravelRoute view="activities" />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/mapa" element={<MapPage />} />
      <Route path="/ama" element={<AmaPage />} />
      <Route path="/comunidad" element={<CommunityPage />} />
      <Route path="/pertenece" element={<CommunityPage />} />
      <Route path="/singles" element={<SinglesPage />} />
      <Route path="/negocios" element={<BusinessPage />} />
      <Route path="/opportunities" element={<OpportunitiesPage />} />
      <Route path="/creadores" element={<CreatorsPage />} />
      <Route path="/membresias" element={<MembershipPage />} />
      <Route path="/premium" element={<PremiumPage />} />
      <Route path="/safety" element={<SafetyPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/registro" element={<AuthPage mode="register" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>;
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}

