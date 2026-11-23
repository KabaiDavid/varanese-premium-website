import { Link } from 'react-router-dom';
import { Legal } from '../components/Legal';
import { business } from '../data/business';

export default function Privacy() {
  return (
    <Legal eyebrow="Legal" title="Privacy *Policy*" updated="Last updated: March 13, 2026">
      <p>Varanese (“we,” “us,” or “our”) respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website at varanese.com or dine with us.</p>
      <h2>Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>Contact information you voluntarily provide through our contact form, including your name, email address, phone number, and message content.</li>
        <li>Reservation information submitted through our third-party reservation partner, OpenTable.</li>
        <li>Payment information processed through PayPal for gift card purchases. We do not store your payment details on our servers.</li>
        <li>Usage data such as pages visited, time spent on the site, and referring URLs, collected automatically through cookies and similar technologies.</li>
      </ul>
      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to your inquiries and messages</li>
        <li>To process gift card purchases</li>
        <li>To manage reservations</li>
        <li>To improve our website and services</li>
        <li>To comply with legal obligations</li>
      </ul>
      <h2>Cookies</h2>
      <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand how you interact with our site. You can control cookie preferences through your browser settings.</p>
      <h2>Third-Party Services</h2>
      <p>We use the following third-party services that may collect information according to their own privacy policies:</p>
      <ul>
        <li>OpenTable — for restaurant reservations. Please review <a href="https://www.opentable.com/legal/privacy-policy" target="_blank" rel="noopener">OpenTable’s Privacy Policy<span className="sr-only"> (opens in a new tab)</span></a>.</li>
        <li>PayPal — for processing gift card payments. Please review <a href="https://www.paypal.com/us/legalhub/privacy-full" target="_blank" rel="noopener">PayPal’s Privacy Policy<span className="sr-only"> (opens in a new tab)</span></a>.</li>
        <li>Google Maps — for displaying our location on the contact page.</li>
      </ul>
      <h2>Data Security</h2>
      <p>We take reasonable measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
      <h2>Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated “Last updated” date.</p>
      <h2>Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please <Link to="/contact/">contact us</Link>:</p>
      <address>Varanese<br />{business.address.street}<br />{business.address.city}, {business.address.region} {business.address.zip}<br /><a href={business.emailHref}>{business.email}</a><br /><a href={business.phoneHref}>{business.phone}</a></address>
    </Legal>
  );
}
