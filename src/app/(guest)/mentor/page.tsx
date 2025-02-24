'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Star, Filter, Calendar, ArrowRight, Clock } from 'lucide-react';
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

// Add this new array for recent posts
const recentPosts = [
  {
    id: 1,
    date: 'April 09, 2022',
    title: 'How mentorship can accelerate your startup growth',
    image: '/blog1.png',
  },
  {
    id: 2,
    date: 'April 08, 2022',
    title: 'Finding the right mentor for your business journey',
    image: '/blog2.png',
  },
  {
    id: 3,
    date: 'April 07, 2022',
    title: 'Key qualities to look for in a business mentor',
    image: '/startup.png',
  },
  {
    id: 4,
    date: 'April 06, 2022',
    title: 'Making the most of your mentorship relationship',
    image: '/about.png',
  },
];

export default function MentorPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <>
      {/* Existing mentor section */}
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* Header Section */}
          <div className="text-center sm:flex sm:items-end sm:space-x-16 sm:text-left">
            <h2 className="max-w-xs text-3xl font-bold text-gray-900 sm:text-4xl shrink-0">
              Connect with Expert Mentors
            </h2>
            <p className="max-w-xs mt-5 text-sm font-normal leading-6 text-gray-500 sm:mt-0">
              Get personalized guidance from industry leaders who have been where you want to go.
            </p>
          </div>

          {/* Filters Section */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['All', 'Sales', 'Marketing', 'Tech', 'French'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  className="rounded-full"
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mentors.map((mentor) => (
              <Dialog key={mentor.id}>
                <DialogTrigger asChild>
                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    {/* Image Section */}
                    <a className="flex shrink-0 aspect-w-4 aspect-h-3">
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                      />
                    </a>

                    {/* Content Section */}
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <p className="text-lg font-bold text-gray-900">{mentor.name}</p>
                      <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                        {mentor.bio}
                      </p>
                    </div>

                    {/* Footer Section */}
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">{mentor.role}</p>
                          <span className="text-sm font-medium text-gray-900">•</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900">
                              {mentor.rating}
                            </span>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm" className="p-0">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="17" y1="7" x2="7" y2="17" />
                            <polyline points="8 7 17 7 17 16" />
                          </svg>
                        </Button>
                      </div>
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
      </section>

      {/* Enhanced sidebar section */}
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-7 lg:gap-x-12">
            {/* Main Content Area */}
            <div className="lg:col-span-4">
              <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Schedule a Mentorship Session
                  </h2>
                  <p className="mt-4 text-base text-gray-600">
                    Book a one-on-one session with our experienced mentors to discuss your business
                    goals and challenges.
                  </p>

                  <div className="mt-8 space-y-6">
                    {/* Upcoming Sessions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
                      <div className="grid gap-4">
                        {[1, 2].map((session) => (
                          <div
                            key={session}
                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                  <Calendar className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Strategy Session
                                  </p>
                                  <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Join
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Available Time Slots */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Available Time Slots</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {['9:00 AM', '11:00 AM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'].map(
                          (time) => (
                            <Button
                              key={time}
                              variant="outline"
                              className="flex items-center justify-center gap-2"
                            >
                              <Clock className="w-4 h-4" />
                              {time}
                            </Button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                      <div className="grid gap-4">
                        <Button className="w-full">
                          Schedule New Session
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="w-full">
                          View All Available Mentors
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Posts Sidebar */}
            <div className="lg:col-span-3">
              <p className="text-xl font-bold text-gray-900">Recent Posts</p>
              <div className="mt-6 space-y-5">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1"
                  >
                    <div className="p-4">
                      <div className="flex items-start lg:items-center">
                        <Image
                          className="object-cover w-20 h-20 rounded-lg shrink-0"
                          src={post.image}
                          alt={post.title}
                          width={80}
                          height={80}
                        />
                        <div className="ml-5">
                          <p className="text-sm font-medium text-gray-900">{post.date}</p>
                          <p className="text-lg leading-7 font-bold text-gray-900 mt-2.5">
                            <a href="#" title={post.title}>
                              {post.title}
                              <span className="absolute inset-0" aria-hidden="true" />
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
