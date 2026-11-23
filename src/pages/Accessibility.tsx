import { Link } from 'react-router-dom';
import { Legal } from '../components/Legal';
import { business } from '../data/business';

export default function Accessibility() {
  return (
    <Legal eyebrow="Accessibility" title="Accessibility *Statement*" updated="Last reviewed: October 12, 2026">
      <p>Varanese is committed to providing a website that is accessible to the widest possible audience, including people with disabilities. We want every guest to be able to browse our menu, learn about our events, make a reservation, and get in touch with us, regardless of ability or the technology they use.</p>
      <h2>Our Accessibility Standard</h2>
      <p>We use the <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">Web Content Accessibility Guidelines (WCAG) 2.2<span className="sr-only"> (opens in a new tab)</span></a> at Level AA as the benchmark for our website. These guidelines, published by the World Wide Web Consortium (W3C), explain how to make web content more accessible to people with a wide range of disabilities, including visual, auditory, physical, speech, cognitive, and neurological disabilities. We consider them the appropriate measure of an accessible website under the Americans with Disabilities Act (ADA).</p>
      <p>We work toward full conformance with WCAG 2.2 Level AA. As described below, some content provided by third parties may not yet fully conform.</p>
      <h2>Steps We Have Taken</h2>
      <ul>
        <li>Built the site with semantic HTML, including page landmarks, a logical heading structure, and a “Skip to main content” link, so assistive technologies such as screen readers can navigate it.</li>
        <li>Made all navigation menus, buttons, forms, and image sequences usable with a keyboard alone, with a clearly visible focus indicator.</li>
        <li>Chose text and background colors that meet WCAG contrast requirements.</li>
        <li>Provided text alternatives for meaningful images, and published our dinner menu, wine list, drink list, and event details as real text rather than images or PDFs.</li>
        <li>Labeled every form field and set up the forms so browsers and assistive technologies can help fill them in. Error and confirmation messages are announced to screen readers.</li>
        <li>Honored the “reduce motion” setting on your device by turning off decorative animations, and provided a pause control for the homepage image sequence.</li>
        <li>Designed the site to work at any screen size and when text is enlarged with browser zoom up to 200%.</li>
        <li>Identified links that open in a new browser tab to screen reader users.</li>
      </ul>
      <h2>Ongoing Efforts</h2>
      <p>Accessibility is an ongoing effort, not a one-time project. We keep accessibility in mind when we add or update content. We intend to re-review the website periodically and when we make significant changes, and we act promptly on the feedback we receive from our guests.</p>
      <h2>Third-Party Services</h2>
      <p>Some features of our website are provided by third-party services that we do not own or control. These include:</p>
      <ul>
        <li>OpenTable for online reservations</li>
        <li>PayPal for gift certificate purchases</li>
        <li>Google Maps for our location map</li>
        <li>Facebook, X (Twitter), and Tripadvisor social media pages</li>
      </ul>
      <p>We choose established providers and encourage them to meet accessibility standards, but we cannot guarantee the accessibility of their content. If you have trouble using any of these services, please call us at <a href={business.phoneHref}>{business.phone}</a>. We will gladly take your reservation, help you purchase a gift certificate, or give you directions over the phone.</p>
      <h2>Known Limitations</h2>
      <ul>
        <li>Some event flyers are images that contain text. The same event details, such as date, time, price, and menu, are also provided as text on each event’s page.</li>
        <li>The embedded Google Map is provided by Google. Our address and driving directions are also listed in text on our <Link to="/contact/">Contact page</Link>.</li>
      </ul>
      <h2>Alternative Access</h2>
      <p>If any part of our website is difficult for you to use, we are happy to help another way. For example, we can read the menu to you over the phone, email you menu or event information in a format that works for you, or take your reservation directly.</p>
      <h2>Feedback and Contact Information</h2>
      <p>We welcome your feedback. If you come across an accessibility barrier on our website, or have suggestions for how we can improve, please let us know. To help us respond, please include the web page address (URL) and a description of the problem.</p>
      <address>Varanese<br />Attn: Website Accessibility<br />{business.address.street}<br />{business.address.city}, {business.address.region} {business.address.zip}<br />Phone: <a href={business.phoneHref}>{business.phone}</a><br />Email: <a href={business.emailHref}>{business.email}</a></address>
      <p>You can also reach us through our <Link to="/contact/">contact form</Link>. We take accessibility feedback seriously and will respond as promptly as we are able.</p>
    </Legal>
  );
}
