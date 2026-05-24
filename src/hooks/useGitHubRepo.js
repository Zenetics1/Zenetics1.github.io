import { useEffect, useState } from 'react'
import { parseGitHubRepo } from '../utils/github'

const CACHE_KEY_PREFIX = 'github-repo-cache:'
const CACHE_TTL_MS = 5 * 60 * 1000
const EMPTY_REPO_STATE = {
  status: 'error',
  repo: null,
  commits: [],
  languages: [],
  activityWeeks: [],
  error: 'Add a valid GitHub repository URL to enable live tracking.',
}

function readCache(key) {
  try {
    const cachedValue = sessionStorage.getItem(key)

    if (!cachedValue) {
      return null
    }

    const parsedValue = JSON.parse(cachedValue)

    if (Date.now() - parsedValue.savedAt > CACHE_TTL_MS) {
      sessionStorage.removeItem(key)
      return null
    }

    return parsedValue.payload
  } catch {
    return null
  }
}

function writeCache(key, payload) {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        savedAt: Date.now(),
        payload,
      }),
    )
  } catch {
    // Ignore storage write failures so the UI can still render from network data.
  }
}

function getInitialRepoState(repoUrl) {
  const repoMeta = parseGitHubRepo(repoUrl)

  if (!repoMeta) {
    return EMPTY_REPO_STATE
  }

  const cachedPayload = readCache(`${CACHE_KEY_PREFIX}${repoMeta.owner}/${repoMeta.repo}`)

  if (cachedPayload) {
    return {
      status: 'ready',
      ...cachedPayload,
      error: '',
    }
  }

  return {
    status: 'loading',
    repo: null,
    commits: [],
    languages: [],
    activityWeeks: [],
    error: '',
  }
}

export function useGitHubRepo(repoUrl) {
  const [repoState, setRepoState] = useState(() => getInitialRepoState(repoUrl))

  useEffect(() => {
    const repoMeta = parseGitHubRepo(repoUrl)

    if (!repoMeta) {
      setRepoState(EMPTY_REPO_STATE)
      return
    }

    const cacheKey = `${CACHE_KEY_PREFIX}${repoMeta.owner}/${repoMeta.repo}`
    const cachedPayload = readCache(cacheKey)

    if (cachedPayload) {
      setRepoState((current) =>
        current.status === 'ready'
          ? current
          : { status: 'ready', ...cachedPayload, error: '' },
      )
      return
    }

    const controller = new AbortController()

    async function loadRepo() {
      try {
        setRepoState((current) =>
          current.status === 'loading' && !current.error ? current : { ...current, status: 'loading', error: '' },
        )

        const requestOptions = {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }

        const [repoResponse, commitsResponse, languagesResponse, activityResponse] = await Promise.all([
          fetch(repoMeta.apiBaseUrl, requestOptions),
          fetch(`${repoMeta.apiBaseUrl}/commits?per_page=2`, requestOptions),
          fetch(`${repoMeta.apiBaseUrl}/languages`, requestOptions),
          fetch(`${repoMeta.apiBaseUrl}/stats/commit_activity`, requestOptions),
        ])

        if (!repoResponse.ok || !commitsResponse.ok || !languagesResponse.ok) {
          throw new Error('GitHub data could not be loaded.')
        }

        const [repo, commits, languages, activityData] = await Promise.all([
          repoResponse.json(),
          commitsResponse.json(),
          languagesResponse.json(),
          // 202 means GitHub is still computing stats — use empty array as fallback
          activityResponse.status === 200 ? activityResponse.json() : Promise.resolve([]),
        ])

        const payload = {
          repo: {
            pushed_at: repo.pushed_at,
            language: repo.language,
            default_branch: repo.default_branch,
          },
          commits: commits.map((commit) => ({
            sha: commit.sha,
            message: commit.commit.message.split('\n')[0],
            href: commit.html_url,
          })),
          languages: Object.keys(languages).slice(0, 4),
          activityWeeks: activityData,
        }

        writeCache(cacheKey, payload)

        setRepoState({
          status: 'ready',
          ...payload,
          error: '',
        })
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setRepoState({
          ...EMPTY_REPO_STATE,
          error: error instanceof Error ? error.message : 'GitHub data could not be loaded.',
        })
      }
    }

    loadRepo()

    return () => controller.abort()
  }, [repoUrl])

  return repoState
}
