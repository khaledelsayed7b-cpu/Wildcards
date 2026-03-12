import type { Provider } from '@/types/provider'
import styles from './TemplateWarm.module.css'

interface Props {
  provider: Provider
}

/**
 * Warm Template (default) — soft gradients, rounded cards, approachable design.
 * Perfect for family doctors, dentists, and general practitioners.
 */
export default function TemplateWarm({ provider }: Props) {
  const { name, specialty, tagline, about, location, social, photos } = provider

  return (
    <main className={styles.root}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroGradient} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroCard}>
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
        </div>
      </header>

      {/* About */}
      {about && (
        <section className={styles.section} aria-label="About">
          <div className={styles.container}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>About</h2>
              <p className={styles.cardText}>{about}</p>
            </div>
          </div>
        </section>
      )}

      {/* Photos */}
      {photos?.length > 0 && (
        <section className={styles.section} aria-label="Gallery">
          <div className={styles.container}>
            <h2 className={styles.looseTitle}>Gallery</h2>
            <div className={styles.gallery}>
              {photos.map((photo, i) => (
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

      {/* Social */}
      {social && Object.values(social).some(Boolean) && (
        <section className={styles.socialSection} aria-label="Connect">
          <div className={styles.container}>
            <h2 className={styles.looseTitle}>Connect</h2>
            <div className={styles.socialRow}>
              {social.website && (
                <a href={social.website} target="_blank" rel="noopener noreferrer" className={styles.chip}>
                  🌐 Website
                </a>
              )}
              {social.instagram && (
                <a href={`https://instagram.com/${social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.chip}>
                  📸 Instagram
                </a>
              )}
              {social.twitter && (
                <a href={`https://twitter.com/${social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.chip}>
                  🐦 Twitter / X
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.chip}>
                  💼 LinkedIn
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
