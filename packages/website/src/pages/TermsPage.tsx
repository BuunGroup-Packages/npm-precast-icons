import { LEGAL_PAGES } from '../config/constants';

export function TermsPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1>{LEGAL_PAGES.terms.title}</h1>
          <p className="legal-description">{LEGAL_PAGES.terms.description}</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>Acceptance of Terms</h2>
            <p>
              By using this website and downloading icons from our collection, you agree to be bound
              by these Terms of Use. If you do not agree to these terms, please do not use our
              service.
            </p>
          </section>

          <section>
            <h2>License and Usage Rights</h2>
            <p>
              The icons in this collection are provided for both personal and commercial use, unless
              otherwise specified. However, you may not:
            </p>
            <ul>
              <li>Redistribute the entire icon collection as your own</li>
              <li>Sell individual icons or the collection</li>
              <li>Use brand logos in ways that might confuse consumers about brand affiliation</li>
              <li>Use icons for illegal, harmful, or offensive purposes</li>
            </ul>
          </section>

          <section>
            <h2>Brand Icons and Trademarks</h2>
            <p>
              Icons representing company logos, brands, or trademarks remain the property of their
              respective owners. Usage of these icons should comply with the brand guidelines and
              trademark policies of the respective companies.
            </p>
          </section>

          <section>
            <h2>Disclaimer of Warranties</h2>
            <p>
              The icons and this website are provided "as is" without any warranties, express or
              implied. We do not guarantee that the service will be uninterrupted, secure, or
              error-free.
            </p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Buun Group be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or relating to your use of the icons
              or this website.
            </p>
          </section>

          <section>
            <h2>Content Removal</h2>
            <p>
              We reserve the right to remove any icons from our collection at any time without
              notice. If you are a trademark owner and wish to request removal of your brand's icon,
              please contact us at <strong>hello@buun.group</strong>.
            </p>
          </section>

          <section>
            <h2>Modifications to Terms</h2>
            <p>
              We may modify these terms at any time. Continued use of the website after changes
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2>Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with applicable laws. Any
              disputes arising from these terms will be resolved through appropriate legal channels.
            </p>
          </section>

          <section>
            <h2>Contact Information</h2>
            <p>
              For questions about these terms, please contact us at:
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
