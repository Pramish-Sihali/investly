'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet,SheetTitle, SheetHeader, SheetContent,  } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';

export function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState<'investor' | 'startup' | 'mentor' | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navLinks = [
    {
      name: 'How It Works',
      children: [
        {
          name: 'For Investors',
          href: '/for-investor',
          description: 'It is a long established fact that a reader will',
        },
        {
          name: 'For Startups',
          href: '/for-startup',
          description: 'It is for startups that are looking to grow',
        },
        {
          name: 'How The Platform Works',
          href: '/how-the-platform-works',
          description: 'It is a platform that helps you find the right investor for your business',
        },
        {
          name: 'Investor Matching Program',
          href: '/investor-matching-program',
          description: 'It is a program that matches startups with investors',
        },
      ],
    },
    {
      name: 'Artical',

      children: [
        { name: 'Academy', href: '/academy', description: 'It is a long established fact that a reader will' },
        { name: 'News/Updates & Events', href: '/events', description: 'It is a long established fact that a reader will' },
        { name: 'Blog', href: '/blog', description: 'It is a long established fact that a reader will' },
      ],

    },
    { name: 'Startup Directory', href: '/startup-directory' },
    { name: 'Company', href: '/company' },
   
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary">
          <Image src="/logo.png" alt="Investify Logo" width={100} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((section) => (
                <NavigationMenuItem key={section.name}>
                  {section.children ? (
                    <>
                      <NavigationMenuTrigger>{section.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {section.children.map((item) => (
                            <ListItem
                              key={item.name}
                              title={item.name}
                              href={item.href}
                              className={pathname === item.href ? 'bg-gray-200 text-gray-900' : ''}
                            >
                              {item.description}
                            </ListItem>
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
                          pathname === section.href
                            ? ' text-primary' 
                            : 'hover:bg-accent'
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

          {/* Desktop Sign Up Button */}
          <div className="relative">
            <div className="flex gap-4">
              <Link
                href="/login"
                className="px-5 py-2 border text-sm font-medium text-black bg-white rounded-md hover:bg-gray-800 hover:text-white"
              >
                Log In
              </Link>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-5 py-2 border text-sm font-medium text-white bg-primary rounded-md hover:bg-gray-800"
              >
                Sign Up
              </button>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                <button
                  onClick={() => setModalType('investor')}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Sign Up As Investor
                </button>
                <button
                  onClick={() => setModalType('startup')}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Sign Up As Startup
                </button>
                <button
                  onClick={() => setModalType('mentor')}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Sign Up As Mentor
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
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
