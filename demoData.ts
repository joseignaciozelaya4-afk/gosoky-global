export type DemoPerson = {
  id: string;
  name: string;
  country: string;
  city: string;
  language: string;
  initials: string;
  color: string;
  interests: string[];
  bio: string;
  age: number;
  profession: string;
  verified: boolean;
};

export const demoPeople: DemoPerson[] = [
  { id: 'p1', name: 'Sofía Martínez', country: 'España', city: 'Barcelona', language: 'Español · Inglés', initials: 'SM', color: '#3c8d78', interests: ['Viajes', 'Fotografía', 'Cultura'], bio: 'Exploradora cultural y amante de las conversaciones que acercan mundos. Creo que cada persona es un universo por descubrir.', age: 28, profession: 'Fotógrafa', verified: true },
  { id: 'p2', name: 'Daniel Okafor', country: 'Nigeria', city: 'Lagos', language: 'English · Français', initials: 'DO', color: '#2d7890', interests: ['Tecnología', 'Música', 'Emprendimiento'], bio: 'Construyo proyectos que conectan oportunidades con comunidades. La música y la tecnología son mis dos lenguajes universales.', age: 32, profession: 'Emprendedor tech', verified: true },
  { id: 'p3', name: 'Aiko Tanaka', country: 'Japón', city: 'Tokio', language: '日本語 · English', initials: 'AT', color: '#b67f32', interests: ['Educación', 'Arte', 'Gastronomía'], bio: 'Creo experiencias de aprendizaje a través del intercambio cultural. La cocina es mi forma favorita de hacer amigos.', age: 26, profession: 'Educadora', verified: false },
  { id: 'p4', name: 'Mateo Rivera', country: 'Colombia', city: 'Medellín', language: 'Español · Português', initials: 'MR', color: '#a65c63', interests: ['Naturaleza', 'Comunidad', 'Viajes'], bio: 'Siempre buscando una nueva ruta y una buena historia para compartir. La montaña es mi segunda casa.', age: 30, profession: 'Guía turístico', verified: true },
  { id: 'p5', name: 'Amara Williams', country: 'Estados Unidos', city: 'Miami', language: 'English · Español', initials: 'AW', color: '#806a9b', interests: ['Creatividad', 'Negocios', 'Idiomas'], bio: 'Creo contenido sobre identidad, negocios y nuevas posibilidades. El mundo necesita más historias honestas.', age: 27, profession: 'Creadora de contenido', verified: true },
  { id: 'p6', name: 'Lucas Pereira', country: 'Brasil', city: 'São Paulo', language: 'Português · English', initials: 'LP', color: '#3c8d78', interests: ['Música', 'Tecnología', 'Cultura'], bio: 'Productor musical conectando sonidos de distintos continentes. La creatividad no tiene fronteras.', age: 29, profession: 'Productor musical', verified: false },
];

export type DemoCourse = {
  id: string;
  category: string;
  title: string;
  description: string;
  progress: number;
  level: string;
  duration: string;
  lessons: { title: string; done: boolean }[];
  isKids: boolean;
};

export const demoCourses: DemoCourse[] = [
  { id: 'course-1', category: 'Idiomas', title: 'Conversaciones sin barreras', description: 'Frases y hábitos para comenzar conversaciones interculturales con confianza.', progress: 68, level: 'Inicial', duration: '4 horas', isKids: false, lessons: [{ title: 'Saludos en 5 idiomas', done: true }, { title: 'Presentaciones personales', done: true }, { title: 'Conversación cotidiana', done: true }, { title: 'Expresar opiniones', done: false }, { title: 'Cierre y despedida', done: false }] },
  { id: 'course-2', category: 'Cultura', title: 'Miradas del mundo', description: 'Un recorrido visual por costumbres, historias y perspectivas globales.', progress: 24, level: 'Todos los niveles', duration: '6 horas', isKids: false, lessons: [{ title: 'Costumbres de bienvenida', done: true }, { title: 'Festivales alrededor del mundo', done: false }, { title: 'Comida como identidad', done: false }, { title: 'El arte de escuchar', done: false }] },
  { id: 'course-3', category: 'Tecnología', title: 'Crea tu primera comunidad', description: 'Principios para diseñar espacios digitales seguros y participativos.', progress: 0, level: 'Intermedio', duration: '8 horas', isKids: false, lessons: [{ title: 'Identidad y propósito', done: false }, { title: 'Reglas y moderación', done: false }, { title: 'Crecimiento orgánico', done: false }, { title: 'Sostenibilidad', done: false }] },
  { id: 'course-4', category: 'Creatividad', title: 'Cuenta tu historia', description: 'Herramientas para convertir experiencias reales en contenido significativo.', progress: 42, level: 'Inicial', duration: '5 horas', isKids: false, lessons: [{ title: 'Encuentra tu voz', done: true }, { title: 'Estructura narrativa', done: true }, { title: 'Formatos digitales', done: false }, { title: 'Publicar con propósito', done: false }] },
  { id: 'course-5', category: 'Idiomas', title: 'Gosoky Kids: Primeras palabras', description: 'Aprende saludos y colores en varios idiomas con juegos y dibujos.', progress: 0, level: 'Infantil', duration: '2 horas', isKids: true, lessons: [{ title: 'Hola en 3 idiomas', done: false }, { title: 'Colores del mundo', done: false }, { title: 'Canción de los números', done: false }] },
  { id: 'course-6', category: 'Cultura', title: 'Gosoky Kids: Niños del mundo', description: 'Descubre cómo viven, juegan y celebran los niños en distintos países.', progress: 0, level: 'Infantil', duration: '3 horas', isKids: true, lessons: [{ title: 'Juegos de cada país', done: false }, { title: 'Comidas favoritas', done: false }, { title: 'Fiestas y tradiciones', done: false }] },
];

export type DemoPost = {
  id: string;
  author: string;
  initials: string;
  color: string;
  category: string;
  text: string;
  likes: number;
  comments: number;
  time: string;
};

export const demoPosts: DemoPost[] = [
  { id: 'post-1', author: 'Sofía Martínez', initials: 'SM', color: '#3c8d78', category: 'Viajes', text: 'La mejor parte de viajar no es llegar: es descubrir cuántas formas existen de sentirse en casa.', likes: 24, comments: 6, time: 'Hace 18 min' },
  { id: 'post-2', author: 'Daniel Okafor', initials: 'DO', color: '#2d7890', category: 'Oportunidades', text: 'Buscando personas interesadas en crear proyectos tecnológicos con impacto social en distintas regiones. ¿Quién se suma?', likes: 41, comments: 12, time: 'Hace 1 h' },
  { id: 'post-3', author: 'Aiko Tanaka', initials: 'AT', color: '#b67f32', category: 'Cultura', text: '¿Qué palabra de tu idioma describe una emoción que no tiene traducción directa? En japonés decimos "komorebi" — la luz del sol filtrándose entre las hojas.', likes: 36, comments: 18, time: 'Hace 3 h' },
];

export type DemoCommunity = {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  color: string;
  initials: string;
};

export const demoCommunities: DemoCommunity[] = [
  { id: 'c1', name: 'Viajeros sin fronteras', description: 'Comunidad para quienes ven cada viaje como una oportunidad de aprender y conectar.', members: 1240, category: 'Viajes', color: '#3c8d78', initials: 'VS' },
  { id: 'c2', name: 'Idiomas del mundo', description: 'Intercambio de idiomas, práctica conversacional y cultura global.', members: 890, category: 'Educación', color: '#2d7890', initials: 'IM' },
  { id: 'c3', name: 'Emprendedores globales', description: 'Negocios, cooperación y oportunidades internacionales.', members: 567, category: 'Negocios', color: '#b67f32', initials: 'EG' },
  { id: 'c4', name: 'Creadores visuales', description: 'Fotografía, video y storytelling con identidad propia.', members: 432, category: 'Creatividad', color: '#a65c63', initials: 'CV' },
];

export const businessListings = [
  { id: 'biz-1', name: 'Mundo Raíz', category: 'Turismo responsable', location: 'Medellín · Colombia', description: 'Experiencias locales diseñadas con comunidades y productores regionales.', initials: 'MR', color: '#3c8d78' },
  { id: 'biz-2', name: 'Lingua Lab', category: 'Educación e idiomas', location: 'Madrid · España', description: 'Programas de conversación para equipos internacionales y viajeros.', initials: 'LL', color: '#2d7890' },
  { id: 'biz-3', name: 'Open Horizons', category: 'Tecnología', location: 'Lagos · Nigeria', description: 'Herramientas digitales para conectar talento con oportunidades globales.', initials: 'OH', color: '#b67f32' },
  { id: 'biz-4', name: 'Cultura Viva', category: 'Eventos culturales', location: 'Barcelona · España', description: 'Productora de eventos que celebran la diversidad y el intercambio.', initials: 'CV', color: '#a65c63' },
];

export const creatorProfiles = [
  { id: 'creator-1', name: 'Amara Williams', category: 'Historias globales', followers: '12.4K', initials: 'AW', color: '#806a9b', content: 'Historias de personas que están creando nuevas rutas.' },
  { id: 'creator-2', name: 'Leo Costa', category: 'Viajes y cultura', followers: '8.7K', initials: 'LC', color: '#a65c63', content: 'Guías visuales para viajar con respeto y curiosidad.' },
  { id: 'creator-3', name: 'Nadia Chen', category: 'Educación', followers: '6.2K', initials: 'NC', color: '#3c8d78', content: 'Aprender idiomas desde las historias cotidianas.' },
];

export const membershipPlans = [
  { id: 'free', name: 'Registro Gosoky Global', price: 'Gratis', description: 'La puerta de entrada al ecosistema.', features: ['Perfil básico', 'Explorar comunidades', 'Guardar favoritos', 'Chat demo'] },
  { id: 'premium', name: 'Gosoky Premium', price: 'Próximamente', description: 'Más herramientas para conexiones globales.', features: ['Llamadas de voz', 'Videollamadas', 'Mensajes ilimitados', 'Funciones avanzadas', 'Experiencias exclusivas', 'Prioridad en nuevas funciones'] },
  { id: 'cruises', name: 'Membresías de Cruceros', price: 'Próximamente', description: 'Una línea independiente para viajeros por mar.', features: ['Ofertas de cruceros', 'Beneficios a bordo', 'Experiencias seleccionadas', 'Concierge futuro'] },
];

export const cruisePlans = [
  { id: 'cruise-1', name: 'Caribe Tropical', duration: '7 noches', region: 'Caribe', description: 'Islas, playas y cultura caribeña con escalas en 4 destinos.', price: 'Desde $1,290', color: '#3c8d78', stops: ['Miami', 'Cozumel', 'Roatán', 'Costa Maya', 'Miami'] },
  { id: 'cruise-2', name: 'Mediterráneo Dorado', duration: '10 noches', region: 'Mediterráneo', description: 'Recorrido cultural por las costas más emblemáticas del sur de Europa.', price: 'Desde $2,150', color: '#b67f32', stops: ['Barcelona', 'Cannes', 'Civitavecchia', 'Nápoles', 'Atenas', 'Barcelona'] },
  { id: 'cruise-3', name: 'Fiordos del Norte', duration: '14 noches', region: 'Escandinavia', description: 'Naturaleza, auroras y diseño nórdico en una travesía inolvidable.', price: 'Desde $3,400', color: '#2d7890', stops: ['Copenhague', 'Bergen', 'Tromsø', 'Reikiavik', 'Copenhague'] },
];

export const cruiseMemberships = [
  { id: 'cm-1', name: 'Gosoky Cruises Explorer', description: 'Membresía inicial para quienes comienzan a explorar el mundo por mar.', benefits: ['Acceso a itinerarios seleccionados', 'Newsletter de ofertas', 'Comunidad de viajeros', 'Soporte básico'] },
  { id: 'cm-2', name: 'Gosoky Cruises Voyager', description: 'Experiencia ampliada para viajeros frecuentes con beneficios premium.', benefits: ['Prioridad en reservas', 'Descuentos en itinerarios', 'Beneficios a bordo', 'Concierge dedicado', 'Eventos exclusivos'] },
];

export const opportunities = [
  { id: 'opp-1', title: 'Cooperación internacional', category: 'Cooperación', description: 'Proyectos de colaboración entre comunidades de distintos países.', color: '#3c8d78' },
  { id: 'opp-2', title: 'Programa de creadores', category: 'Creadores', description: 'Acompañamiento para creadores que comparten historias con impacto global.', color: '#806a9b' },
  { id: 'opp-3', title: 'Becas Gosoky Educa', category: 'Educación', description: 'Acceso a contenido educativo para personas con recursos limitados.', color: '#2d7890' },
  { id: 'opp-4', title: 'Alianzas comerciales', category: 'Negocios', description: 'Conecta tu negocio con audiencias internacionales dentro del ecosistema.', color: '#b67f32' },
];

export const safetyFeatures = [
  { id: 's1', title: 'Protección de cuenta', description: 'Verificación en dos pasos, alertas de actividad y recuperación segura.', icon: 'shield' },
  { id: 's2', title: 'Privacidad', description: 'Controla quién ve tu perfil, tus conexiones y tu información personal.', icon: 'lock' },
  { id: 's3', title: 'Verificación de identidad', description: 'Sello de verificación para perfiles auténticos (futuro).', icon: 'badge' },
  { id: 's4', title: 'Reportar y bloquear', description: 'Herramientas para reportar contenido inapropiado y bloquear usuarios.', icon: 'flag' },
  { id: 's5', title: 'Seguridad infantil', description: 'Áreas separadas, controles parentales y espacios diferenciados para niños.', icon: 'baby' },
  { id: 's6', title: 'Normas de comunidad', description: 'Reglas claras basadas en respeto, consentimiento y responsabilidad.', icon: 'book' },
];
