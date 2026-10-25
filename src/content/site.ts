// Site-wide facts. Edit here, not in components.
export const site = {
  name: "Layer & Light Fabrication",
  legalName: "Layer & Light Fabrication LLC",
  url: "https://layerandlightfab.com",
  tagline: "Custom Fabrication | Creative Solutions | Design & Production",
  description:
    "Custom props, scenic elements, 3D printing and full-color UV printing, built on years in themed entertainment, including extensive work at Universal Studios.",
  // Confirmed by Steven. Every "Start a project" button mails this.
  email: "hello@layerandlightfab.com",
  // Optional extras shown in the contact section when filled in.
  phone: "",
  instagram: "",
};

export const mailto = (subject = "New project") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
