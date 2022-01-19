export type NormalizedMenuItem = {
  path: string
  label: string
  id: string
  children: NormalizedMenuItem[] | null
  mega?: boolean
}
