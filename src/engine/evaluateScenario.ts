import type { MatchupResult, Scenario } from '@/types/scenario'
import { offenseData } from '@/data/offense'
import { defenseData } from '@/data/defense'

export function evaluateScenario(s: Scenario): MatchupResult {
  const personnel = offenseData.personnel.find(p => p.id === s.offense.personnelId)
  const formation = offenseData.formations.find(f => f.id === s.offense.formationId)
  const front = defenseData.fronts.find(fr => fr.id === s.defense.frontId)
  const pkg = front?.packages.find(p => p.id === s.defense.packageId)
  const coverage = defenseData.coverages.find(c => c.id === s.defense.coverageId)

  const warnings: string[] = []

  if (!personnel) warnings.push(`Unknown offense personnelId: ${s.offense.personnelId}`)
  if (!formation) warnings.push(`Unknown offense formationId: ${s.offense.formationId}`)
  if (!front) warnings.push(`Unknown defense frontId: ${s.defense.frontId}`)
  if (!pkg) warnings.push(`Unknown defense packageId: ${s.defense.packageId}`)
  if (!coverage) warnings.push(`Unknown coverageId: ${s.defense.coverageId}`)

  const title = `${personnel?.label ?? s.offense.personnelId} · ${formation?.label ?? s.offense.formationId} vs ${front?.label ?? s.defense.frontId} (${pkg?.label ?? s.defense.packageId}) in ${coverage?.name ?? s.defense.coverageId}`

  return {
    title,
    diagram: {
      ascii: coverage?.defaultDiagram ?? '[no diagram found]',
      source: 'coverageDefault',
    },
    offenseSummary: `${personnel?.label ?? s.offense.personnelId} | ${formation?.label ?? s.offense.formationId}`,
    defenseSummary: `${front?.label ?? s.defense.frontId} | ${pkg?.label ?? s.defense.packageId} | ${coverage?.name ?? s.defense.coverageId}`,
    notes: {
      db: coverage?.rules.db ?? [],
      lb: coverage?.rules.lb ?? [],
      dl: coverage?.rules.dl ?? [],
    },
    offenseAttacks: [
      { id: 'flood', name: 'Flood', whyItWorks: ['Stresses the flat + deep outside third.'] },
      { id: 'four-verts', name: 'Four Verticals', whyItWorks: ['Stresses seams and forces deep defenders to declare.'] },
    ],
    warnings: warnings.length ? warnings : undefined,
  }
}
