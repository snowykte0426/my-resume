import type { Platform } from '../data/openSource'

const paths: Record<Platform, string> = {
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  gerrit:
    'M17.523 15.341a.999.999 0 1 1 0-1.999.999.999 0 0 1 0 1.999m-11.046 0a.999.999 0 1 1 0-1.999.999.999 0 0 1 0 1.999m11.405-6.02 1.997-3.459a.416.416 0 0 0-.72-.415l-2.022 3.503C15.59 8.244 13.853 7.851 12 7.851s-3.59.393-5.137 1.099L4.841 5.447a.416.416 0 0 0-.72.415l1.997 3.459C2.689 11.187.343 14.659 0 18.761h24c-.343-4.102-2.689-7.574-6.118-9.44',
}

const labels: Record<Platform, string> = {
  github: 'GitHub',
  gerrit: 'Gerrit (AOSP)',
}

interface PlatformIconProps {
  platform: Platform
  size?: number
}

export function PlatformIcon({ platform, size = 16 }: PlatformIconProps) {
  return (
    <svg
      className={`platform-icon platform-icon-${platform}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label={labels[platform]}
      focusable="false"
    >
      <title>{labels[platform]}</title>
      <path d={paths[platform]} />
    </svg>
  )
}

export default PlatformIcon
