import type { Provider } from '@/types/provider'
import styles from './TemplateBold.module.css'

interface Props {
  provider: Provider
}

/**
 * Bold Template — high-contrast, impactful hero, strong visual hierarchy.
 * Great for clinics and specialist practices that want to command attention.
 */
export default function TemplateBold({ provider }: Props) {
  const { name, specialty, tagline, about, location, social, photos } = provider

  const heroPhoto = photos?.[0]
  const galleryPhotos = photos?.slice(1) ?? []

  return (
    <main className={styles.root}>
      {/* Full-bleed Hero */}
      <header className={styles.hero} style={heroPhoto ? { backgroundImage: `url(${heroPhoto.url})` } : undefined}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          {provider.verified && (
            <span className={styles.badge}>✦ Verified Provider</span>
          )}
          <h1 className={styles.name}>{name}</h1>
          {specialty && <p className={styles.specialty}>{specialty}</p>}
          {tagline && <p className={styles.tagline}>{tagline}</p>}
          {location && (
            <p className={styles.location}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {location}
            </p>
          )}
        </div>
      </header>

      {/* About */}
      {about && (
        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <div className={styles.aboutInner}>
              <div className={styles.accentBar} aria-hidden="true" />
              <div>
                <h2 className={styles.sectionLabel}>About</h2>
                <p className={styles.aboutText}>{about}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {galleryPhotos.length > 0 && (
        <section className={styles.gallerySection} aria-label="Gallery">
          <div className={styles.container}>
            <h2 className={styles.sectionLabel}>Gallery</h2>
            <div className={styles.gallery}>
              {galleryPhotos.map((photo, i) => (
                <figure key={i} className={styles.figure}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={photo.label || `Photo ${i + 1}`} className={styles.photo} />
                  {photo.label && <figcaption className={styles.caption}>{photo.label}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social / Contact */}
      {social && Object.values(social).some(Boolean) && (
        <section className={styles.socialSection} aria-label="Connect">
          <div className={styles.container}>
            <h2 className={styles.socialTitle}>Connect With Us</h2>
            <div className={styles.socialGrid}>
              {social.website && (
                <a href={social.website} target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                  <span className={styles.socialIcon}>🌐</span>
                  <span>Website</span>
                </a>
              )}
              {social.instagram && (
                <a href={`https://instagram.com/${social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                  <span className={styles.socialIcon}>📸</span>
                  <span>Instagram</span>
                </a>
              )}
              {social.twitter && (
                <a href={`https://twitter.com/${social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                  <span className={styles.socialIcon}>🐦</span>
                  <span>Twitter / X</span>
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
                  <span className={styles.socialIcon}>💼</span>
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <p>Powered by <strong>Hylthcare</strong></p>
      </footer>
    </main>
  )
}
