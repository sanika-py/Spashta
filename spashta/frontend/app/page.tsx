import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { PlatformCta } from '@/components/platform-cta'
import { RegulatorStrip } from '@/components/regulator-strip'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { UseCases } from '@/components/use-cases'
import { WhyNotYet } from '@/components/why-not-yet'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <UseCases />
        <HowItWorks />
        <WhyNotYet />
        <RegulatorStrip />
        <PlatformCta />
      </main>
      <SiteFooter />
    </>
  )
}
