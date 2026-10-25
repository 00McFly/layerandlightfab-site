// "Our capabilities", from James Sleeth, founder. `icon` is a Phosphor icon name mapped in components/Capabilities.tsx.
export const capabilities = [
  { id: "3d-printing", icon: "cube", title: "3D Printing", body: "High-resolution prints for prototypes, detailed parts, and full-scale props." },
  { id: "uv-printing", icon: "printer", title: "UV Printing", body: "Full-color, durable graphics printed directly onto acrylic, wood, metal, and more." },
  { id: "vacuum-forming", icon: "stack", title: "Vacuum Forming", body: "Lightweight, repeatable plastic shells, panels, and enclosures." },
  { id: "mold-making", icon: "drop", title: "Mold Making & Casting", body: "Precision silicone molds for short-run production and faithful reproductions." },
  { id: "rotocasting", icon: "rotate", title: "Rotocasting", body: "Hollow, lightweight castings ideal for large props and display pieces." },
  { id: "hydro-chrome", icon: "sparkle", title: "Hydro-Chrome Finishing", body: "A brilliant mirror-chrome finish on almost any shape, no plating required." },
  { id: "led", icon: "lightbulb", title: "Custom LED Lighting", body: "Integrated lighting that brings props, signs, and displays to life." },
] as const;
