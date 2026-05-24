import { useEffect, useState } from 'react'
// import { GitHubStatusPanel } from './components/GitHubStatusPanel'
import { HeroSection } from './components/HeroSection'
import { PortfolioPage } from './components/PortfolioPage'
import {
  // featuredRepoUrl,
  portfolioCategories,
  scenePanels,
} from './data/siteContent'
// import { useGitHubRepo } from './hooks/useGitHubRepo'
// import { parseGitHubRepo } from './utils/github'

function getPageFromHash(hash) {
  const normalizedHash = hash.replace(/^#/, '')

  if (!normalizedHash || normalizedHash === 'home') {
    return { view: 'home', categorySlug: null }
  }

  if (normalizedHash === 'portfolio') {
    return { view: 'portfolio', categorySlug: null }
  }

  if (normalizedHash.startsWith('portfolio/')) {
    return { view: 'portfolio', categorySlug: normalizedHash.slice('portfolio/'.length) }
  }

  return { view: 'home', categorySlug: null }
}

export default function App() {
  const [page, setPage] = useState(() => getPageFromHash(window.location.hash))
  // const githubRepo = useGitHubRepo(featuredRepoUrl)
  // const repoMeta = useMemo(() => parseGitHubRepo(featuredRepoUrl), [])
  const activeCategory = portfolioCategories.find((category) => category.slug === page.categorySlug)
  const isPortfolioView = page.view === 'portfolio'

  useEffect(() => {
    const handleHashChange = () => {
      setPage((currentPage) => {
        const nextPage = getPageFromHash(window.location.hash)

        if (
          currentPage.view === nextPage.view &&
          currentPage.categorySlug === nextPage.categorySlug
        ) {
          return currentPage
        }

        return nextPage
      })
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <main className={isPortfolioView ? 'page-shell portfolio-shell' : 'page-shell'}>
      {isPortfolioView ? (
        <div className="page-background portfolio-background" aria-hidden="true" />
      ) : (
        <div className="page-background" aria-hidden="true">
          <div className="background-glow glow-one" />
          <div className="background-glow glow-two" />
          <div className="background-grid">
            {scenePanels.map((panelClassName) => (
              <span className={`scene-tile ${panelClassName}`} key={panelClassName} />
            ))}
          </div>
        </div>
      )}

      <div className="page-content">
        {isPortfolioView ? (
          <PortfolioPage activeCategory={activeCategory} />
        ) : (
          <>
            <HeroSection />

            {/* GitHub project tracker — commented out for performance
            <section className="details-grid" id="details">
              <GitHubStatusPanel
                featuredRepoUrl={featuredRepoUrl}
                githubRepo={githubRepo}
                repoMeta={repoMeta}
              />
            </section>
            */}
          </>
        )}
      </div>
    </main>
  )
}
