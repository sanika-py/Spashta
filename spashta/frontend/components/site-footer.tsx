import Link from 'next/link'
import { footerColumns, languages } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,0.8fr)]">
          <div>
            <p className="font-serif text-2xl font-semibold text-primary">Spashta</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              स्पष्ट — clear. An explainability and audit layer for regulated AI decisions in India.
            </p>

            <div className="mt-6">
              <label
                htmlFor="language"
                className="text-xs font-medium tracking-widest text-muted-foreground uppercase"
              >
                Explanation language
              </label>
              <select
                id="language"
                defaultValue="हिन्दी — Hindi"
                className="mt-2 w-full max-w-[15rem] rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-xs font-medium tracking-widest text-primary uppercase">
                {column.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Spashta Technologies Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
