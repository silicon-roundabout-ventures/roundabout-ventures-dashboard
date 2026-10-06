import React from 'react';
import ParticleBackground from '@/components/layouts/ParticleBackground';
import Layout from '@/components/layouts/Layout';

const PrivacyContent = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <ParticleBackground />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            &lt;Privacy Policy/&gt;
          </h1>
          <p className="text-srv-gray text-center mb-12 font-mono">
            Effective Date: 5 October 2026
          </p>

          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-8 text-white/90 space-y-4">
            <h2 className="text-2xl font-bold text-white">Organiser and Data Controller</h2>
            <p>
              Silicon Roundabout Ventures Advisers Ltd (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;), a private limited company registered in England and Wales
              (company number 13535840), registered office 71-75 Shelton Street, London,
              England, WC2H 9JQ. Silicon Roundabout Ventures Advisers Ltd is regulated in
              the UK by the Financial Conduct Authority (FRN 969137) and registered with
              the Information Commissioner&apos;s Office (registration number ZB669290).
            </p>
            <p>
              We respect your privacy and are committed to handling your personal
              information responsibly. This Privacy Policy explains how we collect, use,
              and share information when you register for or attend our event.
            </p>
          </div>

          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-8 text-white/90 space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
            <p>
              When you register for or attend our event, we may collect information that
              you voluntarily provide to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full name</li>
              <li>Contact details (email address, phone number)</li>
              <li>Organization / Company name and job title</li>
              <li>Company description and industry details</li>
              <li>
                Any additional professional details or preferences you submit during
                registration
              </li>
            </ul>
          </div>

          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-8 text-white/90 space-y-4">
            <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
            <p>
              We use your information for the administration, coordination, and execution
              of the event, as well as optional updates:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing your registration and entry credentials</li>
              <li>Communicating important event updates, schedules, and logistics</li>
              <li>
                Organizing event programs, attendee directories, or networking features
                (if applicable)
              </li>
              <li>Coordinating event logistics with our official event co-organisers</li>
              <li>
                Facilitating venue access, on-site safety, security, and emergency
                response
              </li>
              <li>
                <span className="font-bold text-white">Newsletter &amp; Communications:</span>{' '}
                Subject to acceptance, to receive general updates, news, and insights
                from us, your email address will be added to our mailing list / blog
                publication list. You can unsubscribe from these communications at any
                time using the link provided at the bottom of any email.
              </li>
            </ul>
            <p>Our legal bases for using your information are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-bold text-white">Legitimate interests:</span>{' '}
                running and managing the event, coordinating with our co-organisers and
                the venue, and keeping attendees safe. You can object to this use at any
                time by contacting us.
              </li>
              <li>
                <span className="font-bold text-white">Consent:</span> sending you our
                newsletter and updates. You can withdraw your consent at any time by
                unsubscribing.
              </li>
              <li>
                <span className="font-bold text-white">Legal obligation:</span>{' '}
                disclosing information where the law requires it.
              </li>
            </ul>
          </div>

          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-8 text-white/90 space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Sharing Your Information</h2>
            <p>
              We do not sell your personal data. We only share your information in the
              following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-bold text-white">Event Co-Organisers:</span> We
                share registration details (including attendee names, contact info, and
                company details) with our official event co-organisers strictly for
                planning, communication, and event management purposes.
              </li>
              <li>
                <span className="font-bold text-white">Blog / Email Platforms:</span> If
                you consent to receive updates, your email address and name will be
                processed through our publications partners (eg. Substack and/or in house
                or outsourced newsletter providers) to deliver our newsletters and
                announcements in accordance with their privacy practices.
              </li>
              <li>
                <span className="font-bold text-white">Event Venue &amp; Security:</span>{' '}
                We share attendee lists with the venue strictly for site security, access
                control, credentialing, and emergency readiness.
              </li>
              <li>
                <span className="font-bold text-white">Service Providers:</span> We may
                share data with trusted vendors who assist us in operating our event
                (e.g., registration software platforms or badge printing services). These
                vendors act as our processors under written contracts and may only use
                your data on our instructions.
              </li>
              <li>
                <span className="font-bold text-white">Legal Requirements:</span> We may
                disclose your information if required by law or in response to valid
                requests by public authorities (e.g., law enforcement or safety
                officials).
              </li>
            </ul>
          </div>

          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-8 text-white/90 space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Data Security &amp; Retention</h2>
            <p>
              We take reasonable technical and organisational measures to safeguard your
              personal information against loss, unauthorized access, or disclosure. We
              retain your information only as long as necessary to fulfill event-related
              operations, maintain active newsletter subscriptions (where agreed), and
              satisfy any administrative requirements.
            </p>
            <p>
              Some of our service providers are based in the United States, so your
              information may be transferred outside the UK. Where this happens, we make
              sure it is protected by an approved safeguard, such as the UK&ndash;US Data
              Bridge or the ICO&apos;s International Data Transfer Agreement.
            </p>
          </div>

          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-8 text-white/90 space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Your Rights &amp; Questions</h2>
            <p>
              You may request access to, correction of, or deletion of the personal
              information we hold about you. You can also ask us to restrict how we use
              it, object to our use of it, or give you a copy in a portable format. You
              may also unsubscribe from marketing or Substack communications at any time.
            </p>
            <p>
              We do not make decisions about you using solely automated processing. If
              you are unhappy with how we handle your information, you have the right to
              complain to the Information Commissioner&apos;s Office (ICO) at{' '}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-srv-teal hover:text-srv-yellow transition-colors"
              >
                ico.org.uk
              </a>{' '}
              or on 0303 123 1113. We would appreciate the chance to address your
              concerns first, so please contact us before approaching the ICO.
            </p>
            <p>
              If you have questions about this policy or wish to update your details,
              please contact us at:
            </p>
            <p className="font-mono">
              Contact Email: hello [at] siliconroundabout [dot] ventures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Privacy = () => {
  return (
    <Layout title="Privacy Policy - Roundabout Ventures">
      <PrivacyContent />
    </Layout>
  );
};

export default Privacy;
