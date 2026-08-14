import { useEffect } from 'react'
import { openSourceProjects } from '../data/openSource'
import PlatformIcon from './PlatformIcon'
import './OpenSourceList.css'

function DiffStat({ additions, deletions }: { additions: number; deletions: number }) {
  return (
    <span className="diffstat" aria-label={`${additions}줄 추가, ${deletions}줄 삭제`}>
      <span className="diffstat-added">+{additions.toLocaleString()}</span>
      <span className="diffstat-deleted">−{deletions.toLocaleString()}</span>
    </span>
  )
}

export function OpenSourceList() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="oss-page">
      <a className="oss-back" href="#/">
        ← 이력서로 돌아가기
      </a>

      <h1>Open Source Contributions</h1>

      {openSourceProjects.map((project) => (
        <section className="oss-project" key={`${project.owner}/${project.name}`}>
          <h2>
            <a href={project.url} target="_blank" rel="noreferrer noopener">
              <PlatformIcon platform={project.platform} size={17} />
              <span className="oss-project-owner">{project.owner}/</span>
              {project.name}
            </a>
          </h2>

          <p className="oss-project-description">{project.description}</p>

          <ol className="oss-contributions">
            {project.contributions.map((contribution) => (
              <li className="oss-contribution" key={contribution.url}>
                <time className="oss-date">{contribution.date}</time>
                <div className="oss-contribution-body">
                  <a
                    className="oss-contribution-title"
                    href={contribution.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {contribution.title}
                    <span className="oss-ref">
                      <PlatformIcon platform={project.platform} size={12} />
                      {contribution.ref}
                    </span>
                  </a>
                  <p className="oss-contribution-summary">{contribution.summary}</p>
                  <p className="oss-contribution-stats">
                    <DiffStat
                      additions={contribution.additions}
                      deletions={contribution.deletions}
                    />
                    <span className="oss-files">{contribution.changedFiles}개 파일</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <a className="oss-back oss-back-bottom" href="#/">
        ← 이력서로 돌아가기
      </a>
    </div>
  )
}

export default OpenSourceList
