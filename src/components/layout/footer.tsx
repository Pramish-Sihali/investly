import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
  const footerLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact', href: '/' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  return (
    <footer className="bg-gray-50 border-t mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/mainlogo.png" alt="Investly Logo" className="h-24 w-24" />
            </div>
            <p className="text-sm text-gray-600">Where Vision Meets Capital</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Become a Part of Our Community</h4>
            <p className="text-sm text-gray-600">
              Start your journey today — whether you&apos;re a mentor, founder, or investor.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Investify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
