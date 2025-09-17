// /app/legal/privacy/page.tsx
import React from "react";

export default function PrivacyPage() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", maxWidth: 800, margin: "40px auto", lineHeight: 1.6, color: "#333", padding: "0 20px" }}>
      <h1 style={{ color: "#F59E0B" }}>HelpHive Privacy Policy</h1>
      <p><em>Last updated: September 2025</em></p>

      <h2 style={{ color: "#F59E0B" }}>1. Introduction</h2>
      <p>This Privacy Policy explains how HelpHive collects, uses, and protects your information when you use our platform.</p>

      <h2 style={{ color: "#F59E0B" }}>2. Information We Collect</h2>
      <ul>
        <li><strong>Account Information:</strong> such as your name, email address, and profile details.</li>
        <li><strong>Job Information:</strong> including job postings, applications, and messages you exchange.</li>
        <li><strong>Location Information:</strong> if you choose to provide a job location or use location-based filters.</li>
        <li><strong>Usage Data:</strong> such as app interactions and device information.</li>
      </ul>

      <h2 style={{ color: "#F59E0B" }}>3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and improve the HelpHive service.</li>
        <li>Enable communication between job posters and workers.</li>
        <li>Send important updates, notifications, and support messages.</li>
        <li>Maintain safety and prevent misuse of the platform.</li>
      </ul>

      <h2 style={{ color: "#F59E0B" }}>4. How We Share Information</h2>
      <p>We do not sell your personal information. We may share information:</p>
      <ul>
        <li>With other users when necessary to connect posters and workers.</li>
        <li>With service providers that help operate our platform (e.g., hosting, analytics, chat services).</li>
        <li>If required by law or to protect our rights and users’ safety.</li>
      </ul>

      <h2 style={{ color: "#F59E0B" }}>5. Data Retention</h2>
      <p>We keep your information only as long as necessary to provide our services and comply with legal obligations.</p>

      <h2 style={{ color: "#F59E0B" }}>6. Your Rights</h2>
      <p>You may update your profile information at any time. You may also request deletion of your account by contacting us.</p>

      <h2 style={{ color: "#F59E0B" }}>7. Security</h2>
      <p>We use reasonable measures to protect your information, but no system is completely secure.</p>

      <h2 style={{ color: "#F59E0B" }}>8. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Updates will be posted on this page with a new “last updated” date.</p>

      <h2 style={{ color: "#F59E0B" }}>9. Contact Us</h2>
      <p>If you have questions, contact us at: <a href="mailto:support@helphive.app">support@helphive.app</a></p>
    </main>
  );
}
