import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
  const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="bg-gray-50 border-t mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Investly</h3>
            <p className="text-sm text-gray-600">
              Empowering startups, mentors, and investors to connect and grow together.
            </p>
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
            <h4 className="text-lg font-semibold text-gray-800">Join Us</h4>
            <p className="text-sm text-gray-600">
              Sign up today to start your journey as a mentor, founder, or investor.
            </p>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
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
