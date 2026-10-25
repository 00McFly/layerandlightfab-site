import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-[var(--border-subtle)]">
      <div className="wrap flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- small brand PNG on a black ground */}
          <img src="/brand/logo-wordmark.png" alt={site.name} width={1236} height={210} className="h-7 w-auto" />
          <p className="spec mt-4">{site.tagline}</p>
        </div>
        <div className="spec sm:text-right">
          <a href={`mailto:${site.email}`} className="hover:text-light-100">{site.email}</a>
          <div>© {new Date().getFullYear()} {site.legalName}</div>
        </div>
      </div>
    </footer>
  );
}
