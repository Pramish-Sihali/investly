import type { Testimonial } from '@/types/testimonials';

import { QuoteIcon } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import HeadingSection from '@/components/common/heading-section';
import ResponsiveContainer from '@/components/common/responsive-container';
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from '@/components/ui/carousel';

type TestimonialsProps = {
  testimonials: Testimonial[];
};

function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 ">
      <ResponsiveContainer paddingX="md">
        <HeadingSection
          title="What Our Clients Say"
          subtitle="Discover why clients trust and choose our services through their experiences"
        />

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="relative"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                  <div className="h-full p-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg h-full flex flex-col">
                      <QuoteIcon className="h-8 w-8 text-primary mb-4" />
                      <blockquote className="flex-grow">
                        <div
                          className="text-gray-700 text-lg leading-relaxed mb-4"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(testimonial.testimonial ?? ''),
                          }}
                          suppressHydrationWarning
                        />
                      </blockquote>
                      <footer className="mt-4">
                        <div className="flex items-center">
                          {testimonial.image && (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                          )}
                          <div>
                            <cite className="font-semibold text-gray-900 not-italic">
                              {testimonial.name}
                            </cite>
                            {testimonial.source && (
                              <p className="text-sm text-gray-500">via {testimonial.source}</p>
                            )}
                          </div>
                        </div>
                      </footer>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-16" />
              <CarouselNext className="-right-16" />
            </div>
          </Carousel>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

// Static testimonials data
const staticTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Doe',
    testimonial:
      'BAIN has made investing so much easier for me. The platform is user-friendly, and their customer service is top-notch!',
    image: '/startup1.png',
  },
  {
    id: 2,
    name: 'Jane Smith',
    testimonial:
      "I was able to diversify my portfolio easily with BAIN's wide range of investment options. Highly recommended!",
    image: '/startup2.png', // Placeholder image
    source: 'Happy Client',
  },
  {
    id: 3,
    name: 'Jane Smith',
    testimonial:
      "I was able to diversify my portfolio easily with BAIN's wide range of investment options. Highly recommended!",
    image: '/start.png', // Placeholder image
    source: 'Happy Client',
  },
];

const TestimonialsApp = () => <Testimonials testimonials={staticTestimonials} />;

export default TestimonialsApp;
