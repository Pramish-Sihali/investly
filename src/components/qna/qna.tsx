import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import HeadingSection from "@/components/common/heading-section";
import ResponsiveContainer from "@/components/common/responsive-container";
import { Separator } from "../ui/separator";

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

const FAQ = ({ categories }: FAQProps) => {
  return (
    <ResponsiveContainer variant="narrow" paddingY="xl">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12">
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

          <Separator  />

          {categories.map((category) => (
            <TabsContent
              key={category.title}
              value={category.title}
              className="mt-6"
            >
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`item-${faq.id}`}
                    className="border-b border-gray-200 last:border-none"
                  >
                    <AccordionTrigger className="text-lg font-medium px-6 py-4 hover:bg-gray-100 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-gray-50 rounded-b-lg">
                      <p className="text-gray-600 leading-relaxed text-base">
                        {faq.answer}
                      </p>
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
};

const faqData: FAQCategory[] = [
  {
    title: "General",
    faqs: [
      {
        id: 1,
        question: "What is Investly?",
        answer:
          "Investly is an online investment platform that allows users to invest in various financial products, including stocks, bonds, and mutual funds, with ease and convenience.",
      },
      {
        id: 2,
        question: "How do I create an account?",
        answer:
          "To create an account on Investly, simply click on the 'Sign Up' button, fill in your personal details, and verify your email address. Once your account is activated, you can start investing.",
      },
    ],
  },
  {
    title: "Startup",
    faqs: [
      {
        id: 3,
        question: "What types of investments can I make?",
        answer:
          "Investly offers a wide range of investment options, including individual stocks, bonds, exchange-traded funds (ETFs), and mutual funds. We also offer socially responsible investment options.",
      },
    ],
  },
  {
    title: "Investor",
    faqs: [
      {
        id: 4,
        question: "Is Investly safe to use?",
        answer:
          "Yes, Investly takes security seriously. We use the latest encryption technologies to protect your personal data and investments. Additionally, we are regulated by financial authorities to ensure the highest standards of security.",
      },
      {
        id: 5,
        question: "How can I withdraw my investments?",
        answer:
          "To withdraw your investments, simply go to your account dashboard, select the investment you wish to withdraw from, and follow the instructions. Withdrawals are processed within 1-2 business days.",
      },
    ],
  },
];

const FAQPage = () => <FAQ categories={faqData} />;

export default FAQPage;
