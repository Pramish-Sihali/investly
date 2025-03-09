'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Privacy Policy</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto" />
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-blue max-w-none mb-12"
        >
          <p className="text-gray-700 leading-relaxed">
            Welcome to the Biratnagar Angel Investment Network (BAIN) website. Your privacy is
            important to us, and we are committed to protecting your personal information. This
            Privacy Policy explains how we collect, use, and safeguard your data when you visit our
            website or use our services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using our website and services, you agree to the terms outlined in this policy.
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-12">
          {[
            {
              title: '1. Information We Collect',
              content: (
                <>
                  <p className="text-gray-700 mb-4">
                    We may collect the following types of information:
                  </p>
                  <div className="pl-4 border-l-2 border-gray-200 mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      a. Personal Information (provided by you)
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Name, email address, phone number, and company details</li>
                      <li>Investor profile (for angel investors)</li>
                      <li>
                        Business information, pitch decks, and financial details (for startups)
                      </li>
                      <li>Payment details for membership fees</li>
                    </ul>
                  </div>
                  <div className="pl-4 border-l-2 border-gray-200 mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      b. Non-Personal Information (automatically collected)
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Browser type, IP address, device information</li>
                      <li>Website usage data (via cookies and analytics tools)</li>
                    </ul>
                  </div>
                  <div className="pl-4 border-l-2 border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-2">
                      c. Information from Third Parties
                    </h3>
                    <p className="text-gray-700">
                      We may receive additional information from publicly available sources,
                      business partners, or referrals from our network.
                    </p>
                  </div>
                </>
              ),
            },
            {
              title: '2. How We Use Your Information',
              content: (
                <>
                  <p className="text-gray-700 mb-4">
                    We use collected information for the following purposes:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>
                      To facilitate investment matchmaking between startups and angel investors.
                    </li>
                    <li>To manage membership, registrations, and event participation.</li>
                    <li>
                      To conduct due diligence and risk assessments for investment opportunities.
                    </li>
                    <li>To improve our services, website functionality, and user experience.</li>
                    <li>To comply with legal obligations and regulatory requirements.</li>
                    <li>
                      To send important updates, newsletters, and promotional content (only with
                      your consent).
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: '3. How We Share Your Information',
              content: (
                <>
                  <p className="text-gray-700 mb-4">
                    We do not sell, rent, or trade your personal data. However, we may share your
                    information in the following cases:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Limited information may be shared to facilitate investment discussions.</li>
                    <li>
                      We may share data with trusted third-party vendors for website hosting,
                      payment processing, or legal compliance.
                    </li>
                    <li>
                      If required by law or to protect BAINs legal rights, we may disclose your
                      information to the authorities.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: '4. Data Security',
              content: (
                <p className="text-gray-700">
                  We implement industry-standard security measures to protect your information,
                  including encryption, access controls, and secure data storage. However, no online
                  platform is 100% secure, and we encourage users to take precautions while sharing
                  sensitive data.
                </p>
              ),
            },
            {
              title: '5. Your Rights & Choices',
              content: (
                <>
                  <p className="text-gray-700 mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>
                      <span className="font-medium">Access & Correction:</span> You can request
                      access to or correction of your data.
                    </li>
                    <li>
                      <span className="font-medium">Opt-out:</span> You can unsubscribe from
                      marketing emails anytime.
                    </li>
                    <li>
                      <span className="font-medium">Data Deletion:</span> You may request the
                      deletion of your personal data, subject to legal and operational requirements.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: '6. Third-Party Links',
              content: (
                <p className="text-gray-700">
                  Our website may contain links to third-party websites or services. BAIN is not
                  responsible for the privacy practices of these external sites.
                </p>
              ),
            },
            {
              title: '7. Updates to This Privacy Policy',
              content: (
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. Any changes will be posted on
                  this page with the updated date.
                </p>
              ),
            },
            {
              title: '8. Contact Us',
              content: (
                <div className="text-gray-700">
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy or how we handle your data,
                    please contact us at:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <span>
                        Email: <span className="text-gray-500">contact@bain.com.np</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                      <span>
                        Address: <span className="text-gray-500">Biratnagar, Nepal</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <span>
                        Phone: <span className="text-gray-500">+977 XXX XXX XXXX</span>
                      </span>
                    </div>
                  </div>
                </div>
              ),
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="pb-8 border-b border-gray-100 last:border-0"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{section.title}</h2>
              <div className="pl-0 sm:pl-6">{section.content}</div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-100 text-center"
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Biratnagar Angel Investment Network (BAIN). All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
