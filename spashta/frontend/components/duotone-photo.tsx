import Image from 'next/image'
import { cn } from '@/lib/utils'

export function DuotonePhoto({
  src,
  alt,
  className,
  imageClassName,
  intensity = 'medium',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  intensity?: 'light' | 'medium' | 'strong'
  priority?: boolean
  sizes?: string
}) {
  const shade = {
    light: 'bg-primary/15',
    medium: 'bg-primary/30',
    strong: 'bg-primary/45',
  }[intensity]

  const desaturate = {
    light: 'saturate-[0.55]',
    medium: 'saturate-[0.35]',
    strong: 'saturate-[0.2]',
  }[intensity]

  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn('object-cover', desaturate, imageClassName)}
      />
      <div aria-hidden className={cn('pointer-events-none absolute inset-0 mix-blend-multiply', shade)} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-secondary/20 mix-blend-screen" />
    </div>
  )
}
