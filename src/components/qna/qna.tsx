import { cn } from '@/lib/utils';
import HeadingSection from '@/components/common/heading-section';
import ResponsiveContainer from '@/components/common/responsive-container';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

import { Separator } from '../ui/separator';

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  faqs: Faq[];
}

interface FAQProps {
  categories: FAQCategory[];
}

const FAQ = ({ categories }: FAQProps) => (
  <ResponsiveContainer variant="narrow" paddingY="xl">
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-16 mb-20">
      <HeadingSection
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Find quick answers to common queries."
      />

      <Tabs defaultValue={categories[0]?.title} className="mt-12">
        <TabsList className="flex rounded-full justify-center bg-gray-50/50 p-1 mb-8 w-fit mx-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category.title}
              value={category.title}
              className={cn(
                'text-gray-500 font-medium px-6 py-2 rounded-full transition-all duration-200',
                'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-primary-600',
                'hover:text-primary-600 hover:border-2 hover:border-primary-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
                'border-2 border-transparent'
              )}
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <Separator className="mb-8" />

        {categories.map((category) => (
          <TabsContent
            key={category.title}
            value={category.title}
            className="mt-6 data-[state=inactive]:animate-fadeOut data-[state=active]:animate-fadeIn"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {category.faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <AccordionTrigger className="text-lg font-semibold px-6 py-4 rounded-t-xl hover:no-underline focus:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  </ResponsiveContainer>
);

const faqData: FAQCategory[] = [
  {
    title: 'General',
    faqs: [
      {
        id: 1,
        question: 'What is Biratnagar Angel Investors Network (BAIN)?',
        answer:
          'BAIN is a network of angel investors who provide early-stage funding and mentorship to promising startups in Nepal.',
      },
      {
        id: 2,
        question: 'How does BAIN work?',
        answer:
          'BAIN connects startups with angel investors through deal sourcing, evaluation, pitching events, and post-investment support.',
      },
      {
        id: 3,
        question: 'Who can join BAIN?',
        answer:
          'Angel investors, experienced entrepreneurs, and professionals interested in investing in startups can join BAIN.',
      },
      {
        id: 4,
        question: 'Does BAIN invest directly in startups?',
        answer:
          'No, BAIN facilitates connections between startups and investors who make independent investment decisions.',
      },
      {
        id: 5,
        question: 'Is BAIN limited to startups from Biratnagar?',
        answer: 'No, startups from across Nepal can apply for funding and support.',
      },
      {
        id: 6,
        question: 'How is BAIN different from venture capital firms?',
        answer:
          'Angel investors at BAIN invest personal funds in early-stage startups, unlike VC firms that manage pooled investment funds.',
      },
      {
        id: 7,
        question: 'How can I contact BAIN?',
        answer: 'You can reach us via email, our website, or by visiting our office in Biratnagar.',
      },
    ],
  },
  {
    title: 'Startup',
    faqs: [
      {
        id: 8,
        question: 'How can my startup apply for funding?',
        answer:
          'Apply through our website by submitting your business plan, financial projections, and a pitch deck.',
      },
      {
        id: 9,
        question: 'What type of startups does BAIN support?',
        answer:
          'Early-stage startups with innovative business models, high growth potential, and scalability.',
      },
      {
        id: 10,
        question: 'What are the selection criteria for investment?',
        answer:
          'Market potential, business model viability, team experience, revenue model, risk assessment, and competition.',
      },
      {
        id: 11,
        question: 'What should I include in my pitch deck?',
        answer:
          'Problem & Solution, Market Opportunity, Business Model, Competitive Advantage, Financials, and Funding Requirements.',
      },
      {
        id: 12,
        question: 'Do I need to give up equity in my company?',
        answer:
          'Yes, investors typically invest in exchange for equity, negotiated based on valuation.',
      },
      {
        id: 13,
        question: "How is my startup's valuation determined?",
        answer:
          'Valuation is an integral part of the investment process. We consider multiple factors, such as: Revenue Multiples (if your company has revenue, investors may use a multiple of annual revenue to determine value), The Berkus Method (a framework used for early-stage startups without significant revenue), and Comparable Transactions (looking at similar startups in your industry).',
      },
      {
        id: 14,
        question: 'Can I negotiate the valuation and investment terms?',
        answer:
          "Yes! Valuation and investment terms are negotiable between the startup and investors. It's crucial to justify your valuation with financials, market potential, and traction.",
      },
      {
        id: 15,
        question: 'Does BAIN provide mentorship?',
        answer: 'Yes, BAIN offers mentorship, advisory support, and networking opportunities.',
      },
      {
        id: 16,
        question: 'What if my startup is not selected?',
        answer:
          'You will receive feedback and can reapply after refining your business model or joining training programs.',
      },
    ],
  },
  {
    title: 'Investor',
    faqs: [
      {
        id: 17,
        question: 'Who can become an angel investor with BAIN?',
        answer:
          'Anyone with financial resources, business experience, and a passion for startups can invest.',
      },
      {
        id: 18,
        question: 'How much do I need to invest?',
        answer: 'Investments typically range from NPR 2 lakh to NPR 50 lakh per startup.',
      },
      {
        id: 19,
        question: 'What is the expected return on investment (ROI)?',
        answer: 'Returns vary based on startup success, industry trends, and market conditions.',
      },
      {
        id: 20,
        question: 'How do I assess startup opportunities?',
        answer:
          'BAIN provides due diligence reports, investment briefs, and organizes pitch events to help investors evaluate startups based on key metrics and risk factors.',
      },
      {
        id: 21,
        question: 'Can I invest individually or as part of a group?',
        answer:
          'Both options are available. You can invest individually or collaborate with other angels to co-invest in promising startups.',
      },
      {
        id: 22,
        question: 'What kind of support does BAIN offer to investors?',
        answer:
          'BAIN assists investors with deal sourcing, due diligence, investment structuring, legal documentation, and portfolio management.',
      },
      {
        id: 23,
        question: 'How do I exit an investment?',
        answer: `
Exit strategies may include:
Selling shares to new investors in follow-up funding rounds,
Acquisition by a larger company,
Startup IPO (Initial Public Offering),
Buyback by founders or other investors`,
      },
    ],
  },
];

const FAQPageView = () => <FAQ categories={faqData} />;

export default FAQPageView;
