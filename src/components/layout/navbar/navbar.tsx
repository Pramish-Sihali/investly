'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Menu, Bell, MessageCircle, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTitle, SheetHeader, SheetContent } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check localStorage for user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Common nav links
  const getNavLinks = () => {
    const commonLinks = [
      {
        name: 'How It Works',
        children: [
          { name: 'For Investors', href: '/for-investor' },
          { name: 'For Startups', href: '/for-startup' },
          { name: 'How The Platform Works', href: '/how-the-platform-works' },
          { name: 'Investor Matching Program', href: '/investor-matching-program' },
        ],
      },
      {
        name: 'Articles',
        children: [
          { name: 'Academy', href: '/academy' },
          { name: 'News/Updates & Events', href: '/events' },
          { name: 'Blog', href: '/blog' },
        ],
      },
      { name: 'Startup Directory', href: '/startup-directory' },
    ];

    // Add role-specific links if user is logged in
    if (userData?.role === 'investor') {
      commonLinks.splice(1, 0, {
        name: 'Find Investor',
        href: '/investors/find-investor',
      });
    } else if (!userData) {
      commonLinks.push({ name: 'Mentor', href: '/mentor' }, { name: 'Company', href: '/company' });
    }

    return commonLinks;
  };

  // Render auth buttons or user menu based on login status
  const renderAuthSection = () => {
    if (!userData) {
      return (
        <div className="relative">
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-5 py-2 border text-sm font-medium text-black bg-white rounded-md hover:bg-gray-800 hover:text-white"
            >
              Log In
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="px-5 py-2 border text-sm font-medium text-white bg-primary rounded-md hover:bg-gray-800"
            >
              Sign Up
            </button>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
              {['Investor', 'Startup', 'Mentor'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    window.location.href = `/signup/?usertype=${type}`;
                  }}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Sign Up As {type}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-7 w-7 text-gray-600 hover:text-primary" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-7 w-7 text-gray-600 hover:text-primary" />
        </Button>
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <User className="h-7 w-7 text-gray-600 hover:text-primary" />
          </Button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
              <Link
                href={`/${userData.role}s/profile`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
              >
                My Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('userData');
                  window.location.href = '/';
                }}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 rounded-md"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ... rest of the component remains the same, but use getNavLinks() instead of navLinks
  // and add the search bar conditionally if user is logged in

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary">
          <Image src="/logo.png" alt="Investify Logo" width={100} height={100} />
        </Link>

        {/* Search Bar - Only show when logged in */}
        {userData && (
          <div className="hidden md:flex flex-1 max-w-md mx-4 rounded-lg">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {getNavLinks().map((section) => (
                <NavigationMenuItem key={section.id} section={section} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {renderAuthSection()}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Sheet component remains the same */}
      </div>
    </nav>
  );
}
