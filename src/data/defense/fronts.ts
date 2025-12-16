export const defensiveFronts = [
  {
    id: '4-3',
    label: '4–3',
    packages: [
      {
        id: '4-3-base',
        label: 'Base 4–3',
        counts: { dl: 4, lb: 3, db: 4 },
        allowedShells: ['1-high', '2-high'],
      },
      {
        id: '4-2-5',
        label: 'Nickel 4–2–5',
        counts: { dl: 4, lb: 2, db: 5 },
        allowedShells: ['1-high', '2-high'],
      },
    ],
  },
] as const

