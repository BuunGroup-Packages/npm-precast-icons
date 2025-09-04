import { LEGAL_PAGES } from '../config/constants';

export function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1>{LEGAL_PAGES.privacy.title}</h1>
          <p className="legal-description">{LEGAL_PAGES.privacy.description}</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>Information We Collect</h2>
            <p>
              This website is a static site that showcases our icon library. We do not collect
              personal information, store user data, or use tracking cookies.
            </p>
          </section>

          <section>
            <h2>Analytics and Tracking</h2>
            <p>
              We may use basic web analytics to understand how visitors use our site. This may
              include anonymous data such as page views, browser type, and general location
              (country/region level only).
            </p>
            <p>
              No personally identifiable information is collected or stored through these analytics.
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>
              Our website is hosted on Cloudflare Pages. Please refer to{' '}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare's Privacy Policy
              </a>{' '}
              for information about their data handling practices.
            </p>
          </section>

          <section>
            <h2>Icon Downloads</h2>
            <p>
              When you download icons from our site, the download is processed locally in your
              browser. We do not track or store information about which icons you download.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on
              this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at:
              <br />
              <strong>hello@buun.group</strong>
            </p>
          </section>
        </div>

        <div className="last-updated">
          <p>
            <small>Last updated: {new Date().toLocaleDateString()}</small>
          </p>
        </div>
      </div>
    </div>
  );
}
