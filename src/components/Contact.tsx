import { ArrowRight, EnvelopeSimple, InstagramLogo, Phone } from "@phosphor-icons/react/dist/ssr";
import { mailto, site } from "@/content/site";
import { Reveal } from "./Reveal";

const checklist = ["What it is and where it will live", "Rough size and quantity", "Materials or finish you have in mind", "When you need it", "Sketches, photos or files, if you have them"];

export function Contact() {
  return (
    <section id="contact" className="wrap pt-32" aria-labelledby="contact-title">
      <Reveal className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-default)] bg-void-100 px-6 py-16 sm:px-14 sm:py-20">
        <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[140%] w-[90%] -translate-x-1/2 bg-[image:var(--gradient-halo)]" aria-hidden />
        <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="min-w-0">
            <div className="eyebrow"><b>07</b>Start a project</div>
            <h2 id="contact-title" className="display mt-6 text-[clamp(28px,4.2vw,56px)] tracking-[0.07em]">
              Built with purpose. <span className="lit">Made to inspire.</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17px]">
              Bring us your idea, and we&apos;ll make it real. Tell us what you&apos;re building and we&apos;ll reply with questions or a quote.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="btn btn-primary" href={mailto()}>
                Tell us about it <ArrowRight size={16} />
              </a>
              <a className="btn max-w-full !font-mono !text-[13px] !normal-case !tracking-normal" href={`mailto:${site.email}`}>
                <EnvelopeSimple size={16} className="shrink-0" /> <span className="truncate">{site.email}</span>
              </a>
              {site.phone && (
                <a className="btn" href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
                  <Phone size={16} /> {site.phone}
                </a>
              )}
              {site.instagram && (
                <a className="btn" href={`https://instagram.com/${site.instagram}`} rel="noopener">
                  <InstagramLogo size={16} /> @{site.instagram}
                </a>
              )}
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-black/40 p-6 sm:p-8">
            <div className="eyebrow">Helpful to include</div>
            <ul className="mt-5 grid gap-3">
              {checklist.map((c, i) => (
                <li key={c} className="flex gap-4 text-[15px]">
                  <span className="font-mono text-[12px] leading-6 text-light-400">0{i + 1}</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
