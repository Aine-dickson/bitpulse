// Sectors — where the same core (sensing, firmware, connectivity, data) lands.

export interface Sector {
  id: string
  name: string
  blurb: string
}

export const sectors: Sector[] = [
  { id: 'S-01', name: 'Smarter Cities', blurb: 'Metering, mobility & utility telemetry.' },
  { id: 'S-02', name: 'Health Tech', blurb: 'Connected diagnostic & cold-chain devices.' },
  { id: 'S-03', name: 'Digital Economies', blurb: 'Fintech & POS hardware, agent networks.' },
  { id: 'S-04', name: 'Education', blurb: 'Affordable lab & learning hardware.' },
  { id: 'S-05', name: 'Developer Tools', blurb: 'The platform layer under local software.' },
  { id: 'S-06', name: 'Embedded Systems', blurb: 'Industrial & agri sensing at the edge.' },
]
