import type { Contribution, Platform } from '../data/openSource'

interface Symbol {
  paths: string[]
  label: string
}

const githubPullRequest: Symbol = {
  paths: [
    'M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z',
  ],
  label: 'Pull Request',
}

const githubIssue: Symbol = {
  paths: [
    'M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
    'M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z',
  ],
  label: 'Issue',
}

const gerritChange: Symbol = {
  paths: [
    'M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z',
  ],
  label: 'Gerrit Change',
}

function resolve(platform: Platform, kind: Contribution['kind']): Symbol {
  if (kind === 'issue') return githubIssue
  return platform === 'gerrit' ? gerritChange : githubPullRequest
}

interface ContributionIconProps {
  platform: Platform
  kind: Contribution['kind']
  size?: number
}

export function ContributionIcon({ platform, kind, size = 13 }: ContributionIconProps) {
  const symbol = resolve(platform, kind)

  return (
    <svg
      className="contribution-icon"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      role="img"
      aria-label={symbol.label}
      focusable="false"
    >
      <title>{symbol.label}</title>
      {symbol.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export default ContributionIcon
