import React from 'react';
import BookSpaceForm from '@/components/book-space/book-space-form';

const BookSpaceSection = () => (
  <section className="py-16 bg-gray-50" id="book-space">
    <div className="container mx-auto px-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Workspace</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Reserve a productive space for your work, meetings, or collaboration sessions. Choose your
          preferred date and time for the perfect workspace experience.
        </p>
      </div>
      <BookSpaceForm />
    </div>
  </section>
);

export default BookSpaceSection;
