import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import HeadingSection from "@/components/common/heading-section";
import ResponsiveContainer from "@/components/common/responsive-container";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface QnaProps {
  faqs: Faq[];
}

const FAQ = ({ faqs }: QnaProps) => {
  return (
    <ResponsiveContainer variant="narrow" paddingY="xl">
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12">
        <HeadingSection
          badge="FAQ"
          title="Why Choose Investly?"
          subtitle="Find answers to commonly asked questions about our services"
        />

        <div className="w-full border border-gray-200 rounded-lg shadow-sm bg-white px-4 sm:px-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="border-b last:border-none"
              >
                <AccordionTrigger className="text-base sm:text-lg font-medium p-4 sm:p-6 md:p-8">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 sm:p-6 md:p-8 bg-gray-50 rounded-b-lg">
                  <div
                    className="text-gray-700 leading-relaxed text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

const staticFaqs: Faq[] = [
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
  {
    id: 3,
    question: "What types of investments can I make?",
    answer:
      "Investly offers a wide range of investment options, including individual stocks, bonds, exchange-traded funds (ETFs), and mutual funds. We also offer socially responsible investment options.",
  },
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
];

const FAQPage = () => <FAQ faqs={staticFaqs} />;

export default FAQPage;
