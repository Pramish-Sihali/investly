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
    <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 mt-12">
      <HeadingSection
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Find quick answers to common queries."
      />

      <Tabs defaultValue={categories[0]?.title} className="mt-8">
        <TabsList className="flex rounded-none justify-center bg-transparent mb-6 ">
          {categories.map((category) => (
            <TabsTrigger
              key={category.title}
              value={category.title}
              className="text-gray-700  border-gray-300 font-medium px-6 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 hover:text-primary-500 hover:border-primary-500"
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <Separator />

        {categories.map((category) => (
          <TabsContent key={category.title} value={category.title} className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {category.faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="border-b border-gray-200 last:border-none"
                >
                  <AccordionTrigger className="text-lg font-medium px-6 py-4  rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4  rounded-b-lg">
                    <p className="text-gray-600 leading-relaxed text-base">{faq.answer}</p>
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
        question: 'What is Investly?',
        answer:
          'Investly is an online investment platform that allows users to invest in various financial products, including stocks, bonds, and mutual funds, with ease and convenience.',
      },
      {
        id: 2,
        question: 'How do I create an account?',
        answer:
          "To create an account on Investly, simply click on the 'Sign Up' button, fill in your personal details, and verify your email address. Once your account is activated, you can start investing.",
      },
      {
        id: 3,
        question: 'What payment methods does Investly accept?',
        answer:
          'Investly accepts bank transfers, credit/debit cards, and digital payment options such as PayPal for funding your investment account.',
      },
      {
        id: 4,
        question: 'Can I access Investly on mobile devices?',
        answer:
          'Yes, Investly has a mobile-friendly website and a dedicated app available for iOS and Android users.',
      },
      {
        id: 5,
        question: 'What are the benefits of using Investly?',
        answer:
          'Investly provides a user-friendly platform for investing in a variety of financial products with low fees, advanced security measures, and expert guidance to help users make informed investment decisions.',
      },
    ],
  },
  {
    title: 'Startup',
    faqs: [
      {
        id: 6,
        question: 'What types of investments can I make?',
        answer:
          'Investly offers a wide range of investment options, including individual stocks, bonds, exchange-traded funds (ETFs), and mutual funds. We also offer socially responsible investment options.',
      },
      {
        id: 7,
        question: 'How much do I need to start investing?',
        answer:
          'You can start investing with as little as $100. Investly provides flexible options to accommodate investors of all levels.',
      },
      {
        id: 8,
        question: 'How do I get started with my first investment?',
        answer:
          'To start investing, create an account, complete your profile, and deposit funds into your Investly account. Once done, you can browse available investment options and make your first investment with just a few clicks.',
      },
      {
        id: 9,
        question: 'Are there any fees for using Investly?',
        answer:
          'Investly charges minimal transaction fees, and there are no hidden charges. You can view our fee structure in your account settings.',
      },
      {
        id: 10,
        question: 'Can I track my investments in real-time?',
        answer:
          "Yes, Investly provides real-time tracking and analytics to help you monitor your portfolio's performance.",
      },
    ],
  },
  {
    title: 'Investor',
    faqs: [
      {
        id: 11,
        question: 'Is Investly safe to use?',
        answer:
          'Yes, Investly takes security seriously. We use the latest encryption technologies to protect your personal data and investments. Additionally, we are regulated by financial authorities to ensure the highest standards of security.',
      },
      {
        id: 12,
        question: 'How can I withdraw my investments?',
        answer:
          'To withdraw your investments, simply go to your account dashboard, select the investment you wish to withdraw from, and follow the instructions. Withdrawals are processed within 1-2 business days.',
      },
      {
        id: 13,
        question: 'What happens if the market fluctuates?',
        answer:
          'Market fluctuations are normal. Investly provides risk assessment tools and expert guidance to help investors make informed decisions during market volatility.',
      },
      {
        id: 14,
        question: 'Can I automate my investments?',
        answer:
          'Yes, Investly offers an auto-invest feature that allows you to set predefined rules for automated investing based on your preferences.',
      },
      {
        id: 15,
        question: 'Does Investly provide financial advice?',
        answer:
          'Investly offers educational resources, market insights, and expert recommendations to help investors make informed decisions. However, we do not provide personalized financial advice.',
      },
    ],
  },
];

const FAQPage = () => <FAQ categories={faqData} />;

export default FAQPage;
