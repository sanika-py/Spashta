import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DuotonePhoto } from '@/components/duotone-photo'

export function PlatformCta() {
  return (
    <section id="demo" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-24">
        <div>
          <h2 className="font-serif text-3xl leading-tight font-semibold text-balance md:text-[2.75rem]">
            See the full explanation, not just the decision.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-foreground/80">
            Open the platform and walk through a live credit decision — attributions, the generated
            explanation in six languages, and the audit record behind it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/platform"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Enter the platform
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center rounded-xl border border-primary-foreground/30 px-6 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Book a demo
            </Link>
          </div>
        </div>

        <DuotonePhoto
          src="/images/phone-on-desk-explanation.png"
          alt="A smartphone on a wooden desk beside a printed document, showing decision reasons written in Hindi"
          className="aspect-4/3 w-full rounded-2xl border border-primary-foreground/15"
          intensity="light"
          sizes="(max-width: 768px) 100vw, 42vw"
        />
      </div>
    </section>
  )
}
