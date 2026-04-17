import { Hero } from "@/components/landing/Hero";
import { StatsGrid } from "@/components/landing/StatsGrid";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { UltimosResultados } from "@/components/landing/UltimosResultados";
import { FinalCTA, LegalFooter } from "@/components/landing/FinalCTA";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <StatsGrid />
      <ComoFunciona />
      <UltimosResultados />
      <FinalCTA />
      <LegalFooter />
    </>
  );
}
