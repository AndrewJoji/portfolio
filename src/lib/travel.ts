export type TravelLocation = {
  id: string;
  label: string;
  years: string;
  lat: number;
  lng: number;
  description: string;
};

// Coordinates use a representative city where no specific city was given
// (South Africa, Kerala, Saudi Arabia) -- noted per-location below.
export const travelLocations: TravelLocation[] = [
  {
    id: "south-africa",
    label: "South Africa",
    years: "Born here",
    lat: -26.2041,
    lng: 28.0473, // Johannesburg (representative -- no specific city given)
    description: "Where the story starts.",
  },
  {
    id: "kerala",
    label: "Kerala, India",
    years: "Family roots",
    lat: 9.9312,
    lng: 76.2673, // Kochi (representative -- no specific city given)
    description: "Where my family is from.",
  },
  {
    id: "saudi-arabia",
    label: "Saudi Arabia",
    years: "2004 – 2010",
    lat: 24.7136,
    lng: 46.6753, // Riyadh (representative -- no specific city given)
    description: "Part of growing up.",
  },
  {
    id: "qatar",
    label: "Qatar",
    years: "2010 – 2022",
    lat: 25.2854,
    lng: 51.531,
    description:
      "Doha -- most of my childhood and adolescence, and where I did my IGCSEs and A-Levels.",
  },
  {
    id: "vancouver",
    label: "Vancouver, BC, Canada",
    years: "2021 – Present",
    lat: 49.2827,
    lng: -123.1207,
    description: "Where I studied, and where I'm based now.",
  },
];
