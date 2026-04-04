import productsData from './products.json'
import { STORAGE_FIRMWARE, STORAGE_MODEL } from './deviceStorage'

export type ProductNavItem = { to: string; label: string; key: string }

const OPTION_ROUTE: Record<string, string> = {
  monitor: '/dashboard',
  settings: '/settings',
  logs: '/logs',
  help: '/help',
}

function routeForOptionName(name: string): string {
  const k = name.trim().toLowerCase()
  return OPTION_ROUTE[k] ?? `/section/${encodeURIComponent(name.trim())}`
}

function defaultProductNav(): ProductNavItem[] {
  return [
    { to: '/dashboard', label: 'Monitor', key: 'Monitor' },
    { to: '/settings', label: 'Settings', key: 'Settings' },
    { to: '/logs', label: 'Logs', key: 'Logs' },
    { to: '/help', label: 'Help', key: 'Help' },
  ]
}

export function getProductNavFromStorage(): ProductNavItem[] {
  const model = localStorage.getItem(STORAGE_MODEL)?.trim()
  const firmware = localStorage.getItem(STORAGE_FIRMWARE)?.trim()
  if (!model || !firmware) {
    return defaultProductNav()
  }

  const product = productsData.products.find((p) => p.product_name === model)
  const version = product?.versions.find((v) => v.version === firmware)
  const params = version?.sidebar_params
  if (!params?.length) {
    return defaultProductNav()
  }

  const seen = new Set<string>()
  const items: ProductNavItem[] = []
  for (const entry of params) {
    const label = entry.option_name
    if (!label || seen.has(label)) continue
    seen.add(label)
    items.push({
      to: routeForOptionName(label),
      label,
      key: label,
    })
  }
  return items.length > 0 ? items : defaultProductNav()
}

export const tailNavItems: ProductNavItem[] = [
  { to: '/profile', label: 'Profile', key: '__profile' },
  { to: '/login', label: 'Logout', key: '__logout' },
]
