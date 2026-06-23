import { socialLinks } from '../data/siteContent'
import { SocialIcon } from './SocialIcon'

export function HeroSection() {
  return (
    <section className="hero-card glass-panel">
      <div className="hero-copy">
        <p className="eyebrow">WiZK 2026</p>
        <h1>My name is William</h1>
        <p className="lede">
          I am a Computer Engineering undergraduate at the University of Waterloo who is interested in Computer Hardware and Software.
          I enjoy coming up with fun ideas that explores my different interests. This is the place where all progress will be shared!
        </p>

        <div className="social-widgets" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              className="social-widget"
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noreferrer"
            >
              <span className="social-icon">
                <SocialIcon icon={link.icon} />
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        <div className="actions">
          <a className="primary-button" href="#portfolio">
            Portfolio
          </a>
          <a className="secondary-button" href="mailto:spitfirexigames@gmail.com">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}
