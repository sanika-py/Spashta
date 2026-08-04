import Link from 'next/link'
import { ArrowRight, ClipboardCheck, IdCard, ShieldAlert, Wallet } from 'lucide-react'
import { DuotonePhoto } from '@/components/duotone-photo'
import { Reveal } from '@/components/reveal'
import { useCases } from '@/lib/site-data'

const icons = {
  onboarding: IdCard,
  credit: Wallet,
  fraud: ShieldAlert,
  compliance: ClipboardCheck,
}

export function UseCases() {
  return (
    <section id="product" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-tight font-semibold text-balance text-primary md:text-4xl">
            Built for how AI is actually used
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Four decision surfaces, one explanation layer. Drop it in wherever a model already says
            yes, no, or wait.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => {
            const Icon = icons[item.icon]
            return (
              <article
                key={item.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border-strong"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary-soft text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-5 text-xs font-medium tracking-widest text-accent uppercase">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-base leading-snug font-medium text-pretty text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <Link
                  href="/platform"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Learn more
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </article>
            )
          })}
        </div>

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <DuotonePhoto
            src="/images/kiosk-rural-fintech.png"
            alt="A customer being helped at a rural banking correspondent kiosk in India"
            className="aspect-16/10 w-full rounded-2xl border border-border md:aspect-auto"
            intensity="strong"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="flex flex-col justify-center rounded-2xl border border-border-strong/60 bg-secondary-soft p-7 md:p-10">
            <p className="font-serif text-xl leading-snug text-balance text-primary md:text-2xl">
              The person who most needs the reason is standing at a kiosk with a feature phone and no
              English.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Spashta writes for that reader first — short sentences, no model jargon, delivered over
              SMS, WhatsApp, IVR or in-app.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
