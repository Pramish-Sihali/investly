'use client';

import { useState } from 'react';

import { JobModal } from './JobModal';
import { jobs } from '../utils/jobData';
import { JobListing } from './JobListing';

import type { Job } from '../../../types/career';

export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Join Our Team at BAINS</h1>
          <p className="text-xl">Discover exciting opportunities and grow with us</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Open Positions</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} onApply={() => setSelectedJob(job)} />
            ))}
          </div>
        </section>

        <section className="prose max-w-none">
          <h2 className="text-3xl font-semibold mb-6">Why Join BAINS?</h2>
          <ul className="list-disc pl-6">
            <li>Innovative and dynamic work environment</li>
            <li>Competitive salary and benefits package</li>
            <li>Opportunities for professional growth and development</li>
            <li>Collaborative team culture</li>
            <li>Work on cutting-edge financial technology</li>
          </ul>
        </section>
      </main>

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © {new Date().getFullYear()} BAINS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
