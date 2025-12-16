import { offenseData } from '@/data/offense'
import { defenseData } from '@/data/defense'
import type { Scenario } from '@/types/scenario'
import { byId } from '@/engine/lookups'

export type SelectOption = { value: string; label: string }

export type ControlDef = {
  id: string
  label: string
  getOptions: (scenario: Scenario) => SelectOption[]
  getDefault: (scenario: Scenario) => string | undefined
  getValue: (scenario: Scenario) => string
  setValue: (scenario: Scenario, value: string) => void
}

/**
 * MVP selector chains:
 * Offense: personnel -> formation
 * Defense: front -> package -> coverage
 */
export const controlSchema = {
  offense: {
    personnel: {
      id: 'offense.personnelId',
      label: 'Offensive personnel',
      getOptions: () =>
        offenseData.personnel.map(p => ({ value: p.id, label: p.label })),
      getDefault: () => offenseData.personnel[0]?.id,
      getValue: (s) => s.offense.personnelId,
      setValue: (s, v) => { s.offense.personnelId = v },
    } satisfies ControlDef,

    formation: {
      id: 'offense.formationId',
      label: 'Formation',
      getOptions: (s) =>
        offenseData.formations
          .filter(f => (f as any).allowedPersonnelIds?.includes(s.offense.personnelId))
          .map(f => ({ value: f.id, label: f.label })),
      getDefault: (s) =>
        offenseData.formations.find(f => (f as any).allowedPersonnelIds?.includes(s.offense.personnelId))?.id,
      getValue: (s) => s.offense.formationId,
      setValue: (s, v) => { s.offense.formationId = v },
    } satisfies ControlDef,
  },

  defense: {
    front: {
      id: 'defense.frontId',
      label: 'Defensive front',
      getOptions: () =>
        defenseData.fronts.map(fr => ({ value: fr.id, label: fr.label })),
      getDefault: () => defenseData.fronts[0]?.id,
      getValue: (s) => s.defense.frontId,
      setValue: (s, v) => { s.defense.frontId = v },
    } satisfies ControlDef,

    package: {
      id: 'defense.packageId',
      label: 'Package',
      getOptions: (s) => {
        const front = byId(defenseData.fronts, s.defense.frontId)
        return (front?.packages ?? []).map(p => ({ value: p.id, label: p.label }))
      },
      getDefault: (s) => {
        const front = byId(defenseData.fronts, s.defense.frontId)
        return front?.packages?.[0]?.id
      },
      getValue: (s) => s.defense.packageId,
      setValue: (s, v) => { s.defense.packageId = v },
    } satisfies ControlDef,

    coverage: {
      id: 'defense.coverageId',
      label: 'Coverage',
      getOptions: (s) => {
        const front = byId(defenseData.fronts, s.defense.frontId)
        const pkg = front?.packages?.find(p => p.id === s.defense.packageId)
        const allowedShells = (pkg as any)?.allowedShells as string[] | undefined

        return defenseData.coverages
          .filter(c => !allowedShells || allowedShells.includes((c as any).shell))
          .map(c => ({ value: c.id, label: c.name }))
      },
      getDefault: (s) => {
        const opts = (controlSchema.defense.coverage as ControlDef).getOptions(s)
        return opts[0]?.value
      },
      getValue: (s) => s.defense.coverageId,
      setValue: (s, v) => { s.defense.coverageId = v },
    } satisfies ControlDef,
  },
} as const
