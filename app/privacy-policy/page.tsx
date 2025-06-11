"use client";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-bg">
      <div className="privacy-card">
        <h1 className="text-center">Privacy Policy</h1>
        <p className="privacy-date text-center">Last updated: {new Date().toLocaleDateString()}</p>
        <section>
          <h2>1. Introduction</h2>
          <p>
            Kahaani Game ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
          </p>
        </section>
        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Personal information you provide (such as email address when signing in)</li>
            <li>Usage data (such as progress, device information, and analytics)</li>
          </ul>
        </section>
        <section>
          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To improve user experience and our offerings</li>
            <li>To communicate with you about updates or support</li>
          </ul>
        </section>
        <section>
          <h2>4. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share data with service providers (such as Firebase) as necessary to operate our services, or if required by law.
          </p>
        </section>
        <section>
          <h2>5. Data Security</h2>
          <p>
            We use industry-standard measures to protect your data, but no method of transmission or storage is 100% secure.
          </p>
        </section>
        <section>
          <h2>6. Your Rights</h2>
          <p>
            You may request to access, update, or delete your personal information by contacting us.
          </p>
        </section>
        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
          </p>
        </section>
        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@kahaanigame.com">support@kahaanigame.com</a>.
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