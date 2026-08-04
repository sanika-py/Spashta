import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { DuotonePhoto } from '@/components/duotone-photo'
import { heroStats } from '@/lib/site-data'

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-strong/60 bg-secondary-soft px-3 py-1.5 text-xs font-medium tracking-wide text-primary uppercase">
              <ShieldCheck className="size-3.5" aria-hidden />
              Explainability layer for Indian finance
            </span>

            <h1 className="mt-6 font-serif text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-primary sm:text-5xl md:text-[3.4rem]">
              Every AI decision, explained — in the language your customer actually speaks.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              RBI, SEBI and IRDAI now expect a defensible reason behind every automated credit, fraud
              and claims outcome. Spashta sits on top of the models you already run and produces that
              reason — in plain Hindi, Tamil, Bengali or Marathi, with the audit trail attached.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/platform"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                See it explain a real decision
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center rounded-xl border border-border-strong/70 px-5 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-secondary-soft"
              >
                Talk to us
              </Link>
            </div>
          </div>

          <div className="relative">
            <DuotonePhoto
              src="/images/hero-phone-loan-decision.png"
              alt="A hand holding a smartphone showing a loan decision with its reason written in Hindi and a compliance badge"
              className="aspect-4/5 w-full rounded-2xl border border-border"
              intensity="light"
              priority
              sizes="(max-width: 768px) 100vw, 46vw"
            />
            <div className="absolute -bottom-4 -left-4 hidden max-w-[15rem] rounded-xl border border-border bg-card p-4 sm:block">
              <p className="text-xs font-medium tracking-wide text-secondary-foreground/70 uppercase">
                Reason, verbatim
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                आपकी मासिक किस्त आपकी आय के 54% के बराबर है।
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-muted/60">
        <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-px px-5 py-8 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          {heroStats.map((stat) => (
            <div key={stat.label} className="px-0 py-4 md:px-6 md:first:pl-0">
              <dt className="font-serif text-3xl font-semibold text-primary">{stat.value}</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">{stat.label}</dd>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{stat.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
