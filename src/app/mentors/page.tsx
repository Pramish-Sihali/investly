'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Star, Filter, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

const mentors = [
  {
    id: 1,
    name: 'Barbara GÉRARD',
    image: '/about.png',
    role: 'Startup Mentorship',
    experience: '20+ years',
    rating: 4.9,
    bio: "Barbara, 20 ans d'expérience en tant qu'entrepreneur dans le secteur de la Tech en France et en Belgique. J'ai fondé une...",
    tags: ['Sales', 'Marketing', 'French'],
    availability: 'Next available: Tomorrow',
  },
  {
    id: 2,
    name: 'Alexis HOREZ',
    image: '/about1.png',
    role: 'Startup Mentorship',
    bio: "Alexis, 34 ans, entrepreneur récidiviste. J'ai fondé la maison du Design. Un projet qui aide les personnes Dys à mieux s'intégrer..",
    tags: ['Sales', 'Marketing', 'French'],
  },
  {
    id: 3,
    name: 'Juliette VALET',
    image: '/blog1.png',
    role: 'Startup Mentorship',
    bio: "Je m'appelle Juliette, j'ai fondé easymarket. Un système d'API qui permet de se connecter à Shopify pour améliorer...",
    tags: ['Sales', 'Marketing', 'French'],
  },
  {
    id: 4,
    name: 'Alexia CARTOL',
    image: '/blog.png',
    role: 'Startup Mentorship',
    bio: "Je m'appelle Alexia, j'ai fondé easymarket. Un système d'API qui permet de se connecter à Shopify pour améliorer",
    tags: ['Sales', 'Marketing', 'French'],
  },
  {
    id: 5,
    name: 'Paul WAUQUE',
    image: '/blog2.png',
    role: 'Startup Mentorship',
    bio: "Paul, 38 ans, entrepreneur récidiviste. J'ai fondé la maison du Design. Un projet qui aide les personnes Dys à mieux s'intégrer",
    tags: ['Sales', 'Marketing', 'French'],
  },
  {
    id: 6,
    name: 'Julien MANIVALSER',
    image: '/startup.png',
    role: 'Startup Mentorship',
    bio: "Julien, 20 ans d'expérience en tant qu'entrepreneur dans le secteur de la Tech en France et en Belgique. J'ai fondé une",
    tags: ['Sales', 'Marketing', 'French'],
  },
];

export default function MentorPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Connect with Expert Mentors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
            Get personalized guidance from industry leaders who have been where you want to go.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['All', 'Sales', 'Marketing', 'Tech', 'French'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                className="rounded-full transition-all duration-300 hover:shadow-md"
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          <Button variant="outline" className="gap-2 rounded-full">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Mentors Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <Dialog key={mentor.id}>
              <DialogTrigger asChild>
                <div className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                  {/* Mentor Header */}
                  <div className="mb-6 flex items-center gap-5">
                    <div className="relative">
                      <Image
                        src={mentor.image || '/placeholder.svg'}
                        alt={mentor.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover aspect-square ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {mentor.experience}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-primary">{mentor.role}</p>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mentor Bio */}
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">{mentor.bio}</p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {mentor.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-100/80 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Availability */}
                  <p className="text-sm text-green-600 mb-6">{mentor.availability}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-primary text-white hover:bg-primary/90 transition-all duration-300"
                      size="lg"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                    <Button variant="outline" size="lg" className="hover:bg-gray-50">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogTrigger>

              {/* Detailed Dialog */}
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    Book a Session with {mentor.name}
                  </DialogTitle>
                  <DialogDescription className="text-base text-gray-600">
                    Take your next step towards success with personalized mentorship.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={mentor.image || '/placeholder.svg'}
                      alt={mentor.name}
                      width={100}
                      height={100}
                      className="rounded-full object-cover aspect-square ring-4 ring-primary/10"
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
                      <div className="flex gap-4">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {mentor.experience}
                        </Badge>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{mentor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button size="lg" className="w-full gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule Meeting
                    </Button>
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <Mail className="h-4 w-4" />
                      View LinkedIn Profile
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}
