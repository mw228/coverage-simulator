export type OffenseInstance = {
  personnelId: string
  formationId: string
  conceptId?: string
}

export type DefenseInstance = {
  frontId: string
  packageId: string
  coverageId: string
}

export type Scenario = {
  offense: OffenseInstance
  defense: DefenseInstance
}

export type MatchupResult = {
  title: string
  diagram: {
    ascii: string
    source: 'template' | 'coverageDefault' | 'generated'
    templateId?: string
  }
  offenseSummary: string
  defenseSummary: string
  notes: {
    db: string[]
    lb: string[]
    dl: string[]
  }
  offenseAttacks: Array<{
    id: string
    name: string
    whyItWorks: string[]
  }>
  warnings?: string[]
}
