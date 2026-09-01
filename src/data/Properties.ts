export type PropertyType = 'Villa' | 'Penthouse' | 'Luxury Home' | 'Apartment' | 'Commercial' | 'Land'
export type PropertyStatus = 'For Sale' | 'For Rent'
export type PropertyBadge = 'Featured' | 'New' | 'Exclusive' | 'Price Reduced'

export interface Agent {
  name: string
  role: string
  phone: string
  email: string
  image: string
  experience: number
  rating: number
  listings: number
}

export interface Property {
  id: string
  name: string
  address: string
  city: string
  state: string
  price: number
  priceLabel: string
  type: PropertyType
  status: PropertyStatus
  badge?: PropertyBadge
  beds: number
  baths: number
  sqft: number
  image: string
  images: string[]
  description: string
  amenities: string[]
  agent: Agent
  yearBuilt: number
  garage: number
  lotSize: number
  floors: number
}

const agentAlexandra: Agent = {
  name: 'Alexandra Whitmore',
  role: 'Senior Estate Director',
  phone: '+1 (310) 555-0142',
  email: 'a.whitmore@luxestate.com',
  image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=400&h=400&fit=crop&auto=format',
  experience: 15,
  rating: 4.9,
  listings: 87,
}

const agentJames: Agent = {
  name: 'James Harrington',
  role: 'Luxury Property Specialist',
  phone: '+1 (212) 555-0388',
  email: 'j.harrington@luxestate.com',
  image: 'https://images.unsplash.com/photo-1647580427155-0483906cb9de?w=400&h=400&fit=crop&auto=format',
  experience: 12,
  rating: 4.8,
  listings: 64,
}

const agentSophia: Agent = {
  name: 'Sophia Delacroix',
  role: 'International Sales Director',
  phone: '+1 (305) 555-0271',
  email: 's.delacroix@luxestate.com',
  image: 'https://images.unsplash.com/photo-1770199105692-9e52ff137cad?w=400&h=400&fit=crop&auto=format',
  experience: 18,
  rating: 5.0,
  listings: 142,
}

const agentMarcus: Agent = {
  name: 'Marcus Chen',
  role: 'Commercial & Residential',
  phone: '+1 (424) 555-0196',
  email: 'm.chen@luxestate.com',
  image: 'https://images.unsplash.com/photo-1610631066894-62452ccb927c?w=400&h=400&fit=crop&auto=format',
  experience: 9,
  rating: 4.7,
  listings: 53,
}

export const featuredAgents: Agent[] = [agentAlexandra, agentJames, agentSophia, agentMarcus]

export const properties: Property[] = [
  {
    id: '1',
    name: 'The Ridgeline',
    address: '12450 Sunset Ridge Dr',
    city: 'Beverly Hills',
    state: 'CA',
    price: 8500000,
    priceLabel: '$8,500,000',
    type: 'Villa',
    status: 'For Sale',
    badge: 'Featured',
    beds: 5,
    baths: 6,
    sqft: 6240,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&h=680&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628744876525-f2678d8af47f?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=900&fit=crop&auto=format',
    ],
    description: 'An architectural masterpiece perched atop the most coveted ridge in Beverly Hills, The Ridgeline offers sweeping panoramic views from downtown Los Angeles to the Pacific Ocean. This stunning villa seamlessly blends indoor and outdoor living with floor-to-ceiling glass walls, retractable pocket doors, and a breathtaking infinity pool that appears to float above the city below. Every detail speaks to uncompromising craftsmanship and an unwavering commitment to the finest quality of life.',
    amenities: ['Infinity Pool', 'Home Theater', 'Wine Cellar', 'Smart Home System', 'Heated Floors', 'Private Elevator', 'Outdoor Kitchen', 'Professional Gym', 'Steam Sauna', 'Guest House', 'Panoramic City Views', 'Gated Entry', 'Solar Panels', 'EV Charging'],
    agent: agentAlexandra,
    yearBuilt: 2021,
    garage: 4,
    lotSize: 28400,
    floors: 3,
  },
  {
    id: '2',
    name: 'Oceanfront Estate',
    address: '4821 Pacific Coast Hwy',
    city: 'Malibu',
    state: 'CA',
    price: 12750000,
    priceLabel: '$12,750,000',
    type: 'Luxury Home',
    status: 'For Sale',
    badge: 'Exclusive',
    beds: 6,
    baths: 7,
    sqft: 8100,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&h=680&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=900&fit=crop&auto=format',
    ],
    description: 'Commanding 140 feet of private Malibu beachfront, this extraordinary estate is the definitive expression of California coastal luxury. Direct beach access, an oceanfront terrace spanning the full width of the home, and curated interiors by award-winning designer Monique Laurent set this property apart from everything else on the market.',
    amenities: ['Private Beach Access', 'Oceanfront Pool & Spa', 'Media Room', 'Chef\'s Kitchen', 'Wine Room', 'Gym', 'Guest Suite', 'Fire Pit', 'Outdoor Shower', 'Smart Home', 'Heated Driveway', 'Security System'],
    agent: agentSophia,
    yearBuilt: 2019,
    garage: 3,
    lotSize: 42600,
    floors: 2,
  },
  {
    id: '3',
    name: 'The Meridian Penthouse',
    address: '432 Park Ave #89F',
    city: 'New York',
    state: 'NY',
    price: 18000000,
    priceLabel: '$18,000,000',
    type: 'Penthouse',
    status: 'For Sale',
    badge: 'New',
    beds: 4,
    baths: 5,
    sqft: 4200,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&h=680&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628744876525-f2678d8af47f?w=1400&h=900&fit=crop&auto=format',
    ],
    description: 'Occupying the full 89th floor of one of Midtown Manhattan\'s most iconic towers, The Meridian Penthouse offers 360-degree views of New York City that are simply beyond comparison. Designed by Studioilse with custom Italian marble, bespoke millwork, and museum-quality lighting, every square foot of this four-bedroom residence speaks to the pinnacle of urban luxury.',
    amenities: ['360° City Views', 'Private Terrace', 'Concierge Service', 'Valet Parking', 'Fitness Center', 'Pool', 'Wine Storage', 'Smart Home', 'Chef\'s Kitchen', 'White Glove Service', 'Private Elevator', 'Library'],
    agent: agentJames,
    yearBuilt: 2022,
    garage: 2,
    lotSize: 4200,
    floors: 1,
  },
  {
    id: '4',
    name: 'Palm Grove',
    address: '2241 S Ocean Blvd',
    city: 'Palm Beach',
    state: 'FL',
    price: 6200000,
    priceLabel: '$6,200,000',
    type: 'Villa',
    status: 'For Sale',
    badge: 'Featured',
    beds: 5,
    baths: 5,
    sqft: 5800,
    image: 'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=900&h=680&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628744876525-f2678d8af47f?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=1400&h=900&fit=crop&auto=format',
    ],
    description: 'Set behind a canopy of towering royal palms on South Ocean Boulevard, Palm Grove is a timeless island estate blending classic Palm Beach architecture with thoroughly contemporary interiors. The property features a pool pavilion, lush tropical gardens, and direct access to the beach through a private pedestrian underpass.',
    amenities: ['Beach Access', 'Tropical Pool', 'Pool House', 'Cabana Bar', 'Bocce Court', 'Outdoor Kitchen', 'Generator', 'Smart Home', 'Hurricane Impact Glass', 'Koi Pond', 'Multiple Terraces', 'Staff Quarters'],
    agent: agentSophia,
    yearBuilt: 2018,
    garage: 3,
    lotSize: 31200,
    floors: 2,
  },
  {
    id: '5',
    name: 'The Glass House',
    address: '9820 Bellagio Rd',
    city: 'Bel Air',
    state: 'CA',
    price: 24500000,
    priceLabel: '$24,500,000',
    type: 'Luxury Home',
    status: 'For Sale',
    badge: 'Exclusive',
    beds: 7,
    baths: 9,
    sqft: 11200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=680&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=900&fit=crop&auto=format',
    ],
    description: 'A landmark of contemporary Bel Air architecture, The Glass House is a triumph of light, space, and material. The entire south-facing facade is a continuous 120-foot glass wall that dissolves the boundary between the grand living spaces and the quarter-acre pool terrace beyond. This is not merely a residence — it is a statement.',
    amenities: ['Zero-Edge Pool', 'Spa & Grotto', 'Basketball Court', 'Bowling Alley', '8-Car Garage', 'Screening Room', 'Recording Studio', 'Full Staff Quarters', 'Vegetable Garden', 'Smart Home', 'Panic Room', 'Helipad'],
    agent: agentAlexandra,
    yearBuilt: 2023,
    garage: 8,
    lotSize: 52000,
    floors: 3,
  },
  {
    id: '6',
    name: 'Azure Terrace',
    address: '8 Harbor Point Dr',
    city: 'Miami',
    state: 'FL',
    price: 9800000,
    priceLabel: '$9,800,000',
    type: 'Penthouse',
    status: 'For Sale',
    badge: 'New',
    beds: 4,
    baths: 4,
    sqft: 4600,
    image: 'https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?w=900&h=680&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=1400&h=900&fit=crop&auto=format',
    ],
    description: 'Rising above Biscayne Bay in Miami\'s most exclusive waterfront enclave, Azure Terrace is a full-floor penthouse with unobstructed views of the bay, ocean, and Miami skyline. The wraparound terrace features a private plunge pool, outdoor dining for twelve, and a summer kitchen — all suspended thirty-two stories above the shimmering water below.',
    amenities: ['Private Plunge Pool', 'Wraparound Terrace', 'Bayfront Views', 'Private Elevator', 'Smart Home', 'Concierge', 'Valet', 'Spa', 'Fitness Center', 'Marina Access', 'Chef\'s Kitchen', 'Wine Cellar'],
    agent: agentMarcus,
    yearBuilt: 2024,
    garage: 3,
    lotSize: 4600,
    floors: 1,
  },
  {
    id: '7',
    name: 'The Whitmore',
    address: '1201 Canyon Vista Ln',
    city: 'Scottsdale',
    state: 'AZ',
    price: 4800000,
    priceLabel: '$4,800,000',
    type: 'Villa',
    status: 'For Sale',
    beds: 4,
    baths: 4,
    sqft: 5100,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&h=680&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=1400&h=900&fit=crop&auto=format',
    ],
    description: 'A desert sanctuary in the McDowell Sonoran Preserve, The Whitmore commands dramatic mountain views from every room. The seamless indoor-outdoor design celebrates the extraordinary Arizona landscape through natural stone, reclaimed wood, and expansive glass.',
    amenities: ['Mountain Views', 'Heated Pool & Spa', 'Desert Garden', 'Outdoor Fireplace', 'Casita', 'Smart Home', 'Gated Entry', 'Solar Panels'],
    agent: agentMarcus,
    yearBuilt: 2020,
    garage: 3,
    lotSize: 38000,
    floors: 1,
  },
  {
    id: '8',
    name: 'Harbor House',
    address: '334 Marina Way',
    city: 'Newport Beach',
    state: 'CA',
    price: 7200000,
    priceLabel: '$7,200,000',
    type: 'Luxury Home',
    status: 'For Rent',
    badge: 'Price Reduced',
    beds: 5,
    baths: 5,
    sqft: 5400,
    image: 'https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=900&h=680&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=1400&h=900&fit=crop&auto=format',
    ],
    description: 'A Cape Cod-inspired waterfront estate on Newport Harbor, where sailboats glide past your private dock at sunset. Harbor House combines classic coastal elegance with every modern convenience, offering an irreplaceable connection to the water.',
    amenities: ['Private Dock', 'Harbor Views', 'Pool & Spa', 'Boat Lift', 'Rooftop Deck', 'Wine Cellar', 'Smart Home', 'Gated Motor Court'],
    agent: agentAlexandra,
    yearBuilt: 2017,
    garage: 3,
    lotSize: 15800,
    floors: 3,
  },
  {
    id: '9',
    name: 'Aspen Chalet',
    address: '88 Mountain Summit Rd',
    city: 'Aspen',
    state: 'CO',
    price: 16500000,
    priceLabel: '$16,500,000',
    type: 'Luxury Home',
    status: 'For Sale',
    badge: 'Exclusive',
    beds: 6,
    baths: 7,
    sqft: 8800,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&h=680&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1628744876525-f2678d8af47f?w=1400&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758957701419-2c6e266f7988?w=1400&h=900&fit=crop&auto=format',
    ],
    description: 'The crown jewel of Aspen\'s most prestigious mountain address, this ski-in/ski-out chalet offers direct access to Ajax Mountain\'s finest terrain. The six-bedroom residence wraps guests in hand-hewn timber, river stone, and bespoke fur textiles — a mountain lodge reimagined for the 21st century.',
    amenities: ['Ski-In/Ski-Out', 'Hot Tub', 'Heated Driveway', 'Apres Ski Bar', 'Bunk Room', 'Fireplaces x6', 'Smart Home', 'Caretaker Suite'],
    agent: agentSophia,
    yearBuilt: 2020,
    garage: 3,
    lotSize: 22000,
    floors: 3,
  },
]
