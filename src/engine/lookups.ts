export function byId<T extends { id: string }>(arr: readonly T[], id: string | undefined) {
  if (!id) return undefined
  return arr.find(x => x.id === id)
}

export function indexById<T extends { id: string }>(arr: readonly T[]) {
  const m = new Map<string, T>()
  for (const item of arr) m.set(item.id, item)
  return m
}
