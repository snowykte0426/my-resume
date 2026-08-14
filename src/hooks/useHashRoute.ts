import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getRoute() {
  return window.location.hash.replace(/^#/, '') || '/'
}

export function useHashRoute() {
  return useSyncExternalStore(subscribe, getRoute, () => '/')
}
