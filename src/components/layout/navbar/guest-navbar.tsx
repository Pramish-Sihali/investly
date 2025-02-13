'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import SignUp from '@/app/(auth)/signup/page';
import Login from '@/app/(auth)/login/page';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { X } from 'lucide-react';

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}


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

function SignUpModal({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: string | null }) {
  if (!isOpen || !type) return null;

  function LoginNew({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                    <X size={20} />
                </button>
                <h2 className="text-lg font-semibold mb-4">Log In</h2>
                <Login />
            </div>
        </div>
    );
}

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Sign Up as {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <SignUp userType={type} />
      </div>
    </div>
  );
}

export function Navbar({ isOpen, onClose }: NavbarProps) {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState<'investor' | 'startup' | 'mentor' | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
              <Button
                onClick={() => setIsLoginOpen(true)}
                variant="outline"
                className="px-5 py-2 text-sm font-medium"
              >
                Log In
              </Button>

              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-5 py-2 border text-sm font-medium text-white bg-primary rounded-md hover:bg-gray-800"
                  >
                    Sign Up
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                      {['investor', 'startup', 'mentor'].map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            setModalType(role as 'investor' | 'startup' | 'mentor');
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 rounded-md"
                        >
                          Sign Up As {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {modalType && <SignUpModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType} />}
            </div>
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
            </ul>          </SheetContent>
        </Sheet>
      </div>

      {modalType && <SignUpModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType} />}
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
    </nav>
  );
}
