import { portfolioCategories } from '../data/siteContent'

function PortfolioCategoryCard({ category }) {
  return (
    <a className={`portfolio-category-card ${category.accent}`} href={`#portfolio/${category.slug}`}>
      <span className="portfolio-card-label">{category.eyebrow}</span>
      <h3>{category.label}</h3>
      <p>{category.description}</p>
      <span className="portfolio-card-link">Open page</span>
    </a>
  )
}

function PortfolioProjectCard({ category, project }) {
  return (
    <article className="portfolio-project-card">
      <div className="portfolio-project-media">
        <div className="portfolio-project-preview">
          <div className="portfolio-project-embed-shell">
            <iframe
              className="portfolio-project-embed"
              src={project.videoUrl}
              title={project.title}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="portfolio-project-copy">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
    </article>
  )
}

export function PortfolioPage({ activeCategory }) {
  if (activeCategory) {
    return (
      <section className="portfolio-page glass-panel">
        <div className="portfolio-page-header">
          <p className="section-label">{activeCategory.eyebrow}</p>
          <h2>{activeCategory.label}</h2>
          <p className="portfolio-description">{activeCategory.description}</p>
        </div>

        <div className="portfolio-actions">
          <a className="secondary-button" href="#portfolio">
            Back to Portfolio
          </a>
          <a className="secondary-button" href="#home">
            Home
          </a>
        </div>

        <div className="portfolio-project-grid">
          {activeCategory.projects.map((project) => (
            <PortfolioProjectCard category={activeCategory} key={project.title} project={project} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="portfolio-page glass-panel">
      <div className="portfolio-page-header">
        <p className="section-label">Portfolio Directory</p>
        <h2>Check out my projects!</h2>
        <p className="portfolio-description">
          Take a look at some of my hobby, software, and hardware projects.
        </p>
      </div>

      <div className="portfolio-actions">
        <a className="secondary-button" href="#home">
          Back Home
        </a>
      </div>

      <div className="portfolio-category-grid">
        {portfolioCategories.map((category) => (
          <PortfolioCategoryCard category={category} key={category.slug} />
        ))}
      </div>
    </section>
  )
}
