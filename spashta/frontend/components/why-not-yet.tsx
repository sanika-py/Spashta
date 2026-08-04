import { Check, Minus } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { comparisonRows, globalTools } from '@/lib/site-data'

export function WhyNotYet() {
  return (
    <section id="pricing" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-tight font-semibold text-balance text-primary md:text-4xl">
            Why this doesn’t exist yet
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Explainability tooling was built for American adverse-action notices. India needs a
            different output.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-muted/60 p-7">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Global tools
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {globalTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 font-serif text-base text-muted-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              English only, enterprise-priced, built for US/EU rules.
            </p>
          </div>

          <div className="rounded-2xl border border-border-strong bg-secondary-soft p-7">
            <p className="text-xs font-medium tracking-widest text-accent uppercase">The gap we fill</p>
            <p className="mt-5 font-serif text-3xl font-semibold text-primary">Spashta</p>
            <p className="mt-6 text-sm leading-relaxed text-secondary-foreground">
              India-native, regional languages, audit-ready out of the box.
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of global explainability tools and Spashta
            </caption>
            <thead>
              <tr className="border-b border-border bg-muted/60">
                <th scope="col" className="px-5 py-4 font-medium text-foreground">
                  Dimension
                </th>
                <th scope="col" className="px-5 py-4 font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Minus className="size-3.5" aria-hidden />
                    Global tools
                  </span>
                </th>
                <th scope="col" className="px-5 py-4 font-medium text-primary">
                  <span className="inline-flex items-center gap-2">
                    <Check className="size-3.5 text-accent" aria-hidden />
                    Spashta
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.dimension} className="border-b border-border last:border-0">
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-medium text-foreground md:whitespace-nowrap"
                  >
                    {row.dimension}
                  </th>
                  <td className="px-5 py-4 align-top leading-relaxed text-muted-foreground">
                    {row.global}
                  </td>
                  <td className="bg-secondary-soft/50 px-5 py-4 align-top leading-relaxed text-primary">
                    {row.spashta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
