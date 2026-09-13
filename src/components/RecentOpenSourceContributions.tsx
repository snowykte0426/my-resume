import { openSourceProjects } from '../data/openSource'

const recentContributions = openSourceProjects
  .flatMap((project) =>
    project.contributions
      .filter((contribution) => contribution.kind !== 'issue')
      .map((contribution) => ({
        ...contribution,
        projectName: project.name,
      })),
  )
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 4)

export default function RecentOpenSourceContributions() {
  return (
    <ul>
      {recentContributions.map((contribution) => (
        <li key={contribution.url}>
          <a href={contribution.url}>
            {contribution.date} | {contribution.projectName} {contribution.title}
          </a>
        </li>
      ))}
      <li>
        <a className="more-link" href="#/open-source">
          전체 오픈소스 기여 기록 보기 →
        </a>
      </li>
    </ul>
  )
}
