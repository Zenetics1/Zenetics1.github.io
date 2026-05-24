export function ProjectsPanel({ activeProject, activeProjectIndex, projectCount }) {
  return (
    <article className="projects-panel glass-panel">
      <p className="section-label">Projects</p>
      <h2>My top 3 favourite builds.</h2>

      <article className="project-summary-card project-carousel-card">
        <div className="project-carousel-meta">
          <p className="project-category">{activeProject.category}</p>
          <span className="project-carousel-count">
            {activeProjectIndex + 1}/{projectCount}
          </span>
        </div>
        <h3>{activeProject.title}</h3>
        <p>{activeProject.summary}</p>

        <div className="project-carousel-dots" aria-label="Project carousel position">
          {Array.from({ length: projectCount }, (_, index) => (
            <span
              className={index === activeProjectIndex ? 'carousel-dot active' : 'carousel-dot'}
              key={index}
            />
          ))}
        </div>
      </article>
    </article>
  )
}
