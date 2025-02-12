// app/academy/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Flag,
  Users,
  UserCircle,
  MessageCircle,
  Sprout,
  BookOpen,
  GraduationCap,
  HandCoins,
  BarChart,
} from "lucide-react";
import Link from "next/link";

const readingLists = [
  {
    slug: "basic-financial-instruments",
    icon: Flag,
    title: "Basic Financial Instruments: Shares/Loans/Convertibles",
    articles: 13,
  },
  {
    slug: "startup-survival-guide",
    icon: Users,
    title: "Startup Survival Guide",
    articles: 43,
  },
  {
    slug: "investor-survival-guide",
    icon: UserCircle,
    title: "Investor Survival Guide",
    articles: 30,
  },
  {
    slug: "startups-raised-funding",
    icon: Sprout,
    title: "Startups who Raised Funding on Leapfunder",
    articles: 59,
  },
  {
    slug: "opinions-startup-changemakers",
    icon: MessageCircle,
    title: "Opinions From Startup Changemakers",
    articles: 119,
  },
  {
    slug: "about-leapfunder",
    icon: BookOpen,
    title: "All About Leapfunder",
    articles: 13,
  },
  {
    slug: "user-manuals-startups",
    icon: GraduationCap,
    title: "User Manuals for Leapfunder Startups",
    articles: 25,
  },
  {
    slug: "user-manuals-investors",
    icon: HandCoins,
    title: "User Manuals for Leapfunder Investors",
    articles: 20,
  },
  {
    slug: "startup-market-reports",
    icon: BarChart,
    title: "State of the Startup Market Reports",
    articles: 15,
  },
];

export default function AcademyPage() {
  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Reading lists</h1>
          <p className="text-xl text-muted-foreground">Just click to read more.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {readingLists.map((item, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg border-gray-200">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
                <Link
                  href={`/academy/${item.slug}`}
                  className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2"
                >
                  Read {item.articles} articles
                  <span className="text-lg">→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
