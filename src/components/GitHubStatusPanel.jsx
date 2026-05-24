import { getRepoMetrics } from '../utils/github'

function ActivityGraph({ weeks }) {
  if (!weeks.length) {
    return <div className="github-status-empty">Activity data unavailable.</div>
  }

  const maxTotal = Math.max(...weeks.map((w) => w.total), 1)

  return (
    <div className="activity-graph" aria-label="Weekly commit activity, last 52 weeks">
      {weeks.map((week) => (
        <div
          key={week.week}
          className={`activity-bar${week.total === 0 ? ' activity-bar-empty' : ''}`}
          style={{ '--bar-pct': `${(week.total / maxTotal) * 100}%` }}
          title={`${week.total} commit${week.total !== 1 ? 's' : ''}`}
        />
      ))}
    </div>
  )
}

export function GitHubStatusPanel({ repoMeta, featuredRepoUrl, githubRepo }) {
  const repoMetrics = getRepoMetrics(githubRepo.repo)

  return (
    <article className="signal-panel github-panel glass-panel">
      <div className="github-panel-header">
        <span className="signal-dot" />
        <p>Current Project Status</p>
      </div>
      <h3>Live GitHub tracker</h3>
      <p className="github-panel-copy">
        Link this card to a repository to surface recent commits and the languages in use.
      </p>

      <a
        className="github-repo-link"
        href={repoMeta ? repoMeta.href : featuredRepoUrl}
        target="_blank"
        rel="noreferrer"
      >
        <span>Repository</span>
        <strong>{repoMeta ? `${repoMeta.owner}/${repoMeta.repo}` : 'Set repo URL'}</strong>
      </a>

      {githubRepo.status === 'ready' ? (
        <>
          <div className="github-status-list" aria-label="GitHub summary">
            {repoMetrics.map((metric) => (
              <div className="github-status-row" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>

          <div className="github-language-list" aria-label="Languages used">
            {githubRepo.languages.map((language) => (
              <span className="github-language-pill" key={language}>
                {language}
              </span>
            ))}
          </div>

          <div className="github-activity-section">
            <p className="github-activity-label">Commit activity</p>
            <ActivityGraph weeks={githubRepo.activityWeeks} />
          </div>

          <div className="github-commit-list" aria-label="Latest commits">
            {githubRepo.commits.map((commit) => (
              <a
                className="github-commit-item"
                href={commit.href}
                key={commit.sha}
                target="_blank"
                rel="noreferrer"
              >
                <span>{commit.sha.slice(0, 7)}</span>
                <strong>{commit.message}</strong>
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="github-status-empty" aria-live="polite">
          {githubRepo.status === 'loading' ? 'Loading repository activity...' : githubRepo.error}
        </div>
      )}
    </article>
  )
}
