export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface FaqsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Faq[];
}
