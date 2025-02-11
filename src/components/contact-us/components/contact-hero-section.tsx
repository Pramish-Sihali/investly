import ContactForm from "./contact-form";
import ContactMap from "./contact-map";
import ResponsiveContainer from "@/components/common/responsive-container";

export default function ContactUsHeroSection() {
  return (
    <ResponsiveContainer paddingX="sm" paddingY="xl">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-9">
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="w-full lg:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-center lg:text-left">
              Drop Us A Line
            </h1>
            <p className="text-gray-500 text-center lg:text-left">
              We normally respond within 2 business days
            </p>
          </div>
          <ContactForm />
        </div>
        <ContactMap />
      </div>
    </ResponsiveContainer>
  );
}
