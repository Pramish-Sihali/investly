export type Testimonial = {
  id: string | number;
  name: string;
  testimonial: string;
  image?: string;
  source?: string;
};

export interface TestimonialsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Testimonial[];
}
