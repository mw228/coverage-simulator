import { offensivePersonnel } from './personnel'
import { offensiveFormations } from './formations'
import { offensiveConcepts } from './concepts'

export const offenseData = {
  personnel: offensivePersonnel,
  formations: offensiveFormations,
  concepts: offensiveConcepts,
} as const
