'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button onClick={() => reset()} className="bg-primary text-white px-4 py-2 rounded">
        Try again
      </button>
    </div>
  );
}
