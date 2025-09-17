// /app/legal/terms/page.tsx
import React from "react";

export default function TermsPage() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", maxWidth: 800, margin: "40px auto", lineHeight: 1.6, color: "#333", padding: "0 20px" }}>
      <h1 style={{ color: "#14B8A6" }}>HelpHive Terms & Conditions</h1>
      <p><em>Last updated: September 2025</em></p>

      <h2 style={{ color: "#14B8A6" }}>1. Acceptance of Terms</h2>
      <p>By using HelpHive, you agree to these Terms & Conditions. If you do not agree, you may not use the platform.</p>

      <h2 style={{ color: "#14B8A6" }}>2. Description of Service</h2>
      <p>HelpHive is a platform that connects people posting short-term jobs with workers looking for opportunities. HelpHive itself does not provide or perform jobs.</p>

      <h2 style={{ color: "#14B8A6" }}>3. User Responsibilities</h2>
      <ul>
        <li>You must provide accurate information when registering.</li>
        <li>You are responsible for your own conduct and communications on the platform.</li>
        <li>You agree not to misuse the app for illegal or harmful purposes.</li>
      </ul>

      <h2 style={{ color: "#14B8A6" }}>4. Job Postings and Applications</h2>
      <p>Job posters are solely responsible for the accuracy of job details. Workers are solely responsible for the quality of the work they perform. HelpHive is not liable for any disputes between users.</p>

      <h2 style={{ color: "#14B8A6" }}>5. Payments</h2>
      <p>At this time, payments are handled directly between users. HelpHive may introduce secure payment features in the future and update these Terms accordingly.</p>

      <h2 style={{ color: "#14B8A6" }}>6. Limitation of Liability</h2>
      <p>HelpHive provides the platform “as is.” We are not liable for damages, losses, or disputes arising from jobs, communication, or agreements made between users.</p>

      <h2 style={{ color: "#14B8A6" }}>7. Changes to Terms</h2>
      <p>We may update these Terms from time to time. Continued use of the app after updates means you accept the new Terms.</p>

      <h2 style={{ color: "#14B8A6" }}>8. Contact</h2>
      <p>If you have questions, contact us at: <a href="mailto:support@helphive.app">support@helphive.app</a></p>
    </main>
  );
}
