"use client";

import { useParams } from "next/navigation";

export default function ReadingListPage() {
  const { slug } = useParams();

  // Ensure slug is a string before using replace(), with a fallback
  const formattedSlug = slug 
    ? (Array.isArray(slug) ? slug[0] : slug)
    : "unknown-topic";

  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">
          Reading List: {formattedSlug.replace(/-/g, " ")}
        </h1>
        <p className="text-lg text-muted-foreground">
          This page will display detailed articles for {formattedSlug.replace(/-/g, " ")}.
        </p>
      </div>
    </section>
  );
}