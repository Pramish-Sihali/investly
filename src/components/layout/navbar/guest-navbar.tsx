'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navLinks = [
    {
      name: 'How It Works',
      children: [
        { name: 'For Investors', href: '/for-investor' },
        { name: 'For Startups', href: '/for-startup' },
      ],
    },
    {
      name: 'About Us',
      children: [
        { name: 'About Us', href: '/about-us' },
        { name: 'How It Works', href: '/how-the-platform-works' },
        {
          name: 'Why us',
          href: '/why-Bain',
        },
      ],
    },
    {
      name: 'Cohort',
      children: [
        { name: 'First Investment Readiness Cohort', href: '/cohort' },
      ],
    },
    {
      name: 'Resources',
      children: [
        { name: 'Academy', href: '/academy' },
        { name: 'News/Updates & Events', href: '/events' },
        { name: 'Blog', href: '/blog' },
        { name: 'Templates', href: '/templates' },
      ],
    },
     {
      name: 'Our Team',
      children: [
        { name: 'Board of Directors', href: '/our-team' },
        { name: 'Angel Investors', href: '/angel-investors' },
        { name: 'Mentors', href: '/mentor' },
      ],
    },
    // { name: 'Mentor', href: '/mentor' },

    
    { name: 'FAQ', href: '/faqs' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-20">
        <Link href="/" className="text-xl font-bold text-primary ml-0">
          <Image src="/mainlogo.png" alt="Investify Logo" width={120} height={120} />
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((section) => (
                <NavigationMenuItem key={section.name}>
                  {section.children ? (
                    <>
                      <NavigationMenuTrigger>{section.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:min-w-fit">
                          {section.children.map((item) => (
                            <li key={item.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    'block px-4 py-2 text-sm',
                                    pathname === item.href ? 'bg-gray-200' : 'hover:bg-gray-100'
                                  )}
                                >
                                  {item.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={section.href}
                        className={cn(
                          'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                          pathname === section.href ? ' text-primary' : 'hover:bg-accent'
                        )}
                      >
                        {section.name}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col space-y-2">
              {navLinks.map((section) => (
                <li key={section.name} className="text-gray-700">
                  {section.children ? (
                    <div>
                      <span>{section.name}</span>
                      <ul className="ml-4">
                        {section.children.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={cn(
                                'block px-4 py-2',
                                pathname === item.href ? 'bg-gray-200' : 'hover:bg-gray-100'
                              )}
                              onClick={() => setIsSheetOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={section.href}
                      className={cn(
                        'block px-4 py-2',
                        pathname === section.href ? 'bg-gray-200' : 'hover:bg-gray-100'
                      )}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {section.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
