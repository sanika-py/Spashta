import { DuotonePhoto } from '@/components/duotone-photo'
import { Reveal } from '@/components/reveal'
import { steps } from '@/lib/site-data'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-tight font-semibold text-balance text-primary md:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Four steps between your model’s output and a reason a customer, an officer and an auditor
            can all read.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-14">
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              aria-hidden
              className="absolute top-5 right-6 left-6 hidden border-t border-dashed border-border-strong lg:block"
            />
            {steps.map((step) => (
              <li key={step.number} className="relative">
                <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-secondary bg-secondary/25 font-serif text-sm font-semibold text-accent ring-4 ring-muted/50">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>

          <DuotonePhoto
            src="/images/officer-dashboard-review.png"
            alt="A compliance officer reviewing a decision dashboard on a laptop"
            className="aspect-4/3 w-full rounded-2xl border border-border"
            intensity="medium"
            sizes="(max-width: 1024px) 100vw, 30vw"
          />
        </div>
      </div>
    </section>
  )
}
