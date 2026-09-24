export type DestinationType = 'beach' | 'capital' | 'cultural' | 'adventure' | 'romantic' | 'family' | 'cruise';

export type Destination = {
  id: string;
  name: string;
  country: string;
  city: string;
  image: string;
  description: string;
  type: DestinationType;
  rating: number;
  climate: string;
  highlights: string[];
  language: string;
  currency: string;
};

export type Flight = {
  id: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  class: string;
  baggage: string;
};

export type Hotel = {
  id: string;
  name: string;
  destinationId: string;
  image: string;
  location: string;
  category: number;
  rating: number;
  amenities: string[];
  pricePerNight: number;
  description: string;
};

export type Restaurant = {
  id: string;
  name: string;
  destinationId: string;
  image: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: string;
  description: string;
};

export type Cruise = {
  id: string;
  shipName: string;
  line: string;
  image: string;
  route: string;
  destinations: string[];
  durationDays: number;
  departureDate: string;
  ports: string[];
  cabinCategories: string[];
  experiences: string[];
  priceFrom: number;
  description: string;
};

export type ActivityCategory = 'beach' | 'adventure' | 'culture' | 'gastronomy' | 'romantic' | 'family' | 'entertainment' | 'nature' | 'sports' | 'shopping' | 'special';

export type Activity = {
  id: string;
  name: string;
  destinationId: string;
  image: string;
  category: ActivityCategory;
  description: string;
  durationHours: number;
  rating: number;
  price: number;
};

export type TravelEvent = {
  id: string;
  name: string;
  destinationId: string;
  image: string;
  type: string;
  date: string;
  description: string;
};

export type CruiseMembership = {
  id: string;
  name: string;
  benefits: string[];
  duration: string;
  price: number;
  description: string;
};

export type FavoriteItem = {
  id: string;
  type: 'destination' | 'hotel' | 'restaurant' | 'flight' | 'cruise' | 'activity' | 'event';
  name: string;
  subtitle: string;
  image: string;
};

export type ItineraryDay = {
  day: number;
  items: { type: string; name: string; time?: string }[];
};

export type Itinerary = {
  id: string;
  title: string;
  destinationId: string;
  days: ItineraryDay[];
  createdAt: string;
};

export const destinations: Destination[] = [
  {
    id: 'paris', name: 'París', country: 'Francia', city: 'París',
    image: 'https://images.pexels.com/photos/16496484/pexels-photo-16496484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'La ciudad del amor, la luz y la cultura. Desde la Torre Eiffel hasta el Louvre, París es un destino que combina historia, arte y gastronomía mundial.',
    type: 'romantic', rating: 4.9, climate: 'Templado, 15°C promedio',
    highlights: ['Torre Eiffel', 'Museo del Louvre', 'Catedral de Notre-Dame', 'Campos Elíseos', 'Montmartre'],
    language: 'Francés', currency: 'EUR (€)',
  },
  {
    id: 'tokyo', name: 'Tokio', country: 'Japón', city: 'Tokio',
    image: 'https://images.pexels.com/photos/20392882/pexels-photo-20392882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Donde la tradición milenaria se encuentra con el futuro. Tokio ofrece templos antiguos, neón futurista, la mejor gastronomía del mundo y una cultura única.',
    type: 'cultural', rating: 4.8, climate: 'Subtropical, 18°C promedio',
    highlights: ['Templo Sensō-ji', 'Shibuya Crossing', 'Monte Fuji', 'Palacio Imperial', 'Barrio de Ginza'],
    language: 'Japonés', currency: 'JPY (¥)',
  },
  {
    id: 'rome', name: 'Roma', country: 'Italia', city: 'Roma',
    image: 'https://images.pexels.com/photos/14836534/pexels-photo-14836534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'La ciudad eterna. Milenios de historia en cada esquina: el Coliseo, el Vaticano, la Fontana di Trevi y una gastronomía que ha conquistado el mundo.',
    type: 'cultural', rating: 4.8, climate: 'Mediterráneo, 20°C promedio',
    highlights: ['Coliseo Romano', 'Vaticano', 'Fontana di Trevi', 'Foro Romano', 'Panteón'],
    language: 'Italiano', currency: 'EUR (€)',
  },
  {
    id: 'newyork', name: 'Nueva York', country: 'Estados Unidos', city: 'Nueva York',
    image: 'https://images.pexels.com/photos/38048122/pexels-photo-38048122.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'La ciudad que nunca duerme. Rascacielos, Broadway, Central Park y una mezcla de culturas de todo el mundo en una sola ciudad.',
    type: 'capital', rating: 4.7, climate: 'Continental, 13°C promedio',
    highlights: ['Estatua de la Libertad', 'Central Park', 'Times Square', 'Brooklyn Bridge', 'MoMA'],
    language: 'Inglés', currency: 'USD ($)',
  },
  {
    id: 'santorini', name: 'Santorini', country: 'Grecia', city: 'Santorini',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'La joya del mar Egeo. Casas blancas y cúpulas azules sobre acantilados volcánicos, atardeceres legendarios y playas de arena única.',
    type: 'romantic', rating: 4.9, climate: 'Mediterráneo, 22°C promedio',
    highlights: ['Oia al atardecer', 'Caldera', 'Playa Roja', 'Akrotiri', 'Bodegas locales'],
    language: 'Griego', currency: 'EUR (€)',
  },
  {
    id: 'maldives', name: 'Maldivas', country: 'Maldivas', city: 'Malé',
    image: 'https://images.pexels.com/photos/9149359/pexels-photo-9149359.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Un paraíso tropical de aguas turquesa, arrecifes de coral y villas sobre el agua. El destino definitivo para desconectar y soñar.',
    type: 'beach', rating: 4.9, climate: 'Tropical, 28°C promedio',
    highlights: ['Buceo en arrecifes', 'Villas sobre el agua', 'Playas de arena blanca', 'Puesta de sol en el índico', 'Spa flotante'],
    language: 'Dhivehi', currency: 'MVR (Rf)',
  },
];

export const flights: Flight[] = [
  { id: 'f1', airline: 'Air France', origin: 'Tegucigalpa', destination: 'París', departureTime: '08:00', arrivalTime: '06:30+1', duration: '14h 30m', stops: 1, price: 890, class: 'Económica', baggage: '1 maleta 23kg' },
  { id: 'f2', airline: 'Iberia', origin: 'Tegucigalpa', destination: 'París', departureTime: '14:20', arrivalTime: '11:15+1', duration: '15h 55m', stops: 2, price: 720, class: 'Económica', baggage: '1 maleta 23kg' },
  { id: 'f3', airline: 'Delta', origin: 'Tegucigalpa', destination: 'Nueva York', departureTime: '07:15', arrivalTime: '16:45', duration: '7h 30m', stops: 1, price: 450, class: 'Económica', baggage: '1 maleta 23kg' },
  { id: 'f4', airline: 'United', origin: 'Tegucigalpa', destination: 'Nueva York', departureTime: '11:30', arrivalTime: '21:10', duration: '7h 40m', stops: 1, price: 520, class: 'Económica', baggage: '1 maleta 23kg' },
  { id: 'f5', airline: 'Japan Airlines', origin: 'Tegucigalpa', destination: 'Tokio', departureTime: '09:00', arrivalTime: '14:30+1', duration: '21h 30m', stops: 2, price: 1450, class: 'Económica', baggage: '2 maletas 23kg' },
  { id: 'f6', airline: 'Alitalia', origin: 'Tegucigalpa', destination: 'Roma', departureTime: '10:00', arrivalTime: '07:00+1', duration: '15h', stops: 1, price: 780, class: 'Económica', baggage: '1 maleta 23kg' },
];

export const hotels: Hotel[] = [
  { id: 'h1', name: 'Hotel Le Bristol Paris', destinationId: 'paris', image: 'https://images.pexels.com/photos/6434592/pexels-photo-6434592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', location: 'Centro de París', category: 5, rating: 4.9, amenities: ['Spa', 'Restaurante Michelin', 'Terraza', 'Wi-Fi', 'Concierge'], pricePerNight: 650, description: 'Un palacio parisino con vistas a la Torre Eiffel y servicio de lujo.' },
  { id: 'h2', name: 'The Peninsula Tokyo', destinationId: 'tokyo', image: 'https://images.pexels.com/photos/7507131/pexels-photo-7507131.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', location: 'Ginza, Tokio', category: 5, rating: 4.9, amenities: ['Spa', 'Piscina', 'Vistas al Fuji', 'Wi-Fi', 'Restaurante'], pricePerNight: 720, description: 'Lujo japonés con vistas panorámicas de la ciudad más moderna de Asia.' },
  { id: 'h3', name: 'Hotel Eden Roma', destinationId: 'rome', image: 'https://images.pexels.com/photos/39338444/pexels-photo-39338444.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', location: 'Via Veneto, Roma', category: 5, rating: 4.8, amenities: ['Terraza', 'Restaurante', 'Spa', 'Wi-Fi', 'Bar'], pricePerNight: 480, description: 'Elegancia italiana junto a los jardines de Villa Borghese.' },
  { id: 'h4', name: 'The Plaza Hotel', destinationId: 'newyork', image: 'https://images.pexels.com/photos/6434592/pexels-photo-6434592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', location: 'Central Park, Nueva York', category: 5, rating: 4.8, amenities: ['Vistas al parque', 'Spa', 'Restaurante', 'Wi-Fi', 'Concierge'], pricePerNight: 890, description: 'Un ícono neoyorquino frente a Central Park.' },
  { id: 'h5', name: 'Canaves Oia Suites', destinationId: 'santorini', image: 'https://images.pexels.com/photos/7507131/pexels-photo-7507131.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', location: 'Oia, Santorini', category: 5, rating: 4.9, amenities: ['Piscina infinita', 'Vistas a la caldera', 'Desayuno', 'Wi-Fi'], pricePerNight: 560, description: 'Suites en cuevas con vistas legendarias al mar Egeo.' },
  { id: 'h6', name: 'Soneva Fushi Resort', destinationId: 'maldives', image: 'https://images.pexels.com/photos/39338444/pexels-photo-39338444.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', location: 'Atolón Baa, Maldivas', category: 5, rating: 5.0, amenities: ['Villa sobre el agua', 'Buceo', 'Spa', 'Restaurante', 'Wi-Fi'], pricePerNight: 1200, description: 'Resort eco-lujo en un paraíso tropical del Océano Índico.' },
];

export const restaurants: Restaurant[] = [
  { id: 'r1', name: 'Le Jules Verne', destinationId: 'paris', image: 'https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cuisine: 'Francesa gourmet', location: 'Torre Eiffel', rating: 4.7, priceRange: '$$$$', description: 'Cocina francesa de autor a 120 metros de altura dentro de la Torre Eiffel.' },
  { id: 'r2', name: 'Sukiyabashi Jiro', destinationId: 'tokyo', image: 'https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cuisine: 'Sushi omakase', location: 'Ginza', rating: 4.9, priceRange: '$$$$', description: 'El sushi más legendario del mundo en el corazón de Tokio.' },
  { id: 'r3', name: 'La Pergola', destinationId: 'rome', image: 'https://images.pexels.com/photos/370984/pexels-photo-370984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cuisine: 'Italiana gourmet', location: 'Monte Mario', rating: 4.8, priceRange: '$$$$', description: 'Tres estrellas Michelin con vistas panorámicas de Roma.' },
  { id: 'r4', name: 'Le Bernardin', destinationId: 'newyork', image: 'https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cuisine: 'Mariscos gourmet', location: 'Midtown', rating: 4.8, priceRange: '$$$$', description: 'Mariscos de autor con tres estrellas Michelin en Manhattan.' },
  { id: 'r5', name: 'Selene Restaurant', destinationId: 'santorini', image: 'https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cuisine: 'Griega mediterránea', location: 'Fira', rating: 4.7, priceRange: '$$$', description: 'Cocina egea moderna con productos locales de Santorini.' },
  { id: 'r6', name: 'Ithaa Undersea', destinationId: 'maldives', image: 'https://images.pexels.com/photos/370984/pexels-photo-370984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', cuisine: 'Europea contemporánea', location: 'Bajo el mar', rating: 4.9, priceRange: '$$$$', description: 'El primer restaurante submarino del mundo, 5 metros bajo el océano.' },
];

export const cruises: Cruise[] = [
  {
    id: 'c1', shipName: 'Symphony of the Seas', line: 'Royal Caribbean',
    image: 'https://images.pexels.com/photos/32609062/pexels-photo-32609062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    route: 'Caribe: Miami → Nassau → St. Thomas → St. Maarten → CocoCay → Miami',
    destinations: ['Caribe', 'Miami', 'Nassau'], durationDays: 7, departureDate: '2026-12-15',
    ports: ['Miami', 'Nassau', 'St. Thomas', 'St. Maarten', 'CocoCay'],
    cabinCategories: ['Interior', 'Exterior', 'Balcón', 'Suite'],
    experiences: ['Parque acuático', 'Tobogán 10 pisos', 'Teatro Broadway', 'Bares 20+', 'Casino'],
    priceFrom: 899, description: 'El crucero más grande del mundo con experiencias para toda la familia.',
  },
  {
    id: 'c2', shipName: 'MSC Virtuosa', line: 'MSC Cruises',
    image: 'https://images.pexels.com/photos/33270055/pexels-photo-33270055.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    route: 'Mediterráneo: Barcelona → Roma → Nápoles → Palma → Marsella → Barcelona',
    destinations: ['Mediterráneo', 'Barcelona', 'Roma'], durationDays: 7, departureDate: '2026-11-20',
    ports: ['Barcelona', 'Civitavecchia (Roma)', 'Nápoles', 'Palma de Mallorca', 'Marsella'],
    cabinCategories: ['Interior', 'Exterior', 'Balcón', 'Suite Yacht Club'],
    experiences: ['Piscina infinita', 'Carrusel de caballos', 'Casino', 'Spa balinés', 'Shows'],
    priceFrom: 649, description: 'Elegancia europea por las costas más bellas del Mediterráneo.',
  },
  {
    id: 'c3', shipName: 'Norwegian Encore', line: 'Norwegian Cruise Line',
    image: 'https://images.pexels.com/photos/37880222/pexels-photo-37880222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    route: 'Alaska: Seattle → Juneau → Glacier Bay → Ketchikan → Victoria → Seattle',
    destinations: ['Alaska', 'Seattle', 'Juneau'], durationDays: 7, departureDate: '2026-07-10',
    ports: ['Seattle', 'Juneau', 'Glacier Bay', 'Ketchikan', 'Victoria'],
    cabinCategories: ['Studio', 'Interior', 'Balcón', 'Mini-Suite', 'Haven Suite'],
    experiences: ['Aurora boreal', 'Observación de ballenas', 'Glaciares', 'Karting en el mar', 'Spa'],
    priceFrom: 1099, description: 'Aventura en la última frontera con glaciares milenarios y vida salvaje.',
  },
];

export const cruiseMemberships: CruiseMembership[] = [
  { id: 'm1', name: 'GOSOKY CRUISES · EXPLORER', benefits: ['5% de descuento en cruceros seleccionados', 'Embarque prioritario', 'Newsletter exclusivo de ofertas'], duration: '12 meses', price: 99, description: 'El primer nivel para quienes comienzan a explorar el mundo por mar.' },
  { id: 'm2', name: 'GOSOKY CRUISES · VOYAGER', benefits: ['10% de descuento en todos los cruceros', 'Upgrade de cabina cuando esté disponible', 'Acceso a experiencias a bordo', 'Concierge de viajes'], duration: '12 meses', price: 199, description: 'Para viajeros frecuentes que buscan más confort y experiencias únicas.' },
  { id: 'm3', name: 'GOSOKY CRUISES · AMBASSADOR', benefits: ['15% de descuento en todos los cruceros', 'Suite garantizada en la mejor categoría', 'Excursiones gratuitas en puertos seleccionados', 'Acceso a eventos exclusivos a bordo', 'Concierge personal 24/7'], duration: '12 meses', price: 399, description: 'La experiencia más completa para embajadores de Gosoky Cruises.' },
];

export const activities: Activity[] = [
  { id: 'a1', name: 'Cena romántica en la Torre Eiffel', destinationId: 'paris', image: 'https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'romantic', description: 'Una velada inolvidable con vistas panorámicas de París iluminada.', durationHours: 3, rating: 4.9, price: 180 },
  { id: 'a2', name: 'Tour por templos de Tokio', destinationId: 'tokyo', image: 'https://images.pexels.com/photos/20392882/pexels-photo-20392882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'culture', description: 'Visita los templos más sagrados de Tokio con guía local bilingüe.', durationHours: 6, rating: 4.8, price: 85 },
  { id: 'a3', name: 'Tour del Coliseo y Foro Romano', destinationId: 'rome', image: 'https://images.pexels.com/photos/14836534/pexels-photo-14836534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'culture', description: 'Viaja 2000 años atrás con acceso exclusivo a áreas restringidas.', durationHours: 4, rating: 4.9, price: 65 },
  { id: 'a4', name: 'Helicóptero sobre Manhattan', destinationId: 'newyork', image: 'https://images.pexels.com/photos/38048122/pexels-photo-38048122.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'special', description: 'Vistas aéreas de la Estatua de la Libertad y el skyline de NYC.', durationHours: 1, rating: 4.7, price: 230 },
  { id: 'a5', name: 'Atardecer en velero por Santorini', destinationId: 'santorini', image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'romantic', description: 'Navega la caldera al atardecer con cena y vino local.', durationHours: 5, rating: 4.9, price: 150 },
  { id: 'a6', name: 'Buceo en arrecifes de coral', destinationId: 'maldives', image: 'https://images.pexels.com/photos/9149359/pexels-photo-9149359.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'adventure', description: 'Expliza la vida marina más colorida del Océano Índico.', durationHours: 4, rating: 4.8, price: 120 },
  { id: 'a7', name: 'Senderismo en los Alpes', destinationId: 'paris', image: 'https://images.pexels.com/photos/3098647/pexels-photo-3098647.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'adventure', description: 'Excursión de un día desde París a los impresionantes Alpes franceses.', durationHours: 8, rating: 4.7, price: 95 },
  { id: 'a8', name: 'Clase de sushi en Ginza', destinationId: 'tokyo', image: 'https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'gastronomy', description: 'Aprende el arte del sushi con un maestro japonés en Tokio.', durationHours: 3, rating: 4.9, price: 110 },
];

export const travelEvents: TravelEvent[] = [
  { id: 'e1', name: 'Festival de la Luz de París', destinationId: 'paris', image: 'https://images.pexels.com/photos/16496484/pexels-photo-16496484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', type: 'Cultural', date: '2026-12-01', description: 'La ciudad se ilumina con instalaciones artísticas de luz en cada esquina.' },
  { id: 'e2', name: 'Sakura Matsuri', destinationId: 'tokyo', image: 'https://images.pexels.com/photos/20392882/pexels-photo-20392882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', type: 'Cultural', date: '2026-04-01', description: 'El festival de los cerezos en flor, el evento más esperado de Japón.' },
  { id: 'e3', name: 'Concierto en el Coliseo', destinationId: 'rome', image: 'https://images.pexels.com/photos/20993079/pexels-photo-20993079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', type: 'Música', date: '2026-09-15', description: 'Una noche de música clásica bajo las estrellas junto al Coliseo.' },
  { id: 'e4', name: 'Fashion Week NYC', destinationId: 'newyork', image: 'https://images.pexels.com/photos/4218027/pexels-photo-4218027.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', type: 'Moda', date: '2026-02-10', description: 'La semana de la moda más importante del mundo en Manhattan.' },
  { id: 'e5', name: 'Festival del Vino de Santorini', destinationId: 'santorini', image: 'https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', type: 'Gastronómico', date: '2026-08-20', description: 'Celebra la vendimia con vinos volcánicos únicos de Santorini.' },
];

export const activityCategoryLabels: Record<ActivityCategory, string> = {
  beach: 'Playas', adventure: 'Aventura', culture: 'Cultura', gastronomy: 'Gastronomía',
  romantic: 'Románticas', family: 'Familia', entertainment: 'Entretenimiento',
  nature: 'Naturaleza', sports: 'Deportes', shopping: 'Compras', special: 'Especiales',
};

export const destinationTypeLabels: Record<DestinationType, string> = {
  beach: 'Playas', capital: 'Capitales', cultural: 'Culturales', adventure: 'Aventura',
  romantic: 'Románticos', family: 'Familia', cruise: 'Cruceros',
};

export function getDestination(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

export function getHotelsByDestination(destinationId: string): Hotel[] {
  return hotels.filter((h) => h.destinationId === destinationId);
}

export function getRestaurantsByDestination(destinationId: string): Restaurant[] {
  return restaurants.filter((r) => r.destinationId === destinationId);
}

export function getActivitiesByDestination(destinationId: string): Activity[] {
  return activities.filter((a) => a.destinationId === destinationId);
}

export function getEventsByDestination(destinationId: string): TravelEvent[] {
  return travelEvents.filter((e) => e.destinationId === destinationId);
}

export function getFlightsByDestination(destinationName: string): Flight[] {
  return flights.filter((f) => f.destination === destinationName);
}

export function searchAll(query: string): { destinations: Destination[]; hotels: Hotel[]; restaurants: Restaurant[]; activities: Activity[]; cruises: Cruise[]; events: TravelEvent[] } {
  const q = query.toLowerCase();
  return {
    destinations: destinations.filter((d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.city.toLowerCase().includes(q)),
    hotels: hotels.filter((h) => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)),
    restaurants: restaurants.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)),
    activities: activities.filter((a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)),
    cruises: cruises.filter((c) => c.shipName.toLowerCase().includes(q) || c.route.toLowerCase().includes(q) || c.destinations.some((d) => d.toLowerCase().includes(q))),
    events: travelEvents.filter((e) => e.name.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)),
  };
}
