/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/mitte', destination: '/bezirke/mitte', permanent: true },
      { source: '/friedrichshain-kreuzberg', destination: '/bezirke/friedrichshain-kreuzberg', permanent: true },
      { source: '/pankow', destination: '/bezirke/pankow', permanent: true },
      { source: '/charlottenburg-wilmersdorf', destination: '/bezirke/charlottenburg-wilmersdorf', permanent: true },
      { source: '/spandau', destination: '/bezirke/spandau', permanent: true },
      { source: '/steglitz-zehlendorf', destination: '/bezirke/steglitz-zehlendorf', permanent: true },
      { source: '/tempelhof-schoeneberg', destination: '/bezirke/tempelhof-schoeneberg', permanent: true },
      { source: '/neukoelln', destination: '/bezirke/neukoelln', permanent: true },
      { source: '/treptow-koepenick', destination: '/bezirke/treptow-koepenick', permanent: true },
      { source: '/marzahn-hellersdorf', destination: '/bezirke/marzahn-hellersdorf', permanent: true },
      { source: '/lichtenberg', destination: '/bezirke/lichtenberg', permanent: true },
      { source: '/reinickendorf', destination: '/bezirke/reinickendorf', permanent: true },
      { source: '/tueroeffnung', destination: '/leistungen/tueroeffnung', permanent: true },
      { source: '/schlosswechsel', destination: '/leistungen/schlosswechsel', permanent: true },
      { source: '/einbruchschaden', destination: '/leistungen/einbruchschaden', permanent: true },
      { source: '/einbruchschaeden', destination: '/leistungen/einbruchschaden', permanent: true },
      { source: '/einbruchschutz', destination: '/leistungen/einbruchschutz', permanent: true },
      { source: '/zusaetzliche-schloesser', destination: '/leistungen/zusaetzliche-schloesser', permanent: true },
      { source: '/hochsicherheitszylinder', destination: '/leistungen/hochsicherheitszylinder', permanent: true },
      { source: '/sicherheitszylinder', destination: '/leistungen/hochsicherheitszylinder', permanent: true },
    ];
  },
};

module.exports = nextConfig;
