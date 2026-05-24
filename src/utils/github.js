const GITHUB_HOST_PATTERN = /^https:\/\/github\.com\/[^/]+\/[^/?#]+/i
const DATE_FORMATTER = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function parseGitHubRepo(url) {
  if (!GITHUB_HOST_PATTERN.test(url)) {
    return null
  }

  const match = url.match(/github\.com\/([^/]+)\/([^/?#]+)/i)

  if (!match) {
    return null
  }

  const owner = match[1]
  const repo = match[2].replace(/\.git$/i, '')

  if (owner === 'your-username' || repo === 'your-repo') {
    return null
  }

  return {
    owner,
    repo,
    href: `https://github.com/${owner}/${repo}`,
    apiBaseUrl: `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
  }
}

export function formatUpdatedDate(value) {
  if (!value) {
    return 'Unavailable'
  }

  return DATE_FORMATTER.format(new Date(value))
}

export function getRepoMetrics(repo) {
  return [
    { label: 'Last push', value: formatUpdatedDate(repo?.pushed_at) },
    { label: 'Primary language', value: repo?.language || 'Unavailable' },
    { label: 'Default branch', value: repo?.default_branch || 'Unavailable' },
  ]
}
