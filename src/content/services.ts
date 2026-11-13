// Copy from content/company-overview.md. `image` is a /work photo base path (see gallery.json); leave null for a placeholder.
export type Service = {
  id: string;
  title: string;
  short: string;
  body: string;
  tags: string[];
  image: string | null;
};

export const services: Service[] = [
  {
    id: "props",
    title: "Custom Props & Fabrication",
    short: "Props, themed elements, displays and specialty pieces.",
    body: "Designing and building custom props, themed elements, displays, and specialty pieces for entertainment, attractions, businesses, and personal projects.",
    tags: ["Foam & resin", "Scenic paint", "Steel & wood"],
    image: null,
  },
  {
    id: "3d-printing",
    title: "3D Printing & Prototyping",
    short: "Digital designs turned into physical objects.",
    body: "Transforming digital designs and concepts into physical objects through 3D printing, whether for prototypes, functional components, custom accessories, or finished products.",
    tags: ["FDM", "Resin", "Post-processing"],
    image: null,
  },
  {
    id: "uv-printing",
    title: "UV Printing & Custom Graphics",
    short: "Vibrant, durable, full-color graphics.",
    body: "Creating vibrant, durable, full-color graphics on a variety of materials and surfaces for custom products, signage, branding, and decorative applications.",
    tags: ["Acrylic", "Wood", "Metal", "Signage"],
    image: null,
  },
  {
    id: "design",
    title: "Creative Design & Problem Solving",
    short: "Practical, imaginative solutions.",
    body: "Developing practical and imaginative solutions for projects that require specialized fabrication, unique materials, or unconventional approaches.",
    tags: ["Concept", "CAD", "Materials"],
    image: null,
  },
  {
    id: "themed",
    title: "Entertainment & Themed Environments",
    short: "Immersive props and scenic details.",
    body: "Applying years of professional experience in themed entertainment to create immersive props, scenic details, and custom elements for attractions, live productions, and experiential environments.",
    tags: ["Attractions", "Live production", "Experiential"],
    image: null,
  },
];
