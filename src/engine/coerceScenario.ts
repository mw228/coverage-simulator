import type { Scenario } from '@/types/scenario'
import { controlSchema } from '@/engine/controlSchema'

export function coerceScenario(s: Scenario): void {
  // Offense chain: personnel -> formation
  {
    const p = controlSchema.offense.personnel
    const f = controlSchema.offense.formation

    if (!p.getOptions(s).some(o => o.value === p.getValue(s))) {
      const d = p.getDefault(s)
      if (d) p.setValue(s, d)
    }
    if (!f.getOptions(s).some(o => o.value === f.getValue(s))) {
      const d = f.getDefault(s)
      if (d) f.setValue(s, d)
    }
  }

  // Defense chain: front -> package -> coverage
  {
    const fr = controlSchema.defense.front
    const pk = controlSchema.defense.package
    const cv = controlSchema.defense.coverage

    if (!fr.getOptions(s).some(o => o.value === fr.getValue(s))) {
      const d = fr.getDefault(s)
      if (d) fr.setValue(s, d)
    }
    if (!pk.getOptions(s).some(o => o.value === pk.getValue(s))) {
      const d = pk.getDefault(s)
      if (d) pk.setValue(s, d)
    }
    if (!cv.getOptions(s).some(o => o.value === cv.getValue(s))) {
      const d = cv.getDefault(s)
      if (d) cv.setValue(s, d)
    }
  }
}
