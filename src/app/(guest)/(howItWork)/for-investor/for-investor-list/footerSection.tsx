"use client";

import React from "react";
import Link from "next/link";

const LearnMoreSection: React.FC = () => (
    <section className="bg-gray-800 text-white py-16 px-6 flex flex-col items-center text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Curious to learn more?</h2>
      <p className="text-gray-300 max-w-xl mb-6">
        Investly lowers the boundaries between investors and entrepreneurs, providing you access
        to talented entrepreneurs and the tools you need to invest online.
      </p>
      <Link href="/academy"><button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-all">
        Discover the Academy
      </button>
      </Link>
    </section>
  );

export default LearnMoreSection;
