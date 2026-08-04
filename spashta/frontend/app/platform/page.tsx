import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PlatformPage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center px-5 py-20 md:px-8">
      <p className="font-serif text-2xl font-semibold text-primary">Spashta</p>
      <h1 className="mt-6 font-serif text-3xl leading-tight font-semibold text-balance text-primary md:text-4xl">
        The platform lives here.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        This is the entry point to the explanation dashboard — decision feed, SHAP attributions,
        generated language variants and the audit log.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-border-strong/70 px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-secondary-soft"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to the site
      </Link>
    </main>
  )
}
