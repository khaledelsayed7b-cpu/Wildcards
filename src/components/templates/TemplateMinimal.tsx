import type { Provider } from '@/types/provider'
import styles from './TemplateMinimal.module.css'

interface Props {
  provider: Provider
}

/**
 * Minimal Template — clean, white-space-driven, typography-first design.
 * Ideal for solo practitioners who want an editorial, understated look.
 */
export default function TemplateMinimal({ provider }: Props) {
  const { name, specialty, tagline, about, location, social, photos } = provider

  return (
    <main className={styles.root}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.container}>
          {provider.verified && (
            <span className={styles.badge}>✦ Verified Provider</span>
          )}
          <h1 className={styles.name}>{name}</h1>
          {specialty && <p className={styles.specialty}>{specialty}</p>}
          {tagline && <p className={styles.tagline}>&ldquo;{tagline}&rdquo;</p>}

          {location && (
            <p className={styles.location}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {location}
            </p>
          )}
        </div>
      </header>

      {/* About */}
      {about && (
        <section className={styles.section} aria-label="About">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.about}>{about}</p>
          </div>
        </section>
      )}

      {/* Photos */}
      {photos?.length > 0 && (
        <section className={styles.section} aria-label="Gallery">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Gallery</h2>
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

      {/* Social links */}
      {social && Object.values(social).some(Boolean) && (
        <section className={styles.section} aria-label="Connect">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Connect</h2>
            <div className={styles.socialLinks}>
              {social.website && (
                <a href={social.website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Website ↗
                </a>
              )}
              {social.instagram && (
                <a href={`https://instagram.com/${social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Instagram ↗
                </a>
              )}
              {social.twitter && (
                <a href={`https://twitter.com/${social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Twitter / X ↗
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  LinkedIn ↗
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
