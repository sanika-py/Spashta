import { Reveal } from '@/components/reveal'
import { regulators } from '@/lib/site-data'

export function RegulatorStrip() {
  return (
    <section id="compliance" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-tight font-semibold text-balance text-primary md:text-4xl">
            Mapped to what the regulators actually ask for
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {regulators.map((item) => (
            <article
              key={item.body}
              className="rounded-2xl border border-border-strong/60 bg-secondary-soft p-6"
            >
              <p className="font-serif text-lg font-semibold text-primary">{item.body}</p>
              <h3 className="mt-1 text-sm font-medium text-pretty text-secondary-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
