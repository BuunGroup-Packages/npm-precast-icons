import { COMPANY_INFO } from '../config/constants';
import { SEO } from '../components/SEO';
import { FiAlertTriangle, FiFileText, FiExternalLink } from 'react-icons/fi';

export function DisclaimerPage() {
  return (
    <>
      <SEO
        title="Disclaimer"
        description="Important information about icon usage, licenses, copyrights, trademarks, and brand guidelines for Precast Icons."
      />
      <div className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>Disclaimer</h1>
            <p className="legal-description">
              Precast Icons users are asked to read this disclaimer fully before including an icon
              in their project.
            </p>
          </div>

          <div className="disclaimer-layout">
            {/* Fixed sidebar TOC for desktop */}
            <div className="table-of-contents-sidebar">
              <div className="toc-sticky">
                <h3>Table of Contents</h3>
                <ul>
                  <li>
                    <a href="#licenses">
                      <FiExternalLink size={14} /> Copyrights & Licensing
                    </a>
                  </li>
                  <li>
                    <a href="#brand-guidelines">
                      <FiExternalLink size={14} /> Brand Guidelines
                    </a>
                  </li>
                  <li>
                    <a href="#update-brands">
                      <FiExternalLink size={14} /> Icon Updates
                    </a>
                  </li>
                  <li>
                    <a href="#removal-brands">
                      <FiExternalLink size={14} /> Removal Requests
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile/tablet TOC at top */}
            <div className="mobile-toc">
              <h3>Table of Contents</h3>
              <ul>
                <li>
                  <a href="#licenses">
                    <FiExternalLink size={14} /> Copyrights & Licensing
                  </a>
                </li>
                <li>
                  <a href="#brand-guidelines">
                    <FiExternalLink size={14} /> Brand Guidelines
                  </a>
                </li>
                <li>
                  <a href="#update-brands">
                    <FiExternalLink size={14} /> Icon Updates
                  </a>
                </li>
                <li>
                  <a href="#removal-brands">
                    <FiExternalLink size={14} /> Removal Requests
                  </a>
                </li>
              </ul>
            </div>

            <div className="legal-content">
              <section id="licenses">
                <h2>Copyrights & Licensing</h2>

                <div className="important-notice">
                  <h3>
                    <FiAlertTriangle size={16} /> Important Notice
                  </h3>
                  <p>
                    License information is continuously being added to our icon collection. If
                    license details are not specified for a particular icon, this does not indicate
                    the icon is license-free.
                  </p>
                </div>

                <div className="note">
                  <h3>
                    <FiFileText size={16} /> Licensing Overview
                  </h3>
                  <p>
                    While the Precast Icons library is distributed under CC0, individual icons may
                    have different licensing terms. Always verify the specific license for each icon
                    you intend to use.
                  </p>
                </div>

                <p>
                  We strive to provide accurate licensing information for every icon in our
                  collection. Users are strongly encouraged to review licensing terms before
                  implementation, particularly for commercial projects. License terms may be updated
                  by original creators, so periodic verification is recommended.
                </p>

                <p>
                  Licensing details can be accessed through our NPM package metadata, individual
                  icon pages on our website, or the accompanying JSON documentation files
                  distributed with the package.
                </p>

                <p>
                  Our community helps maintain accurate licensing information. If you discover
                  outdated or incorrect license data, please report it via our{' '}
                  <a href={COMPANY_INFO.github.repo} target="_blank" rel="noopener noreferrer">
                    GitHub repository
                  </a>{' '}
                  so we can investigate and update the information promptly.
                </p>

                <p>
                  When an icon contains registered trademark symbols (® or ™), our editorial team
                  evaluates whether to preserve these symbols based on the icon's intended use case
                  and the brand owner's preferences.
                </p>

                <p>
                  Users assume full responsibility for their use of these icons. Precast Icons and
                  its contributors are not liable for any legal issues that may arise from icon
                  usage. We recommend consulting with legal counsel for commercial applications
                  involving trademarked content.
                </p>
              </section>

              <section id="brand-guidelines">
                <h2>Brand Guidelines</h2>

                <div className="note">
                  <h3>
                    <FiFileText size={16} /> Guidelines Notice
                  </h3>
                  <p>
                    Brand guideline documentation is an evolving feature of our platform. We
                    encourage users to consult original brand sources when available. The absence of
                    guideline links does not mean brands have no usage restrictions.
                  </p>
                </div>

                <p>
                  When available, we include direct links to official brand usage guidelines and
                  style documentation. Users should review and comply with these guidelines to
                  ensure proper brand representation. Brand requirements may evolve, so we recommend
                  checking for updates periodically.
                </p>

                <p>
                  Brand guideline references are accessible through our package documentation,
                  individual icon metadata, and dedicated guideline links on our website when
                  provided by brand owners.
                </p>

                <p>
                  Community contributions help keep our guideline database current. If you find
                  broken links or missing guidelines, please notify us through our{' '}
                  <a href={COMPANY_INFO.github.repo} target="_blank" rel="noopener noreferrer">
                    GitHub repository
                  </a>{' '}
                  for prompt correction.
                </p>
              </section>

              <section id="update-brands">
                <h2>Icon Updates</h2>
                <p>
                  Brand representatives seeking to update their icon representation or associated
                  metadata may submit requests through our{' '}
                  <a href={COMPANY_INFO.github.repo} target="_blank" rel="noopener noreferrer">
                    GitHub repository
                  </a>
                  . Please include verification of brand affiliation and detailed update
                  requirements. Standard updates are processed weekly, though urgent requests may
                  receive expedited review.
                </p>
              </section>

              <section id="removal-brands">
                <h2>Removal Requests</h2>
                <p>
                  Brand owners may request icon removal by contacting us at{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a> with proof of
                  brand ownership and removal justification. Alternatively, submit a detailed
                  request via our{' '}
                  <a href={COMPANY_INFO.github.repo} target="_blank" rel="noopener noreferrer">
                    GitHub repository
                  </a>{' '}
                  including the same documentation.
                </p>

                <p>
                  Standard icon reviews occur biannually during major version releases, with icons
                  that no longer meet inclusion criteria being retired. Urgent removal requests
                  receive priority processing when properly documented.
                </p>
              </section>

              <section>
                <h2>Support & Resources</h2>
                <p>
                  For detailed information about specific icon licensing, brand compliance
                  resources, or technical documentation, visit our{' '}
                  <a href={COMPANY_INFO.github.repo} target="_blank" rel="noopener noreferrer">
                    GitHub repository
                  </a>{' '}
                  or reach out to our team directly.
                </p>

                <p>
                  We maintain our commitment to intellectual property respect and deliver a
                  professional-grade icon library that supports developers while upholding brand
                  integrity and legal compliance standards.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
