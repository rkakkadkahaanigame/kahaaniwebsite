"use client";

export default function Home() {
  return (
    <div className="landing-container">
      <img
        src="/family-illustration.png"
        alt="Family Illustration"
        width={800}
        height={534}
        className="landing-image"
        style={{
          maxWidth: "90vw",
          height: "auto",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
        }}
      />
      <h1 className="coming-soon">Coming Soon</h1>
      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f7ecd7;
          padding: 32px 16px;
        }
        .landing-image {
          max-width: 90vw;
          height: auto;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .coming-soon {
          margin-top: 2rem;
          font-size: 2.5rem;
          color: #7a4c15;
          font-weight: 700;
          letter-spacing: 2px;
          text-align: center;
        }
        @media (max-width: 600px) {
          .landing-container {
            padding: 16px 4px;
          }
          .landing-image {
            max-width: 100vw;
          }
          .coming-soon {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
} 