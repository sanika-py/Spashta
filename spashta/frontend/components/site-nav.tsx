'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/site-data'

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <Link
          href="/"
          className="font-serif text-2xl leading-none font-semibold tracking-tight text-primary"
        >
          Spashta
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#demo"
            className="hidden rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 md:inline-flex"
          >
            Book a demo
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-primary md:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-base text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#demo"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-xl bg-accent px-4 py-3 text-center text-sm font-medium text-accent-foreground"
          >
            Book a demo
          </Link>
        </nav>
      )}
    </header>
  )
}
