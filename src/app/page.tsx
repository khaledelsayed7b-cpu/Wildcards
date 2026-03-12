import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Welcome to Hylthcare</h1>
          <p className={styles.subtitle}>
            Every provider gets a premium public profile page on their own subdomain.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>Unique Slug</h3>
              <p>Claim your url: <br/><code className={styles.code}>you.hylthcare.com</code></p>
            </div>
            <div className={styles.feature}>
              <h3>Three Templates</h3>
              <p>Minimal, Bold, or Warm — pick the style that matches your practice.</p>
            </div>
            <div className={styles.feature}>
              <h3>Blazing Fast</h3>
              <p>Lightning-fast static profiles globally distributed on the edge.</p>
            </div>
          </div>
          <div className={styles.cta}>
            <p><strong>Note:</strong> Because this is an API & Subdomain Demo, the signup flow is via the <code className={styles.code}>/api/auth/signup</code> endpoint.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
