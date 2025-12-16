export const coverages = [
  {
    id: 'cover-3',
    name: 'Cover 3',
    shell: '1-high',
    rules: {
      db: ['3 deep defenders (outside thirds + middle third).'],
      lb: ['4 underneath zones (hook/curl + seam/flat depending on structure).'],
      dl: ['Rush 4; keep QB in the pocket when possible.'],
    },
    defaultDiagram: `OFFENSE (generic)
X  O  O  Z
   QB
   RB

DEFENSE (Cover 3 shell)
CB      S      CB
   O   O   O
      O O
`,
    vulnerabilityTags: ['flats', 'seams'],
  },
] as const
