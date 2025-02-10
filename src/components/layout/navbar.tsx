'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => (
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
);
ListItem.displayName = 'ListItem';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSheet = () => setIsOpen(!isOpen);

  const navLinks = [
    {
      name: 'Solutions',
      children: [
        {
          name: 'For Startups',
          href: '/startups',
          description: 'Scale your startup with expert guidance',
        },
        { name: 'For Mentors', href: '/mentors', description: 'Share your expertise and earn' },
        {
          name: 'For Investors',
          href: '/investors',
          description: 'Find promising investment opportunities',
        },
        {
          name: 'For Accelerators',
          href: '/accelerators',
          description: 'Enhance your acceleration program',
        },
      ],
    },
    {
      name: 'Resources',
      children: [
        { name: 'Blog', href: '/blog', description: 'Latest insights and updates' },
        {
          name: 'Success Stories',
          href: '/success-stories',
          description: 'Learn from successful founders',
        },
        {
          name: 'Knowledge Base',
          href: '/knowledge-base',
          description: 'Guides and best practices',
        },
        { name: 'Events', href: '/events', description: 'Upcoming webinars and meetups' },
      ],
    },
    {
      name: 'Company',
      children: [
        { name: 'About Us', href: '/about', description: 'Our mission and team' },
        { name: 'Careers', href: '/careers', description: 'Join our growing team' },
        { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
        { name: 'Press Kit', href: '/press', description: 'Media resources and news' },
      ],
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          Investify
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((section) => (
                <NavigationMenuItem key={section.name}>
                  <NavigationMenuTrigger>{section.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {section.children.map((item) => (
                        <ListItem key={item.name} title={item.name} href={item.href}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleSheet}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <div className="flex flex-col h-full pt-10 space-y-6">
                {navLinks.map((section) => (
                  <div key={section.name} className="space-y-3">
                    <h3 className="font-semibold px-4">{section.name}</h3>
                    <div className="space-y-1">
                      {section.children.map((item) => (
                        <SheetClose asChild key={item.name}>
                          <Link
                            href={item.href}
                            className="flex flex-col py-2 px-4 text-sm hover:bg-accent rounded-md transition-colors"
                          >
                            <span className="font-medium">{item.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col space-y-2 pt-4 px-4">
                  <SheetClose asChild>
                    <Button variant="outline" asChild>
                      <Link href="/login">Log In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
