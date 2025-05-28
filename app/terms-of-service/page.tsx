"use client";

export default function TermsOfService() {
  return (
    <div className="privacy-bg">
      <div className="privacy-card">
        <h1>Terms of Service</h1>
        <p className="privacy-date">Last updated: {new Date().toLocaleDateString()}</p>
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Kahaani Game ("we", "our", or "us"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
          </p>
        </section>
        <section>
          <h2>2. Use of Service</h2>
          <ul>
            <li>You must be at least 13 years old to use our services.</li>
            <li>You agree not to misuse the service or help anyone else do so.</li>
            <li>We may suspend or terminate your access if you violate these terms.</li>
          </ul>
        </section>
        <section>
          <h2>3. User Content</h2>
          <ul>
            <li>You are responsible for any content you submit or share.</li>
            <li>You must not upload content that is illegal, offensive, or infringes on others' rights.</li>
          </ul>
        </section>
        <section>
          <h2>4. Intellectual Property</h2>
          <p>
            All content, trademarks, and data on this site are the property of Kahaani Game or its licensors. You may not use our branding or content without permission.
          </p>
        </section>
        <section>
          <h2>5. Disclaimers</h2>
          <p>
            Our services are provided "as is" without warranties of any kind. We do not guarantee that the service will be error-free or uninterrupted.
          </p>
        </section>
        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Kahaani Game is not liable for any damages arising from your use of the service.
          </p>
        </section>
        <section>
          <h2>7. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Changes will be posted on this page with an updated date.
          </p>
        </section>
        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@kahaanigame.com">support@kahaanigame.com</a>.
          </p>
        </section>
      </div>
      <style jsx>{`
        .privacy-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #f7ecd7 0%, #f3f6fb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 8px;
        }
        .privacy-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          max-width: 700px;
          width: 100%;
          padding: 40px 32px;
          font-family: 'Inter', Arial, sans-serif;
        }
        h1 {
          font-size: 2.2rem;
          color: #7a4c15;
          margin-bottom: 0.5rem;
        }
        .privacy-date {
          color: #888;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }
        h2 {
          color: #a86c2c;
          font-size: 1.2rem;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
        }
        ul {
          margin: 0 0 1.5rem 1.2rem;
          padding: 0;
        }
        li {
          margin-bottom: 0.5rem;
        }
        section {
          margin-bottom: 1.5rem;
        }
        a {
          color: #7a4c15;
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          .privacy-card {
            padding: 20px 8px;
          }
          h1 {
            font-size: 1.4rem;
          }
          h2 {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </div>
  );
} 